# 747. Largest Number At Least Twice of Others

**Difficulty:** Easy
**Category:** Array

## Problem

Given an integer array `nums` where the largest element is unique, return the index of the largest element if it is at least twice as large as every other element; otherwise return `-1`.

### Example

```
Input: nums = [1,2,3,4]
Output: -1
```

## Approach

Find the index of the maximum value with a single pass. Then verify it against every other element: the condition holds only if the maximum is at least double every other value.

## C# Solution

```csharp
public class Solution
{
    public int DominantIndex(int[] nums)
    {
        int maxIndex = 0;

        for (int i = 1; i < nums.Length; i++)
        {
            if (nums[i] > nums[maxIndex])
                maxIndex = i;
        }

        for (int i = 0; i < nums.Length; i++)
        {
            if (i != maxIndex && nums[maxIndex] < 2 * nums[i])
                return -1;
        }

        return maxIndex;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
