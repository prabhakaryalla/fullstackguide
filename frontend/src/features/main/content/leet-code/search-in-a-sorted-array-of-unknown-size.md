# 702. Search in a Sorted Array of Unknown Size

**Difficulty:** Medium
**Category:** Array, Binary Search, Interactive
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a sorted (ascending) integer array of unknown size accessed only via an `ArrayReader` interface (where `reader.Get(index)` returns the element, or `2^31 - 1` if `index` is out of bounds), and a `target` value, return the index of `target`, or `-1` if not present.

### Example

```
Input: array of unknown size = [-1,0,3,5,9,12], target = 9
Output: 4
```

## Approach

First find a valid search boundary using exponential (doubling) search: starting with a window of size 1, repeatedly double the right boundary until `reader.Get(right)` is at least `target` (this terminates quickly since out-of-bounds reads return a sentinel larger than any valid target). Then run standard binary search within that bounded window.

## C# Solution

```csharp
public class Solution
{
    public int Search(ArrayReader reader, int target)
    {
        int left = 0, right = 1;

        while (reader.Get(right) < target)
        {
            left = right;
            right *= 2;
        }

        while (left <= right)
        {
            int mid = left + (right - left) / 2;
            int value = reader.Get(mid);

            if (value == target) return mid;
            if (value < target) left = mid + 1;
            else right = mid - 1;
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(log n)`, where `n` is the position of `target` (or the array's true size).
- **Space:** `O(1)`.
