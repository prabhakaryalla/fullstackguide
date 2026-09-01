# 837. New 21 Game

**Difficulty:** Medium
**Category:** Math, Dynamic Programming, Sliding Window, Probability and Statistics

## Problem

Starting with `0` points, you draw random integers from `1` to `maxPts` (inclusive, uniformly) and add them to your score, stopping as soon as your score reaches `k` or more. Return the probability that your final score is `n` or less.

### Example

```
Input: n = 10, k = 1, maxPts = 10
Output: 1.00000
```

## Approach

Let `dp[i]` be the probability of ever having a score of exactly `i` while still drawing (i.e., `i < k`). Each `dp[i]` equals the average of `dp[i - 1], dp[i - 2], ..., dp[i - maxPts]` (each equally likely prior score that could draw the right number to land on `i`), computed efficiently with a sliding window sum divided by `maxPts`. Once the score reaches `k` or more, drawing stops, so accumulate the probability of stopping at each score from `k` to `n` into the final answer. Handle the edge case where `k` is `0` (always stop immediately, so the probability is `1`) or where `n` is already large enough to guarantee success regardless of the last draw.

## C# Solution

```csharp
public class Solution
{
    public double New21Game(int n, int k, int maxPts)
    {
        if (k == 0 || n >= k + maxPts - 1) return 1.0;

        var dp = new double[n + 1];
        dp[0] = 1.0;

        double windowSum = 1.0;
        double result = 0.0;

        for (int i = 1; i <= n; i++)
        {
            dp[i] = windowSum / maxPts;

            if (i < k)
                windowSum += dp[i];
            else
                result += dp[i];

            if (i - maxPts >= 0 && i - maxPts < k)
                windowSum -= dp[i - maxPts];
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the DP array.
