# 3756. Concatenate Non-Zero Digits and Multiply by Sum II

**Difficulty:** Medium
**Category:** Math, String, Prefix Sum

## Problem

You are given a digit string `s` and queries `[li, ri]`. For each query, take the substring `s[li..ri]`, form `x` by concatenating its non-zero digits (or `0` if none), let `sum` be the digit sum of `x`, and the answer is `x * sum` modulo `10^9 + 7`.

### Example

Input: `s = "10203004", queries = [[0,7],[1,3],[4,6]]`
Output: `[12340, 4, 9]`

## Approach

Compress the string to only its non-zero digits, building a prefix count array (to map an original range to a range in the compressed array), a prefix value array `P` mod `1e9+7` (as if the compressed digits were concatenated), a `pow10` table, and a digit-sum prefix array. A query range maps to a compressed sub-range `[lo,hi]`; its concatenated value is `P[hi+1] - P[lo] * pow10[hi-lo+1] (mod M)` and its digit sum is `sumPrefix[hi+1] - sumPrefix[lo]`.

## C# Solution

```csharp
public class Solution 
{
    private const long MOD = 1_000_000_007;

    public int[] SumAndMultiply(string s, int[][] queries) 
    {
        int n = s.Length;
        var nzCount = new int[n + 1];
        var vals = new List<int>();
        for (int i = 0; i < n; i++)
        {
            int d = s[i] - '0';
            nzCount[i + 1] = nzCount[i] + (d != 0 ? 1 : 0);
            if (d != 0) vals.Add(d);
        }
        int m = vals.Count;
        var P = new long[m + 1];
        var pow10 = new long[m + 1];
        var sumPrefix = new long[m + 1];
        pow10[0] = 1;
        for (int i = 1; i <= m; i++)
        {
            P[i] = (P[i - 1] * 10 + vals[i - 1]) % MOD;
            pow10[i] = (pow10[i - 1] * 10) % MOD;
            sumPrefix[i] = sumPrefix[i - 1] + vals[i - 1];
        }

        var ans = new int[queries.Length];
        for (int q = 0; q < queries.Length; q++)
        {
            int l = queries[q][0], r = queries[q][1];
            int lo = nzCount[l];
            int hi = nzCount[r + 1] - 1;
            if (lo > hi) { ans[q] = 0; continue; }
            int cnt = hi - lo + 1;
            long x = ((P[hi + 1] - P[lo] * pow10[cnt]) % MOD + MOD) % MOD;
            long sum = sumPrefix[hi + 1] - sumPrefix[lo];
            ans[q] = (int)((x * sum) % MOD);
        }
        return ans;
    }
}
```

## Complexity

- **Time:** O(n + q)
- **Space:** O(n + q)
