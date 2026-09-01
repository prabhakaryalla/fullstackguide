# 629. K Inverse Pairs Array

**Difficulty:** Hard
**Category:** Dynamic Programming

## Problem

For an integer array of `1` to `n`, an inverse pair is a pair `(i, j)` where `i < j` and `nums[i] > nums[j]`. Given integers `n` and `k`, return the number of distinct arrays with exactly `k` inverse pairs, modulo `10^9 + 7`.

### Example

```
Input: n = 3, k = 0
Output: 1
```

### Constraints

- `1 <= n <= 1000`
- `0 <= k <= 1000`

## Approach

Use dynamic programming where `dp[j]` (after processing `i` elements) is the number of arrangements of `1..i` with exactly `j` inverse pairs. Inserting the `i`th element into any of `i` possible positions relative to the previous `i-1` elements adds between `0` and `i-1` new inverse pairs, so `dp[j]` (for the next `i`) is a sliding-window sum of the previous layer's values from `j - (i-1)` to `j`; maintain this sum incrementally rather than recomputing it from scratch each time.

## C# Solution

```csharp
public class Solution
{
    private const int Mod = 1_000_000_007;

    public int KInversePairs(int n, int k)
    {
        var dp = new int[k + 1];
        dp[0] = 1;

        for (int i = 1; i <= n; i++)
        {
            var next = new int[k + 1];
            long sum = 0;

            for (int j = 0; j <= k; j++)
            {
                sum = (sum + dp[j]) % Mod;
                if (j - i >= 0)
                    sum = (sum - dp[j - i] + Mod) % Mod;

                next[j] = (int)sum;
            }

            dp = next;
        }

        return dp[k];
    }
}
```

## Complexity

- **Time:** `O(n * k)`.
- **Space:** `O(k)` for the DP array.
