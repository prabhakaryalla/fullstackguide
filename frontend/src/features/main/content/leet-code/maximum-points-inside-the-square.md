# 3143. Maximum Points Inside the Square

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Binary Search, Sorting

## Problem

You are given a 0-indexed array `points` of 2D coordinates and a string `s`, where `s[i]` is the (lowercase letter) tag of `points[i]`. A square centered at the origin with half-side-length `k` "contains" a point if both its coordinates have absolute value `<= k` (on its boundary counts as inside). Return the maximum value of `k` such that the square contains points with **all distinct tags** (no repeated letters among the contained points), expressed as the number of points that fit under that optimal `k`.

## Approach

For each tag (letter), a point's "size" is `max(|x|, |y|)` — the smallest square half-side that would include it. Track, per letter, the smallest size seen (`minSizes[letter]`), and separately track the second-smallest size across *all* points regardless of letter (`secondMinSize`) — this represents the tightest constraint: once the square grows large enough to include a second point of some already-included letter (or any duplicate), tags stop being distinct. As you scan all points, update `minSizes` and `secondMinSize` accordingly. The answer is the count of letters whose minimum size is strictly less than `secondMinSize` — those letters can all be simultaneously included without hitting a conflict.

## C# Solution

```csharp
public class Solution {
    public int MaxPointsInsideSquare(int[][] points, string s) {
        int secondMinSize = int.MaxValue;
        int[] minSizes = new int[26];
        Array.Fill(minSizes, int.MaxValue);

        for (int i = 0; i < points.Length; i++) {
            int x = points[i][0], y = points[i][1];
            int sz = Math.Max(Math.Abs(x), Math.Abs(y));
            int j = s[i] - 'a';
            if (minSizes[j] == int.MaxValue) {
                minSizes[j] = sz;
            } else if (sz < minSizes[j]) {
                secondMinSize = Math.Min(secondMinSize, minSizes[j]);
                minSizes[j] = sz;
            } else {
                secondMinSize = Math.Min(secondMinSize, sz);
            }
        }

        return minSizes.Count(sz => sz < secondMinSize);
    }
}
```

## Complexity

- Time: O(n) — one pass over the points, plus a fixed 26-slot scan.
- Space: O(1) — the fixed 26-slot array.
