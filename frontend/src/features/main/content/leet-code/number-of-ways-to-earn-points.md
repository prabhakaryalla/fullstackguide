# 2585. Number of Ways to Earn Points

**Difficulty:** Hard
**Category:** Dynamic Programming, Array

## Problem

You are given an exam consisting of `n` types of questions. Each question type has a count and marks associated with it. You are also given an integer `target` representing the target score. Calculate the number of ways you can earn exactly `target` marks by solving questions. Return the answer modulo 10^9 + 7.

### Example

```
Input: target = 6, types = [[6,1],[3,2],[2,3]]
Output: 7
Explanation: 
Type 0: solve 0-6 questions, each worth 1 mark
Type 1: solve 0-3 questions, each worth 2 marks
Type 2: solve 0-2 questions, each worth 3 marks
7 ways to earn exactly 6 marks
```

## Approach

This is a bounded knapsack problem. We use dynamic programming where `dp[i]` represents the number of ways to achieve exactly `i` points. For each question type, we iterate through all possible counts (from 0 to the maximum count for that type) and update the dp array.

We process each question type and for each one, we try all possible numbers of questions we can solve (from 0 to its count). For each possibility, we update our dp array to reflect the new ways to reach each score.

## C# Solution

```csharp
public class Solution
{
    public int WaysToReachTarget(int target, int[][] types)
    {
        const int MOD = 1000000007;
        var dp = new long[target + 1];
        dp[0] = 1;
        
        foreach (var type in types)
        {
            int count = type[0];
            int marks = type[1];
            
            for (int i = target; i >= 0; i--)
            {
                if (dp[i] == 0) continue;
                
                for (int k = 1; k <= count && i + k * marks <= target; k++)
                {
                    dp[i + k * marks] = (dp[i + k * marks] + dp[i]) % MOD;
                }
            }
        }
        
        return (int)dp[target];
    }
}
```

## Complexity

- **Time:** O(target * sum(count[i]))
- **Space:** O(target)
