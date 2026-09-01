# 845. Longest Mountain in Array

**Difficulty:** Medium
**Category:** Array, Two Pointers, Dynamic Programming, Enumeration

## Problem

A "mountain" is a subarray that strictly increases to a single peak, then strictly decreases, with at least one element on each side of the peak. Given an integer array `arr`, return the length of the longest mountain subarray, or `0` if none exists.

### Example

```
Input: arr = [2,1,4,7,3,2,5]
Output: 5
```

## Approach

Scan for indices that are local peaks (strictly greater than both neighbors). For each peak found, expand left while the sequence keeps strictly increasing toward it, and expand right while it keeps strictly decreasing away from it. Track the resulting mountain length, then jump the scan past the mountain's right edge to avoid redundant re-scanning.

## C# Solution

```csharp
public class Solution
{
    public int LongestMountain(int[] arr)
    {
        int n = arr.Length;
        int maxLength = 0;
        int i = 1;

        while (i < n - 1)
        {
            if (arr[i - 1] < arr[i] && arr[i] > arr[i + 1])
            {
                int left = i - 1, right = i + 1;

                while (left > 0 && arr[left - 1] < arr[left]) left--;
                while (right < n - 1 && arr[right] > arr[right + 1]) right++;

                maxLength = Math.Max(maxLength, right - left + 1);
                i = right + 1;
            }
            else
            {
                i++;
            }
        }

        return maxLength;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` extra.
