# 1246. Palindrome Removal

**Difficulty:** Hard
**Category:** Array, Dynamic Programming
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an integer array `arr`, in one move you may remove a contiguous subarray that forms a palindrome (the remaining parts join together). Return the minimum number of moves needed to remove the entire array.

### Example

```
Input: arr = [1,3,4,1,5]
Output: 3
```

## Approach

Use interval DP where `dp[i][j]` is the minimum moves to clear `arr[i..j]`. As a baseline, `dp[i][j] = dp[i+1][j] + 1` (remove `arr[i]` on its own, then clear the rest). The key improvement: for any index `k` in `(i, j]` where `arr[k] == arr[i]`, first fully clear the middle segment `arr[i+1..k-1]`, which makes `arr[i]` and `arr[k]` adjacent and equal — extending whatever palindrome move ends at `k` to also include `arr[i]` at no extra cost. That gives the candidate `dp[i+1][k-1] + dp[k+1][j]`, and the answer is the minimum over all such candidates plus the baseline.

## C# Solution

```csharp
public class Solution
{
    public int MinimumMoves(int[] arr)
    {
        int n = arr.Length;
        var dp = new int[n, n];

        for (int i = 0; i < n; i++) dp[i, i] = 1;

        for (int length = 2; length <= n; length++)
        {
            for (int i = 0; i + length - 1 < n; i++)
            {
                int j = i + length - 1;
                int best = Get(dp, i + 1, j) + 1;

                for (int k = i + 1; k <= j; k++)
                {
                    if (arr[k] == arr[i])
                    {
                        int left = Get(dp, i + 1, k - 1);
                        int right = Get(dp, k + 1, j);
                        best = Math.Min(best, left + right);
                    }
                }

                dp[i, j] = best;
            }
        }

        return dp[0, n - 1];
    }

    private int Get(int[,] dp, int i, int j) => i > j ? 0 : dp[i, j];
}
```

## Complexity

- **Time:** `O(n^3)`.
- **Space:** `O(n^2)`.
