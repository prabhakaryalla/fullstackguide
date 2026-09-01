# 852. Peak Index in a Mountain Array

**Difficulty:** Medium
**Category:** Array, Binary Search

## Problem

Given a "mountain array" (strictly increasing then strictly decreasing), return the index of its peak element.

### Example

```
Input: arr = [0,10,5,2]
Output: 1
```

## Approach

Binary search for the peak: at each midpoint, if the element is smaller than the next one, the array is still increasing there, so the peak must be further right; otherwise, the peak is at or before the midpoint. This converges to the peak index.

## C# Solution

```csharp
public class Solution
{
    public int PeakIndexInMountainArray(int[] arr)
    {
        int left = 0, right = arr.Length - 1;

        while (left < right)
        {
            int mid = left + (right - left) / 2;

            if (arr[mid] < arr[mid + 1])
                left = mid + 1;
            else
                right = mid;
        }

        return left;
    }
}
```

## Complexity

- **Time:** `O(log n)`.
- **Space:** `O(1)`.
