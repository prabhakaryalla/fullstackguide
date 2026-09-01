# 2001. Number of Pairs of Interchangeable Rectangles

**Difficulty:** Medium
**Category:** Array, Hash Table, Math, Counting

## Problem

You are given `n` rectangles represented by a 2D integer array `rectangles`, where `rectangles[i] = [widthi, heighti]` denotes the width and height of the `i`th rectangle.

Two rectangles `i` and `j` (with `i != j`) are said to be **interchangeable** if they have the same width-to-height ratio, i.e. `widthi / heighti == widthj / heightj` (using decimal division, not integer division).

Return *the number of pairs of interchangeable rectangles*.

### Example

```
Input: rectangles = [[4,8],[3,6],[10,20],[15,30]]
Output: 6
Explanation: All 4 rectangles have the ratio 1/2, so all C(4,2) = 6 pairs are interchangeable.
```

## Approach

Two rectangles are interchangeable exactly when their width/height ratios are equal, so reduce each `(width, height)` pair to lowest terms by dividing both by their greatest common divisor (GCD). Group rectangles by this reduced ratio using a hash map. For every group with `c` rectangles sharing the same reduced ratio, it contributes `C(c, 2) = c * (c - 1) / 2` interchangeable pairs. Summing this over all groups gives the answer.

## C# Solution

```csharp
public class Solution
{
    public long InterchangeableRectangles(int[][] rectangles)
    {
        var counts = new Dictionary<(long, long), long>();

        foreach (var rect in rectangles)
        {
            int width = rect[0], height = rect[1];
            int g = Gcd(width, height);
            var key = ((long)(width / g), (long)(height / g));
            counts[key] = counts.TryGetValue(key, out var c) ? c + 1 : 1;
        }

        long pairs = 0;
        foreach (var c in counts.Values)
            pairs += c * (c - 1) / 2;

        return pairs;
    }

    private int Gcd(int a, int b) => b == 0 ? a : Gcd(b, a % b);
}
```

## Complexity

- **Time:** `O(n log(max(width, height)))` for the GCD reductions.
- **Space:** `O(n)` for the hash map of reduced ratios.
