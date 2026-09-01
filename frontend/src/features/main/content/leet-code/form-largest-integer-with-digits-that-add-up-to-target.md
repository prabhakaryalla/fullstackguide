# 1449. Form Largest Integer With Digits That Add up to Target

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

Given `cost`, where `cost[i]` is the cost of using digit `i + 1`, and an integer `target`, form the largest possible integer (as a string) whose digit costs sum to exactly `target`. If no such integer exists, return `"0"`.

### Example

```
Input: cost = [4,3,2,5,6,7,2,5,5], target = 9
Output: "7772"
```

## Approach

First, compute `dp[t]`, the maximum number of digits achievable using total cost exactly `t` (more digits always produces a larger number, since every digit is `1`-`9`, so length dominates). This is a coin-change-style DP: `dp[t] = max` over all digits `d` of `dp[t - cost[d]] + 1`. If `dp[target]` is unreachable, return `"0"`. Otherwise, greedily reconstruct the answer left to right: at each remaining cost, pick the *largest* digit `d` (checking `9` down to `1`) whose use still keeps the maximum achievable digit count for the rest of the budget — this greedy choice preserves optimal length while maximizing each digit position from the left.

## C# Solution

```csharp
public class Solution
{
    public string LargestNumber(int[] cost, int target)
    {
        int[] dp = new int[target + 1];
        Array.Fill(dp, int.MinValue);
        dp[0] = 0;

        for (int t = 1; t <= target; t++)
        {
            for (int d = 1; d <= 9; d++)
            {
                int c = cost[d - 1];
                if (t >= c && dp[t - c] != int.MinValue)
                    dp[t] = Math.Max(dp[t], dp[t - c] + 1);
            }
        }

        if (dp[target] == int.MinValue) return "0";

        var sb = new StringBuilder();
        int remaining = target;
        int neededLen = dp[target];

        while (remaining > 0)
        {
            for (int d = 9; d >= 1; d--)
            {
                int c = cost[d - 1];
                if (remaining >= c && dp[remaining - c] == neededLen - 1)
                {
                    sb.Append(d);
                    remaining -= c;
                    neededLen--;
                    break;
                }
            }
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(target * 9)`.
- **Space:** `O(target)` for the `dp` array.
