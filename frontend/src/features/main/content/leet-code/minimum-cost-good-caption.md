# 3441. Minimum Cost Good Caption

**Difficulty:** Hard
**Category:** String, Dynamic Programming

## Problem
A string is called a **good caption** if it can be partitioned into consecutive groups where every group consists of a single repeated character and has length at least 3. Given a lowercase string `caption`, you may change any character to any other lowercase letter at a cost equal to the absolute difference between their positions in the alphabet. Return a good caption reachable from `caption` with the minimum total cost (if multiple captions achieve the same minimum cost, return any of them), or an empty string if `caption` is too short (length < 3) to ever form a good caption.

## Approach
A good caption is exactly a partition of the string into contiguous blocks of length `>= 3`, each block rewritten to a single character; adjacent blocks are allowed to share the same character (that just forms one longer valid run), so blocks can be treated independently. For a block `[i, j)`, the cheapest single character to rewrite it to is whichever letter `c` minimizes `sum(|code(t) - c|)` over the block — precomputing, for every letter `c`, a prefix sum of `|code(t) - c|` lets any block's cost for that letter be evaluated in O(1).

Define `dp[i]` as the minimum cost to turn `caption[i:]` into a good caption. Then `dp[n] = 0`, and for `i < n`:

$$dp[i] = \min_{\substack{len \ge 3 \\ i + len \le n}} \; \min_{c} \big(\text{cost}(i, i+len, c) + dp[i + len]\big)$$

Track, for each `i`, which `(len, c)` achieved `dp[i]` so the answer string can be rebuilt by repeatedly emitting `len` copies of `c` and advancing. If `dp[0]` is unreachable (only possible when `n < 3`), return an empty string.

## C# Solution

```csharp
public class Solution 
{
    public string MinCostGoodCaption(string caption) 
    {
        int n = caption.Length;
        if (n < 3) return "";

        long[,] prefixAbs = new long[26, n + 1];
        for (int c = 0; c < 26; c++) 
        {
            for (int i = 0; i < n; i++) 
            {
                prefixAbs[c, i + 1] = prefixAbs[c, i] + Math.Abs((caption[i] - 'a') - c);
            }
        }

        const long inf = long.MaxValue / 2;
        long[] dp = new long[n + 1];
        int[] bestLen = new int[n + 1];
        int[] bestChar = new int[n + 1];
        Array.Fill(dp, inf);
        dp[n] = 0;

        for (int i = n - 1; i >= 0; i--) 
        {
            for (int len = 3; i + len <= n; len++) 
            {
                int j = i + len;
                if (dp[j] >= inf) continue;

                for (int c = 0; c < 26; c++) 
                {
                    long cost = prefixAbs[c, j] - prefixAbs[c, i];
                    long total = cost + dp[j];
                    if (total < dp[i]) 
                    {
                        dp[i] = total;
                        bestLen[i] = len;
                        bestChar[i] = c;
                    }
                }
            }
        }

        if (dp[0] >= inf) return "";

        var sb = new System.Text.StringBuilder();
        int pos = 0;
        while (pos < n) 
        {
            sb.Append((char)('a' + bestChar[pos]), bestLen[pos]);
            pos += bestLen[pos];
        }
        return sb.ToString();
    }
}
```

## Complexity

- **Time:** O(26 · n²) — for each starting position, every block length and every candidate character is evaluated in O(1) thanks to the precomputed prefix sums.
- **Space:** O(26 · n) for the prefix-sum table and the DP/parent arrays.
