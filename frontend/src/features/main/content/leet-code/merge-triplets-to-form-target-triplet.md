# 1899. Merge Triplets to Form Target Triplet

**Difficulty:** Medium
**Category:** Array, Greedy

## Problem

Given a list of triplets and a `target` triplet, you may repeatedly replace two triplets `a` and `b` with `[max(a[0],b[0]), max(a[1],b[1]), max(a[2],b[2])]`. Return whether it's possible to obtain the exact `target` triplet this way.

### Example

```
Input: triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]
Output: true
```

## Approach

Discard any triplet that exceeds `target` in any coordinate — it can never contribute usefully, since taking its max with anything would overshoot the target in that coordinate. Among the remaining (all component-wise `<= target`) triplets, take the coordinate-wise maximum across all of them; if that combined result equals `target` exactly, it's achievable (by merging all qualifying triplets together), otherwise it's not.

## C# Solution

```csharp
public class Solution
{
    public bool MergeTriplets(int[][] triplets, int[] target)
    {
        int a = 0, b = 0, c = 0;

        foreach (var t in triplets)
        {
            if (t[0] <= target[0] && t[1] <= target[1] && t[2] <= target[2])
            {
                a = Math.Max(a, t[0]);
                b = Math.Max(b, t[1]);
                c = Math.Max(c, t[2]);
            }
        }

        return a == target[0] && b == target[1] && c == target[2];
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
