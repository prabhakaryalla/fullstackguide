# 1230. Toss Strange Coins

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Probability and Statistics
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array `prob` where `prob[i]` is the probability that the `i`th coin lands heads, and an integer `target`, return the probability that exactly `target` coins land heads after tossing all coins once.

### Example

```
Input: prob = [0.4], target = 1
Output: 0.4
```

## Approach

Use a DP array `dp[j]` representing the probability of seeing exactly `j` heads among the coins processed so far. For each new coin, update `dp` from the highest count down to `0` (to avoid overwriting values still needed): `dp[j]` becomes the probability of `j` heads without the new coin's head (`dp[j] * (1 - prob[i])`) plus the probability of `j-1` heads before it combined with this coin landing heads (`dp[j-1] * prob[i]`).

## C# Solution

```csharp
public class Solution
{
    public double ProbabilityOfHeads(double[] prob, int target)
    {
        var dp = new double[target + 1];
        dp[0] = 1.0;

        for (int i = 0; i < prob.Length; i++)
        {
            for (int j = Math.Min(target, i + 1); j >= 0; j--)
            {
                double withoutHead = dp[j] * (1 - prob[i]);
                double withHead = j > 0 ? dp[j - 1] * prob[i] : 0;
                dp[j] = withoutHead + withHead;
            }
        }

        return dp[target];
    }
}
```

## Complexity

- **Time:** `O(n * target)`, where `n` is the number of coins.
- **Space:** `O(target)`.
