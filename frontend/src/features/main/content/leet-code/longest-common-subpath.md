# 1923. Longest Common Subpath

**Difficulty:** Hard
**Category:** Array, Binary Search, Suffix Array, Hash Function, Rolling Hash

## Problem

There are `n` roads and a network of `m` friends, each friend `i` travels along a path `paths[i]`, a sequence of road ids. Return the length of the longest common subpath (contiguous, in order) shared by all `m` paths; return `0` if none exists.

### Example

```
Input: n = 5, paths = [[0,1,2,3,4],[2,3,4],[4,0,1,2,3]]
Output: 2
Explanation: The longest common contiguous subpath is [2,3] (also present as a substring within each path).
```

### Constraints

- `1 <= n <= 10^5`
- `m == paths.length`
- `2 <= m <= 10^5`
- Sum of `paths[i].length` over all `i` does not exceed `10^5`.

## Approach

Binary search on the candidate answer length `L`. For a fixed `L`, use polynomial rolling hashing to compute the hash of every length-`L` window in every path, storing all hashes for one path in a set; for a common subpath of length `L` to exist, some hash must be present in the hash sets of every path. Take the intersection (smallest path's hash set is checked against all others) and, if non-empty (after handling potential hash collisions, e.g. with double hashing or an occasional direct comparison), `L` is feasible — search for the largest feasible `L` via binary search over `[0, min path length]`.

## C# Solution

```csharp
public class Solution
{
    private const long Mod = 1_000_000_007L;
    private const long Base = 131L;

    public int LongestCommonSubpath(int n, int[][] paths)
    {
        int minLen = paths.Min(p => p.Length);
        int lo = 0, hi = minLen;

        while (lo < hi)
        {
            int mid = lo + (hi - lo + 1) / 2;
            if (HasCommonSubpathOfLength(paths, mid))
            {
                lo = mid;
            }
            else
            {
                hi = mid - 1;
            }
        }

        return lo;
    }

    private bool HasCommonSubpathOfLength(int[][] paths, int len)
    {
        if (len == 0) return true;

        HashSet<long> common = null;

        foreach (var path in paths)
        {
            if (path.Length < len) return false;

            var hashesInPath = new HashSet<long>();
            long hash = 0, power = 1;

            for (int i = 0; i < len; i++)
            {
                hash = (hash * Base + path[i] + 1) % Mod;
                if (i > 0) power = power * Base % Mod;
            }
            hashesInPath.Add(hash);

            for (int i = len; i < path.Length; i++)
            {
                hash = (hash - (path[i - len] + 1) * power % Mod * Base % Mod + Mod * Base) % Mod;
                hash = (hash + path[i] + 1) % Mod;
                hashesInPath.Add(hash);
            }

            if (common == null)
            {
                common = hashesInPath;
            }
            else
            {
                common.IntersectWith(hashesInPath);
                if (common.Count == 0) return false;
            }
        }

        return common != null && common.Count > 0;
    }
}
```

## Complexity

- **Time:** `O(N log(minLen))` where `N` is the total number of road entries across all paths — a rolling-hash pass per binary search step.
- **Space:** `O(N)` for the hash sets.
