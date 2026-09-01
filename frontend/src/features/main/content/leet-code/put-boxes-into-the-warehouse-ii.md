# 1580. Put Boxes Into the Warehouse II

**Difficulty:** Medium
**Category:** Array, Two Pointers, Greedy, Sorting

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `warehouse` array of room heights and an array `boxes` of box heights, boxes can now be pushed in from **either** end of the warehouse. A box placed in room `i` only needs to clear the smaller side's path to reach it. Return the maximum number of boxes that can be stored.

### Example

```
Input: boxes = [1,2,2,3,4], warehouse = [3,1,3,3,4]
Output: 3
```

## Approach

Since boxes may enter from either end, the effective usable height of room `i` is the minimum warehouse height encountered from whichever side is closer — equivalently, `effectiveHeight[i] = min(prefixMin[i], suffixMin[i])`, where `prefixMin` scans left to right and `suffixMin` scans right to left. Once these effective heights are computed, sort them, sort `boxes` ascending, and use a simple two-pointer greedy: repeatedly try to fit the smallest remaining box into the smallest remaining effective-height room; if it fits, place it and advance both pointers, otherwise skip that room.

## C# Solution

```csharp
public class Solution
{
    public int MaxBoxesInWarehouse(int[] boxes, int[] warehouse)
    {
        int n = warehouse.Length;
        int[] leftMin = new int[n];
        int[] rightMin = new int[n];

        int minFromLeft = int.MaxValue;
        for (int i = 0; i < n; i++)
        {
            minFromLeft = Math.Min(minFromLeft, warehouse[i]);
            leftMin[i] = minFromLeft;
        }

        int minFromRight = int.MaxValue;
        for (int i = n - 1; i >= 0; i--)
        {
            minFromRight = Math.Min(minFromRight, warehouse[i]);
            rightMin[i] = minFromRight;
        }

        int[] effectiveHeight = new int[n];
        for (int i = 0; i < n; i++)
        {
            effectiveHeight[i] = Math.Min(leftMin[i], rightMin[i]);
        }

        Array.Sort(effectiveHeight);
        Array.Sort(boxes);

        int boxIndex = 0;
        int count = 0;

        for (int room = 0; room < n && boxIndex < boxes.Length; room++)
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

- **Time:** `O(n log n + b log b)` — computing prefix minimums in `O(n)`, then sorting both arrays.
- **Space:** `O(n)` for the effective-height array.
