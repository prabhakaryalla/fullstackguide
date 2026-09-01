# 3669. Balanced K-Factor Decomposition

**Difficulty:** Medium
**Category:** Math, Backtracking, Number Theory

## Problem
Given two integers `n` and `k`, decompose `n` into exactly `k` positive integer factors `f1 * f2 * ... * fk = n` such that the difference between the largest and smallest factor is minimized.

Return the `k` factors (sorted ascending) that achieve the minimum possible difference. If no such decomposition exists, return an empty array.

## Approach
Use backtracking to enumerate all ways to split `n` into `k` ordered (ascending) factors. At each recursive step, try every divisor `f` of the remaining value starting from the previous factor (`minFactor`) so factors are generated in non-decreasing order, which naturally avoids duplicate combinations.

To keep the search efficient, only factors up to `sqrt(remaining)` need to be tried when more than one factor is still left to place, since the co-factor `remaining / f` must be at least as large as `f`. When only one factor remains, the remaining value itself is the last factor (as long as it's not smaller than the previous factor).

Track the best (minimum difference between last and first factor) combination found across the whole search.

## C# Solution

```csharp
public class Solution
{
    private List<int> best;
    private int bestDiff;

    public int[] MinDifferenceFactors(int n, int k)
    {
        best = null;
        bestDiff = int.MaxValue;
        Dfs(n, k, 1, new List<int>());
        return best?.ToArray() ?? Array.Empty<int>();
    }

    private void Dfs(int remaining, int factorsLeft, int minFactor, List<int> current)
    {
        if (factorsLeft == 1)
        {
            if (remaining >= minFactor)
            {
                current.Add(remaining);
                int diff = remaining - current[0];
                if (diff < bestDiff)
                {
                    bestDiff = diff;
                    best = new List<int>(current);
                }
                current.RemoveAt(current.Count - 1);
            }
            return;
        }

        for (int f = minFactor; (long)f * f <= remaining; f++)
        {
            if (remaining % f != 0) continue;

            current.Add(f);
            Dfs(remaining / f, factorsLeft - 1, f, current);
            current.RemoveAt(current.Count - 1);
        }
    }
}
```

## Complexity

- **Time:** O(sqrt(n) ^ k) worst case, bounded in practice by the divisor count of `n`
- **Space:** O(k) recursion depth
