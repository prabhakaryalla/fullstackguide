# 941. Valid Mountain Array

**Difficulty:** Easy
**Category:** Array

## Problem

Given an integer array `arr`, return `true` if it is a *mountain array*: strictly increasing from the start up to some peak, then strictly decreasing to the end, with at least one element on each side of the peak.

### Example

```
Input: arr = [2,1]
Output: false
```

## Approach

Walk up from the start while values strictly increase. If no steps were taken, or the walk reached the last index (no descent), it's invalid. Otherwise, continue walking down while values strictly decrease; the array is a valid mountain only if this walk also reaches the last index.

## C# Solution

```csharp
public class Solution
{
    public bool ValidMountainArray(int[] arr)
    {
        int n = arr.Length, i = 0;

        while (i + 1 < n && arr[i] < arr[i + 1]) i++;

        if (i == 0 || i == n - 1) return false;

        while (i + 1 < n && arr[i] > arr[i + 1]) i++;

        return i == n - 1;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
