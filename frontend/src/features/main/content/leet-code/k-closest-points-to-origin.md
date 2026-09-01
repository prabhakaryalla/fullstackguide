# 973. K Closest Points to Origin

**Difficulty:** Medium
**Category:** Array, Math, Divide and Conquer, Geometry, Sorting, Heap, Quickselect

## Problem

Given an array of `points` and an integer `k`, return the `k` points closest to the origin `(0, 0)` (Euclidean distance). Any order is acceptable.

### Example

```
Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]
```

## Approach

Since only relative distance matters, compare squared distances (avoiding square roots) to sort all points, then take the first `k`.

## C# Solution

```csharp
public class Solution
{
    public int[][] KClosest(int[][] points, int k)
    {
        Array.Sort(points, (a, b) =>
            (a[0] * a[0] + a[1] * a[1]).CompareTo(b[0] * b[0] + b[1] * b[1]));

        return points.Take(k).ToArray();
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the output.
