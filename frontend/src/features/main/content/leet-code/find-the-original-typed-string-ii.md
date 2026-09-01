# 3333. Find the Original Typed String II

**Difficulty:** Hard
**Category:** String, Dynamic Programming, Prefix Sum

## Problem

Alice may hold a key too long, causing a character to be typed multiple times, and this can happen for **any number of runs** (not just once). Given the resulting string `word` and a positive integer `k`, return the number of possible original strings Alice might have intended to type, if the original string has length at least `k`. Return the answer modulo `10^9 + 7`.

### Example

Input: `word = "aaabbb", k = 3`

Output: `8`

Explanation: Of the 9 total combinations (3 choices for the `a` run times 3 for the `b` run), only choosing length 1 for both runs (total length 2) falls below k = 3, leaving 8.

## Approach

Split `word` into maximal runs of length `L_1, ..., L_m`. Each run independently could have originally been any length from `1` to `L_i`, so the **total** number of possible original strings (ignoring the length constraint) is `product(L_i)`.

We need the count where the total original length is `>= k`, i.e., `total - count(sum < k)`.

To count assignments with `sum <= k - 1`: use a bounded DP over sums `0..k-1`. Since every run contributes at least 1 to the sum, once the number of processed runs reaches `k`, the minimum possible sum already reaches or exceeds `k`, making further contributions to "sum <= k-1" impossible — so we can stop early after processing at most `k` runs, bounding the DP work to `O(k^2)` regardless of how many runs there are.

For each run of length `L`, update the DP using a prefix-sum trick so that `ndp[j] = sum(dp[j-x])` for `x` from `1` to `min(L, j)` is computed in O(1) per `j`.

## C# Solution

```csharp
public class Solution 
{
    private const int MOD = 1_000_000_007;

    public int PossibleStringCount(string word, int k) 
    {
        int n = word.Length;
        var runs = new List<int>();
        int i = 0;
        while (i < n)
        {
            int j = i;
            while (j < n && word[j] == word[i]) j++;
            runs.Add(j - i);
            i = j;
        }

        long total = 1;
        foreach (int l in runs) total = total * l % MOD;

        if (k <= runs.Count)
        {
            return (int)total;
        }

        int cap = k - 1;
        long[] dp = new long[cap + 1];
        dp[0] = 1;
        int processed = 0;

        foreach (int l in runs)
        {
            if (processed > cap) break;

            long[] prefix = new long[cap + 2];
            for (int s = 0; s <= cap; s++) prefix[s + 1] = (prefix[s] + dp[s]) % MOD;

            long[] ndp = new long[cap + 1];
            for (int j = 0; j <= cap; j++)
            {
                int maxX = Math.Min(l, j);
                if (maxX <= 0) continue;
                int lo = j - maxX;
                int hi = j - 1;
                ndp[j] = (prefix[hi + 1] - prefix[lo] + MOD) % MOD;
            }

            dp = ndp;
            processed++;
        }

        long invalid = 0;
        for (int s = 0; s <= cap; s++) invalid = (invalid + dp[s]) % MOD;

        long ans = (total - invalid % MOD + MOD) % MOD;
        return (int)ans;
    }
}
```

## Complexity

- **Time:** O(k^2) since at most `k` runs are ever processed, each with O(k) work.
- **Space:** O(k) for the DP array.
