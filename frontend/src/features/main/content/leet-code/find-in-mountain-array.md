# 1095. Find in Mountain Array

**Difficulty:** Hard
**Category:** Array, Binary Search, Interactive

## Problem

Given a "mountain array" accessible only through a `MountainArray` interface (`get(index)` and `length()`), find and return the minimum index where `target` occurs, or `-1` if it doesn't occur, while minimizing the number of `get` calls.

### Example

```
Input: mountainArr = [1,2,3,4,5,3,1], target = 3
Output: 2
```

## Approach

First binary search for the peak index, using the fact that values strictly increase before the peak and strictly decrease after it. Then run two more binary searches for `target`: one over the ascending left segment (`0` to `peak`), and one over the descending right segment (`peak` to `n-1`, with the comparison direction flipped). Return whichever search finds `target` first, preferring the smaller index from the ascending side since it's checked first.

## C# Solution

```csharp
/**
 * // This is MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * interface MountainArray {
 *     public int get(int index) {}
 *     public int length() {}
 * }
 */
class Solution
{
    public int FindInMountainArray(int target, MountainArray mountainArr)
    {
        int n = mountainArr.length();
        int peak = FindPeak(mountainArr, n);

        int leftResult = BinarySearch(mountainArr, target, 0, peak, true);
        if (leftResult != -1) return leftResult;

        return BinarySearch(mountainArr, target, peak, n - 1, false);
    }

    private int FindPeak(MountainArray mountainArr, int n)
    {
        int low = 0, high = n - 1;

        while (low < high)
        {
            int mid = low + (high - low) / 2;
            if (mountainArr.get(mid) < mountainArr.get(mid + 1)) low = mid + 1;
            else high = mid;
        }

        return low;
    }

    private int BinarySearch(MountainArray mountainArr, int target, int low, int high, bool ascending)
    {
        while (low <= high)
        {
            int mid = low + (high - low) / 2;
            int value = mountainArr.get(mid);

            if (value == target) return mid;

            if (ascending)
            {
                if (value < target) low = mid + 1;
                else high = mid - 1;
            }
            else
            {
                if (value > target) low = mid + 1;
                else high = mid - 1;
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(log n)` — three binary searches.
- **Space:** `O(1)`.
