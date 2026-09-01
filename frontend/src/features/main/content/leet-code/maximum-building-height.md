# 1840. Maximum Building Height

**Difficulty:** Hard
**Category:** Array, Math, Greedy, Sorting

## Problem

You may build `n` buildings in a row (1-indexed), each with a non-negative integer height. Building `1` must have height `0`. Adjacent buildings' heights may differ by at most `1`. A list of `restrictions[i] = [id, maxHeight]` caps the height of building `id`. Return the maximum possible height of the tallest building overall.

### Example

```
Input: n = 5, restrictions = [[2,1],[4,1]]
Output: 2
```

## Approach

Add the implicit restrictions `(1, 0)` and `(n, n-1)`, then sort all restrictions by building id. Because adjacent heights differ by at most `1`, tighten every restriction using a left-to-right pass (`height[i] = min(height[i], height[i-1] + gap)`) and then a right-to-left pass, so each restriction reflects the true achievable cap given all others. Finally, for every consecutive pair of (now-consistent) restrictions, the maximum height achievable strictly between them is a classic "meeting in the middle" peak: `(h1 + h2 + gap) / 2` (integer division), since the height can rise from `h1` and fall to `h2` symmetrically around that peak. The overall answer is the maximum peak across all adjacent pairs.

## C# Solution

```csharp
public class Solution
{
    public int MaxBuilding(int n, int[][] restrictions)
    {
        var list = new List<int[]>(restrictions) { new[] { 1, 0 }, new[] { n, n - 1 } };
        list.Sort((a, b) => a[0].CompareTo(b[0]));

        int m = list.Count;

        for (int i = 1; i < m; i++)
        {
            list[i][1] = Math.Min(list[i][1], list[i - 1][1] + (list[i][0] - list[i - 1][0]));
        }

        for (int i = m - 2; i >= 0; i--)
        {
            list[i][1] = Math.Min(list[i][1], list[i + 1][1] + (list[i + 1][0] - list[i][0]));
        }

        int best = 0;
        for (int i = 1; i < m; i++)
        {
            int id1 = list[i - 1][0], h1 = list[i - 1][1];
            int id2 = list[i][0], h2 = list[i][1];
            int peak = (h1 + h2 + (id2 - id1)) / 2;
            best = Math.Max(best, peak);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(m log m)` where `m` is the number of restrictions, dominated by the sort.
- **Space:** `O(m)` for the augmented, sorted restriction list.
