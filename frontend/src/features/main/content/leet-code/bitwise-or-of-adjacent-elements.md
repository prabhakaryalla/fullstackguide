# 3173. Bitwise OR of Adjacent Elements

**Difficulty:** Easy
**Category:** Array, Bit Manipulation

## Problem
Given an integer array `nums` of length `n`, construct and return a new array of length `n - 1` where the element at index `i` is the bitwise OR of `nums[i]` and `nums[i + 1]`.

## Approach
Iterate through the array from index 1 to the end, computing the bitwise OR of the current element with the previous one, and appending each result to the output array.

## C# Solution
```csharp
public class Solution {
    public int[] OrArray(int[] nums) {
        int[] ans = new int[nums.Length - 1];
        for (int i = 1; i < nums.Length; i++)
            ans[i - 1] = nums[i - 1] | nums[i];
        return ans;
    }
}
```

## Complexity
- Time: O(n)
- Space: O(n) for the output array
