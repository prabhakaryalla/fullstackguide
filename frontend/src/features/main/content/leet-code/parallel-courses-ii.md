# 1494. Parallel Courses II

**Difficulty:** Hard
**Category:** Bitmask, Graph, Topological Sort, Dynamic Programming

## Problem

There are `n` courses with prerequisite pairs `relations`, and you may take at most `k` courses per semester (only after all their prerequisites are completed). Return the minimum number of semesters required to complete all courses, or `-1` if it's impossible (a prerequisite cycle exists).

### Example

```
Input: n = 4, relations = [[2,1],[3,1],[1,4]], k = 2
Output: 3
```

## Approach

Represent the set of completed courses as a bitmask and use `dp[mask]` for the minimum semesters to reach that completed set (`dp[0] = 0`). For each reachable mask, determine which not-yet-taken courses have all their prerequisites satisfied (the "available" set). Enumerate every subset of the available set (using the standard `sub = (sub - 1) & available` submask trick) whose size is at most `k`, and use each as a candidate next semester, updating `dp[mask | sub]`. The answer is `dp[fullMask]`.

## C# Solution

```csharp
public class Solution
{
    public int MinNumberOfSemesters(int n, int[][] relations, int k)
    {
        var prereq = new int[n + 1];
        foreach (var r in relations)
            prereq[r[1]] |= 1 << (r[0] - 1);

        int full = (1 << n) - 1;
        var dp = new int[1 << n];
        Array.Fill(dp, -1);
        dp[0] = 0;

        for (int mask = 0; mask <= full; mask++)
        {
            if (dp[mask] == -1) continue;

            int available = 0;
            for (int c = 1; c <= n; c++)
            {
                if ((mask & (1 << (c - 1))) != 0) continue;
                if ((prereq[c] & mask) == prereq[c]) available |= 1 << (c - 1);
            }

            for (int sub = available; sub > 0; sub = (sub - 1) & available)
            {
                if (PopCount(sub) <= k)
                {
                    int next = mask | sub;
                    if (dp[next] == -1 || dp[next] > dp[mask] + 1)
                        dp[next] = dp[mask] + 1;
                }
            }
        }

        return dp[full];
    }

    private int PopCount(int x)
    {
        int c = 0;
        while (x > 0)
        {
            c += x & 1;
            x >>= 1;
        }
        return c;
    }
}
```

## Complexity

- **Time:** `O(3^n)` in the worst case, from enumerating all submasks of all masks.
- **Space:** `O(2^n)` for the DP array.
