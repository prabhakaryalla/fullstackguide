# 1564. Put Boxes Into the Warehouse I

**Difficulty:** Medium
**Category:** Array, Two Pointers, Greedy, Sorting

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `warehouse` array where `warehouse[i]` is the height of room `i`, and an array `boxes` of box heights, boxes can only be pushed in from the left end of the warehouse (so a box placed in room `i` must be able to pass through every room from `0` to `i`). Return the maximum number of boxes that can be stored.

### Example

```
Input: boxes = [4,3,4,1], warehouse = [5,3,3,4,1]
Output: 3
```

## Approach

First compute each room's *effective* usable height, defined as the minimum warehouse height from the entrance up to and including that room (since a box must clear every room before it to get there); this effective-height sequence is non-increasing from left to right. Sort `boxes` ascending. Then greedily match boxes to rooms starting from the *innermost* room (the end of the effective-height array, which has the smallest constraint) moving toward the entrance — this ordering of rooms is non-decreasing in effective height, so a two-pointer greedy (always trying the next smallest unplaced box against the next room) maximizes the count of boxes that fit.

## C# Solution

```csharp
public class Solution
{
    public int MaxBoxesInWarehouse(int[] boxes, int[] warehouse)
    {
        int n = warehouse.Length;
        int[] effectiveHeight = new int[n];
        int minSoFar = int.MaxValue;

        for (int i = 0; i < n; i++)
        {
            minSoFar = Math.Min(minSoFar, warehouse[i]);
            effectiveHeight[i] = minSoFar;
        }

        Array.Sort(boxes);

        int boxIndex = 0;
        int count = 0;

        for (int room = n - 1; room >= 0 && boxIndex < boxes.Length; room--)
        {
            if (boxes[boxIndex] <= effectiveHeight[room])
            {
                boxIndex++;
                count++;
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n log n + b log b)` — sorting the boxes plus a linear scan of the warehouse.
- **Space:** `O(n)` for the effective-height array.
