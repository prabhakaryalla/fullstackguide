# 2512. Reward Top K Students

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Sorting, Heap (Priority Queue)

## Problem

You are given two string arrays `positive_feedback` and `negative_feedback`, containing distinct words. You are also given a list of student feedback reports, where each report is a string.

Each student receives points based on the words in their feedback:
- Each word in `positive_feedback` adds 3 points
- Each word in `negative_feedback` subtracts 1 point

Return the IDs of the top `k` students with the highest points. If two students have the same points, return the one with the smaller ID first.

### Example

```
Input: positive_feedback = ["smart","brilliant"], negative_feedback = ["not"], 
       report = ["this student is smart","this student is not smart"], 
       student_id = [1,2], k = 2
Output: [1,2]
Explanation: Student 1: "smart" = 3 points. Student 2: "not" = -1, "smart" = 3, total = 2 points.
```

## Approach

Create hash sets for positive and negative feedback words. For each student's report, split it into words and calculate the score. Store students with their scores in a list, then sort by score (descending) and ID (ascending). Return the first k student IDs.

## C# Solution

```csharp
public class Solution
{
    public IList<int> TopStudents(string[] positive_feedback, string[] negative_feedback, 
                                   string[] report, int[] student_id, int k)
    {
        HashSet<string> positive = new HashSet<string>(positive_feedback);
        HashSet<string> negative = new HashSet<string>(negative_feedback);
        
        List<(int id, int score)> students = new List<(int, int)>();
        
        for (int i = 0; i < report.Length; i++)
        {
            string[] words = report[i].Split(' ');
            int score = 0;
            
            foreach (string word in words)
            {
                if (positive.Contains(word))
                    score += 3;
                else if (negative.Contains(word))
                    score -= 1;
            }
            
            students.Add((student_id[i], score));
        }
        
        students.Sort((a, b) => {
            if (a.score != b.score)
                return b.score.CompareTo(a.score);
            return a.id.CompareTo(b.id);
        });
        
        List<int> result = new List<int>();
        for (int i = 0; i < k; i++)
        {
            result.Add(students[i].id);
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n × m + n × log n) where n is number of students and m is average report length
- **Space:** O(n + p + q) where p and q are sizes of positive and negative feedback sets
