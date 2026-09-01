# 1086. High Five

**Difficulty:** Easy
**Category:** Array, Hash Table, Sorting, Heap (Priority Queue)

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a list of `items` where `items[i] = [id, score]` represents a student's score on some exam, return each student's ID along with the average of their top five highest scores, sorted by increasing student ID. Each average should use integer division.

### Example

```
Input: items = [[1,91],[1,92],[2,93],[2,97],[1,60],[2,77],[1,65],[1,87],[1,100],[2,100],[2,76]]
Output: [[1,87],[2,88]]
```

## Approach

Group all scores by student ID into per-student lists. For each student (processed in ascending ID order), sort their scores descending and average the top five. Integer division on the sum naturally truncates as required.

## C# Solution

```csharp
public class Solution
{
    public int[][] HighFive(int[][] items)
    {
        var scoresByStudent = new Dictionary<int, List<int>>();

        foreach (var item in items)
        {
            int id = item[0], score = item[1];
            if (!scoresByStudent.TryGetValue(id, out var list))
            {
                list = new List<int>();
                scoresByStudent[id] = list;
            }
            list.Add(score);
        }

        var studentIds = scoresByStudent.Keys.ToList();
        studentIds.Sort();

        var result = new int[studentIds.Count][];

        for (int i = 0; i < studentIds.Count; i++)
        {
            int id = studentIds[i];
            var scores = scoresByStudent[id];
            scores.Sort((a, b) => b.CompareTo(a));

            int sum = 0;
            for (int k = 0; k < 5; k++) sum += scores[k];

            result[i] = new[] { id, sum / 5 };
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n log n)` — dominated by sorting each student's score list.
- **Space:** `O(n)` for the grouped scores.
