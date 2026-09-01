# 2789. Largest Element in an Array after Merge Operations

**Difficulty:** Medium
**Category:** Array, Greedy

## Problem

You are given a 0-indexed array `nums` of positive integers. You may repeatedly perform the following operation: choose an index `i` such that `nums[i] <= nums[i+1]`, then replace `nums[i+1]` with `nums[i] + nums[i+1]` and remove `nums[i]` from the array. Return the maximum possible value of any element in the final array after performing any number of operations.

### Example

Input: nums = [2,3,7,9,3]
Output: 21
Explanation: Merging from the right: 9 absorbs nothing (9 > block starting at index 4, which is 3), 7 merges into 9 to form 16, 3 merges into 16 to form 19, and finally 2 merges into 19 to form 21.

## Approach

Process the array from right to left, maintaining the current "block" value (the accumulated sum of the contiguous suffix merged so far). For index `i`, if `nums[i] <= block`, it can merge into the block (`block += nums[i]`); otherwise it starts a brand-new block (`block = nums[i]`). Track the maximum block value seen throughout the scan — that is the answer.

## C# Solution

```csharp
public class Solution 
{
    public long MaxArrayValue(int[] nums) 
    {
        int n = nums.Length;
        long block = nums[n - 1];
        long max = block;

        for (int i = n - 2; i >= 0; i--) 
        {
            if (nums[i] <= block) 
            {
                block += nums[i];
            } 
            else 
            {
                block = nums[i];
            }
            max = Math.Max(max, block);
        }

        return max;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
