# 2836. Maximize Value of Function in a Ball Passing Game

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Graph, Binary Lifting

## Problem

You are given an integer array receiver of length n and an integer k. There are n players in a ball passing game numbered from 0 to n - 1.

You start the game with ball at player 0. In one step, the player with the ball passes it to receiver[player]. The game consists of k steps.

The game's score is defined as the sum of indices of all players who touched the ball during the game (including player 0 and counting repeated touches).

Return the maximum possible score.

### Example

```
Input: receiver = [2,0,1], k = 4
Output: 6
Explanation: Starting from 0: 0→2→1→0→2. Sum = 0+2+1+0+2 = 5. Other paths may give 6.
```

## Approach

This problem requires binary lifting (also known as jump pointers). We need to efficiently compute which player we reach after exactly k passes and accumulate the sum.

We precompute:
- dp[i][j] = the player reached after 2^j passes starting from player i
- sum[i][j] = sum of all player indices visited in those 2^j passes

We use binary representation of k to determine the path. For each set bit in k's binary representation, we make the corresponding jump and add to our result.

## C# Solution

```csharp
public class Solution
{
    public long GetMaxFunctionValue(List<int> receiver, long k)
    {
        int n = receiver.Count;
        int maxLog = 35; // log2(10^10)
        
        int[,] dp = new int[n, maxLog];
        long[,] sum = new long[n, maxLog];
        
        // Initialize for 2^0 = 1 step
        for (int i = 0; i < n; i++)
        {
            dp[i, 0] = receiver[i];
            sum[i, 0] = receiver[i];
        }
        
        // Build binary lifting table
        for (int j = 1; j < maxLog; j++)
        {
            for (int i = 0; i < n; i++)
            {
                int mid = dp[i, j - 1];
                dp[i, j] = dp[mid, j - 1];
                sum[i, j] = sum[i, j - 1] + sum[mid, j - 1];
            }
        }
        
        long maxScore = 0;
        
        // Try starting from each player
        for (int start = 0; start < n; start++)
        {
            long score = start;
            int current = start;
            long remaining = k;
            
            for (int j = 0; j < maxLog && remaining > 0; j++)
            {
                if ((remaining & (1L << j)) != 0)
                {
                    score += sum[current, j];
                    current = dp[current, j];
                }
            }
            
            maxScore = Math.Max(maxScore, score);
        }
        
        return maxScore;
    }
}
```

## Complexity

- **Time:** O(n * log k) for building the table and computing results
- **Space:** O(n * log k) for the DP and sum tables
