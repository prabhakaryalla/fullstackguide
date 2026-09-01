# 3501. Maximize Active Section with Trade II

**Difficulty:** Hard
**Category:** Array, String, Binary Search, Segment Tree

## Problem
You are given a binary string `s` of length `n`, where `'1'` represents an active section and `'0'` represents an inactive section, along with a 2D array `queries` where `queries[i] = [l, r]` represents the substring `s[l..r]`.

For each query, treat `s[l..r]` as an independent string augmented with a `'1'` at both ends (`t = '1' + s[l..r] + '1'`, where the augmented characters never contribute to the final count), and compute the maximum number of active sections achievable after at most one trade on it (the same trade defined in "Maximize Active Section with Trade I": convert a `'1'`-block surrounded by `'0'`s to `'0'`s, then convert a `'0'`-block surrounded by `'1'`s to `'1'`s). Return an array `answer` where `answer[i]` is the result for `queries[i]`. Queries are independent of each other.

### Example
Input: `s = "0100"`, `queries = [[0, 2], [1, 3]]`
Output: `[3, 1]`
Explanation: Query `[0, 2]` looks at substring `"010"` (augmented `"10101"`); merging the two single-zero runs around the interior `'1'` gives `3` active sections. Query `[1, 3]` looks at substring `"100"`, which has no `'1'`-block surrounded by `'0'`s, so no trade is possible and the answer is just its own count of `'1'`s, `1`.

## Approach
Because each query is independent and self-contained (the substring is analyzed exactly as its own standalone string, per the augmentation note), the same run-length analysis as "Maximize Active Section with Trade I" applies to each query's substring: split it into maximal zero-runs, and the best possible gain is the maximum sum of two adjacent zero-run lengths, added to the substring's own count of `'1'`s.

## C# Solution

```csharp
public class Solution {
    public int[] MaxActiveSectionsAfterTrade(string s, int[][] queries) {
        int[] ans = new int[queries.Length];
        for (int i = 0; i < queries.Length; i++) {
            int l = queries[i][0], r = queries[i][1];
            ans[i] = Solve(s.Substring(l, r - l + 1));
        }
        return ans;
    }

    private int Solve(string sub) {
        List<int> zeroGroupLengths = new List<int>();
        for (int i = 0; i < sub.Length; i++) {
            if (sub[i] == '0') {
                if (i > 0 && sub[i - 1] == '0')
                    zeroGroupLengths[zeroGroupLengths.Count - 1]++;
                else
                    zeroGroupLengths.Add(1);
            }
        }

        int maxZeroMerge = 0;
        for (int i = 0; i + 1 < zeroGroupLengths.Count; i++)
            maxZeroMerge = Math.Max(maxZeroMerge, zeroGroupLengths[i] + zeroGroupLengths[i + 1]);

        int ones = 0;
        foreach (char c in sub) if (c == '1') ones++;

        return ones + maxZeroMerge;
    }
}
```

## Complexity

- **Time:** O(n * q) for this straightforward per-query recomputation, where n is the string length and q is the number of queries (an optimized solution precomputes zero-run merge lengths into a sparse table / segment tree for O((n + q) log n))
- **Space:** O(n)
