# 3018. Maximum Number of Removal Queries That Can Be Processed I

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

You are given a 0-indexed integer array `nums` and a 0-indexed integer array `queries`. Process the queries in order: for query `i`, choose an element that currently still exists at either end of the remaining contiguous block of `nums` (initially the whole array) whose value is `>= queries[i]`, and remove it; if neither end qualifies, processing stops. Return the maximum number of queries that can be successfully processed.

## Approach

Since only the two ends of the *remaining contiguous subarray* can ever be removed, the surviving elements always form some contiguous window `nums[i..j]`. Define `dp[i][j]` as the maximum number of queries already processed once the array has shrunk down to exactly the window `nums[i..j]` (with nothing removed yet from that window). Working from the widest windows down to length 1:

- Shrinking from the left: if the previous window was `nums[i-1..j]` and `dp[i-1][j]` queries were already processed, this window is reached if `nums[i-1] >= queries[dp[i-1][j]]`, contributing one more processed query.
- Shrinking from the right: symmetric, coming from `nums[i..j+1]`.

Once every window's `dp` value is known, the final answer considers finishing the process at a single-element window `nums[i..i]`, optionally processing one more query against `nums[i]` itself.

## C# Solution

```csharp
public class Solution {
    public int MaximumProcessableQueries(int[] nums, int[] queries) {
        int n = nums.Length;
        int[,] dp = new int[n, n];

        for (int d = n - 1; d >= 0; d--) {
            for (int i = 0; i < n; i++) {
                int j = i + d;
                if (j >= n)
                    continue;
                if (i > 0)
                    dp[i, j] = Math.Max(dp[i, j],
                        dp[i - 1, j] + (nums[i - 1] >= queries[dp[i - 1, j]] ? 1 : 0));
                if (j + 1 < n)
                    dp[i, j] = Math.Max(dp[i, j],
                        dp[i, j + 1] + (nums[j + 1] >= queries[dp[i, j + 1]] ? 1 : 0));
                if (dp[i, j] == queries.Length)
                    return queries.Length;
            }
        }

        int ans = 0;
        for (int i = 0; i < n; i++)
            ans = Math.Max(ans, dp[i, i] + (nums[i] >= queries[dp[i, i]] ? 1 : 0));
        return ans;
    }
}
```

## Complexity

- Time: O(n^2) — one DP state per contiguous window.
- Space: O(n^2) — the DP table.
