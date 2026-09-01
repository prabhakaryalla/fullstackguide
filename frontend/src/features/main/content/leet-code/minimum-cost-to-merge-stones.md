# 1000. Minimum Cost to Merge Stones

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Prefix Sum

## Problem

Given an array `stones` representing piles of stones in a row, and an integer `k`, in each move you may merge exactly `k` consecutive piles into one, at a cost equal to the total number of stones in those piles. Return the minimum total cost to merge all piles into one, or `-1` if it's impossible.

### Example

```
Input: stones = [3,2,4,1], k = 2
Output: 20
```

## Approach

Merging is only possible at all if `(n - 1)` is divisible by `(k - 1)`. Use an interval DP: `dp[i][j]` is the minimum cost to reduce the range `[i, j]` as far as possible. For each range, try every split point `mid` stepping by `k - 1` (aligning with how piles combine) to combine two already-optimally-merged sub-ranges. If the range's length allows a *full* merge into a single pile (length `- 1` divisible by `k - 1`), add the cost of that final merge (the range's total sum).

## C# Solution

```csharp
public class Solution
{
    public int MergeStones(int[] stones, int k)
    {
        int n = stones.Length;
        if ((n - 1) % (k - 1) != 0) return -1;

        var prefix = new int[n + 1];
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + stones[i];

        var dp = new int[n, n];

        for (int len = k; len <= n; len++)
        {
            for (int i = 0; i + len - 1 < n; i++)
            {
                int j = i + len - 1;
                dp[i, j] = int.MaxValue;

                for (int mid = i; mid < j; mid += k - 1)
                {
                    dp[i, j] = Math.Min(dp[i, j], dp[i, mid] + dp[mid + 1, j]);
                }

                if ((len - 1) % (k - 1) == 0)
                {
                    dp[i, j] += prefix[j + 1] - prefix[i];
                }
            }
        }

        return dp[0, n - 1];
    }
}
```

## Complexity

- **Time:** `O(n^3 / k)`.
- **Space:** `O(n^2)`.
