# 189. Rotate Array

**Difficulty:** Medium
**Category:** Array, Math, Two Pointers

## Problem

Given an integer array `nums`, rotate the array to the right by `k` steps, in place.

### Example

```
nums = [1,2,3,4,5,6,7], k = 3 -> [5,6,7,1,2,3,4]
```

## Approach

The classic `O(1)`-extra-space trick: reverse the entire array, then reverse the first `k` elements, then reverse the remaining `n - k` elements. Three reversals reposition every element to its correct rotated location without any auxiliary array.

## C# Solution

```csharp
public class Solution
{
    public void Rotate(int[] nums, int k)
    {
        int n = nums.Length;
        k %= n;

        Reverse(nums, 0, n - 1);
        Reverse(nums, 0, k - 1);
        Reverse(nums, k, n - 1);
    }

    private void Reverse(int[] nums, int left, int right)
    {
        while (left < right)
        {
            (nums[left], nums[right]) = (nums[right], nums[left]);
            left++;
            right--;
        }
    }
}
```

## Complexity

- **Time:** `O(n)` — three linear reversal passes.
- **Space:** `O(1)` — in-place.
