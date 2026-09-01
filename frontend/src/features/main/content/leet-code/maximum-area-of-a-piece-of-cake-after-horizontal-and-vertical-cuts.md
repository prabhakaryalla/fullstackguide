# 1465. Maximum Area of a Piece of Cake After Horizontal and Vertical Cuts

**Difficulty:** Medium
**Category:** Array, Math, Greedy, Sorting

## Problem

Given a rectangular cake of height `h` and width `w`, and arrays of `horizontalCuts` and `verticalCuts` positions, return the area of the largest piece of cake after making all the cuts, modulo `10^9 + 7`.

### Example

```
Input: h = 5, w = 4, horizontalCuts = [1,2,4], verticalCuts = [1,3]
Output: 4
```

## Approach

The largest piece is bounded by the widest gap between consecutive horizontal cuts (including the gaps to the top and bottom edges) multiplied by the widest gap between consecutive vertical cuts (including the gaps to the left and right edges). Sort each cuts array and scan for the maximum consecutive gap, then multiply the two maximum gaps together (modulo the required value).

## C# Solution

```csharp
public class Solution
{
    public int MaxArea(int h, int w, int[] horizontalCuts, int[] verticalCuts)
    {
        const int MOD = 1_000_000_007;

        Array.Sort(horizontalCuts);
        Array.Sort(verticalCuts);

        long maxH = Math.Max(horizontalCuts[0], h - horizontalCuts[^1]);
        for (int i = 1; i < horizontalCuts.Length; i++)
            maxH = Math.Max(maxH, horizontalCuts[i] - horizontalCuts[i - 1]);

        long maxW = Math.Max(verticalCuts[0], w - verticalCuts[^1]);
        for (int i = 1; i < verticalCuts.Length; i++)
            maxW = Math.Max(maxW, verticalCuts[i] - verticalCuts[i - 1]);

        return (int)((maxH * maxW) % MOD);
    }
}
```

## Complexity

- **Time:** `O(m log m + n log n)` for sorting both cuts arrays.
- **Space:** `O(1)` extra space (in-place sort).
