# 375. Guess Number Higher or Lower II

**Difficulty:** Medium
**Category:** Math, Dynamic Programming, Game Theory

## Problem

A number is picked between `1` and `n`. Each guess `x` that is wrong costs `x` dollars. Return the minimum amount of money you need to guarantee a win, regardless of what number was picked.

### Example

```
Input: n = 10
Output: 16
```

### Constraints

- `1 <= n <= 200`

## Approach

Use interval dynamic programming where `dp[start, end]` is the minimum guaranteed cost to determine any number in `[start, end]`. For each possible first guess `pivot` in the range, the worst case cost is `pivot + max(dp[start, pivot-1], dp[pivot+1, end])` (the adversary picks whichever side is more expensive); minimize this over all pivots.

## C# Solution

```csharp
public class Solution
{
    public int GetMoneyAmount(int n)
    {
        var dp = new int[n + 2, n + 2];

        for (int len = 2; len <= n; len++)
        {
            for (int start = 1; start + len - 1 <= n; start++)
            {
                int end = start + len - 1;
                int best = int.MaxValue;

                for (int pivot = start; pivot < end; pivot++)
                {
                    int cost = pivot + Math.Max(dp[start, pivot - 1], dp[pivot + 1, end]);
                    best = Math.Min(best, cost);
                }

                dp[start, end] = best;
            }
        }

        return dp[1, n];
    }
}
```

## Complexity

- **Time:** `O(n^3)`.
- **Space:** `O(n^2)` for the DP table.
