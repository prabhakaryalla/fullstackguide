# 3467. Transform Array by Parity

**Difficulty:** Easy
**Category:** Array, Sorting

## Problem

You are given an integer array `nums`. Transform the array in two steps: first, replace every even number with `0` and every odd number with `1`; second, sort the resulting array in non-decreasing order. Return the transformed array.

### Example

`nums = [4,3,2,1]` → after replacing evens with `0` and odds with `1`, the array becomes `[0,1,0,1]`; sorting it non-decreasing gives `[0,0,1,1]`.

## Approach

Build a new array where each element is `0` if the corresponding input number is even and `1` if it's odd, then sort that array in ascending order.

## C# Solution

```csharp
public class Solution 
{
    public int[] TransformArray(int[] nums) 
    {
        int[] result = new int[nums.Length];

        for (int i = 0; i < nums.Length; i++)
            result[i] = nums[i] % 2 == 0 ? 0 : 1;

        Array.Sort(result);
        return result;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
