# 2140. Solving Questions With Brainpower

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

You are given a 0-indexed 2D integer array `questions` where `questions[i] = [points_i, brainpower_i]`.

The array describes the questions of an exam, where you have to process the questions in order. Solving question `i` will earn you `points_i` points but you will be unable to solve the next `brainpower_i` questions. If you skip a question, you can move to the next one.

Return the maximum points you can earn for the exam.

### Example

```
Input: questions = [[3,2],[4,3],[4,4],[2,5]]
Output: 5
Explanation: Solve question 0 (3 points, skip next 2), then solve question 3 (2 points).
Total: 5 points.
```

## Approach

Use dynamic programming working backwards. For each question, decide whether to solve it or skip it:
- If we solve question `i`: earn `points[i]` + best score from question `i + brainpower[i] + 1`
- If we skip question `i`: best score from question `i + 1`

Working backwards ensures we know the optimal solution for later questions when deciding about earlier ones.

## C# Solution

```csharp
public class Solution
{
    public long MostPoints(int[][] questions)
    {
        int n = questions.Length;
        long[] dp = new long[n + 1];
        
        // Work backwards
        for (int i = n - 1; i >= 0; i--)
        {
            int points = questions[i][0];
            int brainpower = questions[i][1];
            int nextQuestion = i + brainpower + 1;
            
            // Option 1: Solve this question
            long solve = points + (nextQuestion < n ? dp[nextQuestion] : 0);
            
            // Option 2: Skip this question
            long skip = dp[i + 1];
            
            dp[i] = Math.Max(solve, skip);
        }
        
        return dp[0];
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of questions
- **Space:** O(n) for the DP array
