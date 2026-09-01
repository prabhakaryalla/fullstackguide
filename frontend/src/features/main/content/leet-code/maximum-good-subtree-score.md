# 3575. Maximum Good Subtree Score

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Bit Manipulation, Tree, Depth-First Search, Bitmask

## Problem
You are given an undirected tree rooted at node 0 with `n` nodes numbered 0 to `n - 1`. Each node `i` has an integer value `vals[i]`, and its parent is given by `par[i]` (`par[0] == -1`).

A subset of nodes within the subtree of a node is **good** if every digit from 0 to 9 appears at most once across the decimal representations of the selected nodes' values. The score of a good subset is the sum of the values of its nodes.

Define `maxScore[u]` as the maximum possible sum of values of a good subset of nodes belonging to the subtree rooted at `u` (including `u` itself and all descendants).

Return the sum of all values in `maxScore`, modulo `10^9 + 7`.

### Example

```
Input: vals = [3,22,5], par = [-1,0,1]
Output: 18
Explanation: 
Subtree of 0: {3,22,5}; 22 has a repeated digit '2' so the best good subset is {3,5}, score 8.
Subtree of 1: {22,5}; best good subset is {5}, score 5.
Subtree of 2: {5}; score 5.
maxScore = [8,5,5], sum = 18.
```

**Constraints:**
- `1 <= n == vals.length <= 500`
- `1 <= vals[i] <= 10^9`

## Approach
This is a tree dynamic programming problem using a digit-usage bitmask (10 bits, one per digit 0-9). For each node `u`, maintain `dp[u][mask]`, the maximum achievable sum in the subtree of `u` using a good subset whose combined digit usage is a **subset** of `mask` (monotonic in `mask`).

Merge children one at a time into a running accumulator using a disjoint-union bitmask combine: for each resulting mask `M`, enumerate all submasks `sub` of `M` (a standard `O(3^10)` submask enumeration trick) and take `result[M] = max over sub of acc[M ^ sub] + child[sub]`, since the two parts must use disjoint digit sets. After merging all children, similarly merge in an "item" representing the option to include `u`'s own value (only valid if its own digits are all distinct) versus not including it. Finally, `maxScore[u]` is the maximum value across all mask states in `dp[u]`, and the answer sums these across all nodes.

## C# Solution

```csharp
public class Solution 
{
    private const int MOD = 1_000_000_007;
    private const int Masks = 1024;
    private int[] vals;
    private List<int>[] children;
    private long[][] dp;
    private long answer = 0;

    public int GoodSubtreeScoreSum(int[] vals, int[] par) 
    {
        int n = vals.Length;
        this.vals = vals;
        children = new List<int>[n];
        for (int i = 0; i < n; i++) children[i] = new List<int>();
        for (int i = 1; i < n; i++) children[par[i]].Add(i);

        dp = new long[n][];
        Dfs(0);

        return (int)(answer % MOD);
    }

    private void Dfs(int u)
    {
        long[] acc = new long[Masks];
        Array.Fill(acc, -1L);
        acc[0] = 0;

        foreach (int c in children[u])
        {
            Dfs(c);
            acc = Merge(acc, dp[c]);
        }

        long[] item = new long[Masks];
        Array.Fill(item, -1L);
        item[0] = 0;
        int ownMask = DigitMask(vals[u]);
        if (ownMask != -1) item[ownMask] = vals[u];

        acc = Merge(acc, item);
        dp[u] = acc;

        long best = 0;
        foreach (long v in acc) if (v > best) best = v;
        answer += best;
    }

    private long[] Merge(long[] acc, long[] item)
    {
        long[] result = new long[Masks];
        Array.Fill(result, -1L);

        for (int m = 0; m < Masks; m++)
        {
            int sub = m;
            while (true)
            {
                int rest = m ^ sub;
                if (acc[rest] >= 0 && item[sub] >= 0)
                {
                    long val = acc[rest] + item[sub];
                    if (val > result[m]) result[m] = val;
                }
                if (sub == 0) break;
                sub = (sub - 1) & m;
            }
        }

        return result;
    }

    private int DigitMask(int val)
    {
        int mask = 0;
        while (val > 0)
        {
            int d = val % 10;
            int bit = 1 << d;
            if ((mask & bit) != 0) return -1;
            mask |= bit;
            val /= 10;
        }
        return mask;
    }
}
```

## Complexity

- **Time:** O(n * 3^10), for the submask-enumeration merges across all nodes.
- **Space:** O(n * 1024), for the per-node DP tables.
