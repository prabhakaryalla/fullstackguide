# 1064. Fixed Point

**Difficulty:** Easy
**Category:** Array, Binary Search

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a sorted array of distinct integers `arr`, return the smallest index `i` such that `arr[i] == i`. Return `-1` if no such index exists.

### Example

```
Input: arr = [-10,-5,0,3,7]
Output: 3
```

## Approach

Because `arr` is strictly increasing, `arr[i] - i` is non-decreasing as `i` grows, which makes this a monotonic condition suitable for binary search. If `arr[mid] == mid`, that's a candidate answer, but a smaller qualifying index might still exist to the left, so keep searching left. If `arr[mid] < mid`, the value is "behind" and can never catch up moving left, so search right; otherwise search left.

## C# Solution

```csharp
public class Solution
{
    public int FixedPoint(int[] arr)
    {
        int low = 0, high = arr.Length - 1;
        int result = -1;

        while (low <= high)
        {
            int mid = low + (high - low) / 2;

            if (arr[mid] == mid)
            {
                result = mid;
                high = mid - 1;
            }
            else if (arr[mid] < mid)
            {
                low = mid + 1;
            }
            else
            {
                high = mid - 1;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(log n)`.
- **Space:** `O(1)`.
