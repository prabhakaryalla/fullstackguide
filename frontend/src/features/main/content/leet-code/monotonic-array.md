# 896. Monotonic Array

**Difficulty:** Easy
**Category:** Array

## Problem

Given an integer array `nums`, return `true` if it is monotonic — either entirely non-increasing or entirely non-decreasing.

### Example

```
Input: nums = [1,2,2,3]
Output: true
```

## Approach

Track two flags, one assuming the array could still be non-decreasing and one assuming it could still be non-increasing. Scan through the array once: any strict increase disqualifies the non-increasing possibility, and any strict decrease disqualifies the non-decreasing possibility. The array is monotonic if at least one flag remains true after the scan.

## C# Solution

```csharp
public class Solution
{
    public bool IsMonotonic(int[] nums)
    {
        bool increasing = true, decreasing = true;

        for (int i = 1; i < nums.Length; i++)
        {
            if (nums[i] > nums[i - 1]) decreasing = false;
            if (nums[i] < nums[i - 1]) increasing = false;
        }

        return increasing || decreasing;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` extra.
