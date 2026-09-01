# 3109. Find the Index of Permutation

**Difficulty:** Hard
**Category:** Array, Binary Indexed Tree, Math

## Problem

Given a permutation `perm` of the integers `1` to `n`, return its 0-indexed position (rank) among all `n!` permutations of `1..n` listed in lexicographic order, modulo `10^9 + 7`.

## Approach

The classic "permutation rank" technique: for each position `i` (left to right), count how many of the numbers smaller than `perm[i]` have **not** yet been used at earlier positions — call this `unusedNums`. Each such unused smaller number, if placed at position `i` instead, would produce a lexicographically smaller permutation, and the remaining `n - 1 - i` positions could be filled in any order, contributing `(n - 1 - i)!` permutations each. Sum `unusedNums * (n - 1 - i)!` over every position (mod the given modulus). A Fenwick (Binary Indexed Tree) tracks which numbers have been used so far, letting `unusedNums` be computed as `perm[i] - 1 - (count of used numbers below perm[i])` in O(log n).

## C# Solution

```csharp
public class Solution {
    public int GetPermutationIndex(int[] perm) {
        const int mod = 1_000_000_007;
        int n = perm.Length;
        long ans = 0;
        var tree = new FenwickTree(n);
        long[] fact = new long[n + 1];
        Array.Fill(fact, 1L);
        for (int i = 2; i <= n; i++)
            fact[i] = fact[i - 1] * i % mod;

        for (int i = 0; i < n; i++) {
            int num = perm[i];
            int unusedNums = num - 1 - tree.Get(num - 1);
            long suffixLength = fact[n - 1 - i];
            ans = (ans + unusedNums * suffixLength) % mod;
            tree.Add(num, 1);
        }

        return (int)ans;
    }

    private class FenwickTree {
        private readonly int[] sums;

        public FenwickTree(int n) {
            sums = new int[n + 1];
        }

        public void Add(int i, int delta) {
            for (; i < sums.Length; i += Lowbit(i))
                sums[i] += delta;
        }

        public int Get(int i) {
            int sum = 0;
            for (; i > 0; i -= Lowbit(i))
                sum += sums[i];
            return sum;
        }

        private static int Lowbit(int i) => i & -i;
    }
}
```

## Complexity

- Time: O(n log n) — each position performs O(log n) Fenwick tree work.
- Space: O(n) — the Fenwick tree and factorial table.
