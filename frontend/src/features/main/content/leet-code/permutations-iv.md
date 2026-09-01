# 3470. Permutations IV

**Difficulty:** Hard
**Category:** Backtracking, Bit Manipulation, Combinatorics, Dynamic Programming

## Problem
Given two integers `n` and `k`, consider every **alternating (zigzag) permutation** of `[1, 2, ..., n]` — that is, every permutation `perm` such that `perm[0] < perm[1] > perm[2] < perm[3] > ...`. Sort all such permutations lexicographically and return the `k`-th one (1-indexed) as an array. If fewer than `k` alternating permutations exist, return an empty array.

## Approach
Reconstruct the answer digit by digit, exactly like the classic "k-th permutation" problem, but every candidate must additionally respect the alternating relation with the previously placed value.

For a fixed prefix, define `CountCompletions(usedMask, last, needGreater)` as the number of ways to complete the remaining positions given which numbers are already used, the previous value `last`, and whether the next value must be greater than or less than `last`. This is memoized because the same `(usedMask, last, needGreater)` state recurs across different branches of the search — the state space is bounded by `2^n · n · 2`, which is small for the `n` sizes these problems use.

At each position, try candidates in increasing order; if `k` is larger than the count of completions starting with that candidate, subtract it from `k` and move to the next candidate; otherwise fix that candidate and recurse into the next position.

## C# Solution

```csharp
public class Solution 
{
    private int n;
    private Dictionary<(int mask, int last, bool needGreater), long> memo;

    public int[] PermutationsIVKth(int n, long k)
    {
        this.n = n;
        memo = new Dictionary<(int, int, bool), long>();

        var result = new int[n];
        int usedMask = 0;
        int last = 0;
        bool needGreater = false;

        for (int pos = 0; pos < n; pos++)
        {
            bool placed = false;
            for (int v = 1; v <= n; v++)
            {
                int bit = 1 << (v - 1);
                if ((usedMask & bit) != 0) continue;
                if (pos > 0)
                {
                    if (needGreater && v <= last) continue;
                    if (!needGreater && v >= last) continue;
                }

                bool nextNeedGreater = pos == 0 ? true : !needGreater;
                long cnt = CountCompletions(usedMask | bit, v, nextNeedGreater, pos + 1);

                if (k <= cnt)
                {
                    result[pos] = v;
                    usedMask |= bit;
                    last = v;
                    needGreater = nextNeedGreater;
                    placed = true;
                    break;
                }
                k -= cnt;
            }

            if (!placed) return Array.Empty<int>();
        }

        return result;
    }

    private long CountCompletions(int usedMask, int last, bool needGreater, int filledCount)
    {
        if (filledCount == n) return 1;

        var key = (usedMask, last, needGreater);
        if (memo.TryGetValue(key, out long cached)) return cached;

        long total = 0;
        for (int v = 1; v <= n; v++)
        {
            int bit = 1 << (v - 1);
            if ((usedMask & bit) != 0) continue;
            if (needGreater && v <= last) continue;
            if (!needGreater && v >= last) continue;
            total += CountCompletions(usedMask | bit, v, !needGreater, filledCount + 1);
        }

        memo[key] = total;
        return total;
    }
}
```

## Complexity

- **Time:** O(2^n · n²) in the worst case for building the memo table, which is acceptable for the small `n` these problems use.
- **Space:** O(2^n · n) for the memoization dictionary.
