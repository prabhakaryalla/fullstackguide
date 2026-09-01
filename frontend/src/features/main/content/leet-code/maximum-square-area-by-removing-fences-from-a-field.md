# 2975. Maximum Square Area by Removing Fences From a Field

**Difficulty:** Medium
**Category:** Array, Hash Table, Enumeration

## Problem

There is an `m x n` rectangular field. `hFences` gives the positions of interior horizontal fences (in addition to the boundary fences at rows `1` and `m`), and `vFences` gives interior vertical fences (in addition to the boundary at columns `1` and `n`). You may remove any subset of the interior fences. Return the **maximum** possible area of a square field formed by four remaining fence lines, modulo `10^9 + 7`, or `-1` if no square can be formed.

### Example

`m = 4`, `n = 3`, `hFences = [2]`, `vFences = []` → answer `4` (using rows `1` and `3` and columns `1` and `3`, forming a `2 x 2` square).

## Approach

Since any subset of fences may be removed, a square of side `s` is achievable exactly when `s` can be expressed both as the difference between two horizontal fence positions (including the row boundaries `1` and `m`) and as the difference between two vertical fence positions (including the column boundaries `1` and `n`).

1. Add boundaries `1` and `m` to `hFences`, and compute all pairwise differences into a set.
2. Add boundaries `1` and `n` to `vFences`, and compute all pairwise differences.
3. Find the largest difference that appears in both sets; that is the maximum square side. If none exists, return `-1`.
4. Return the side squared, modulo `10^9 + 7`.

## C# Solution

```csharp
public class Solution 
{
    public int MaximizeSquareArea(int m, int n, int[] hFences, int[] vFences) 
    {
        const int Mod = 1_000_000_007;

        var hPoints = new List<int>(hFences) { 1, m };
        var vPoints = new List<int>(vFences) { 1, n };
        hPoints.Sort();
        vPoints.Sort();

        var hDiffs = new HashSet<long>();
        for (int i = 0; i < hPoints.Count; i++)
        {
            for (int j = i + 1; j < hPoints.Count; j++)
            {
                hDiffs.Add((long)(hPoints[j] - hPoints[i]));
            }
        }

        long best = -1;
        for (int i = 0; i < vPoints.Count; i++)
        {
            for (int j = i + 1; j < vPoints.Count; j++)
            {
                long diff = vPoints[j] - vPoints[i];
                if (hDiffs.Contains(diff) && diff > best)
                {
                    best = diff;
                }
            }
        }

        if (best <= 0)
        {
            return -1;
        }
        long side = best % Mod;
        return (int)((side * side) % Mod);
    }
}
```

## Complexity

- **Time:** O(h^2 + v^2)
- **Space:** O(h^2 + v^2)
