# 2057. Smallest Index With Equal Value

**Difficulty:** Easy
**Category:** Array

## Problem

Given a 0-indexed integer array `nums`, return *the smallest index `i` such that `i % 10 == nums[i]`*, or `-1` if no such index exists.

## Approach

Scan the array from left to right and return the first index satisfying `i % 10 == nums[i]`. Since we scan in increasing order, the first match found is automatically the smallest.

## C# Solution

```csharp
public class Solution
{
    public int SmallestEqual(int[] nums)
    {
        for (int i = 0; i < nums.Length; i++)
            if (i % 10 == nums[i])
                return i;

        return -1;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
