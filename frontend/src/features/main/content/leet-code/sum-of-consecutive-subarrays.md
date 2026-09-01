# 3284. Sum of Consecutive Subarrays

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Sliding Window

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given an integer array `nums`. A subarray is called **consecutive** if, reading it from left to right, each element is exactly one greater than the previous element (i.e. it forms a run of strictly increasing consecutive integers), and it has length at least `2`. Return the sum of the lengths of every consecutive subarray of `nums`.

### Example

```
Input: nums = [1,2,3,5,6]
Output: 9
Explanation: The consecutive subarrays (length >= 2) are [1,2], [2,3], [1,2,3], and [5,6], with lengths 2, 2, 3, and 2 — summing to 9.
```

## Approach
Scan the array once while tracking `runLen`, the length of the increasing-by-one run ending at the current index (reset to `1` whenever the run breaks). For a run of length `runLen` ending at the current index, the sum of the lengths of all of its suffixes with length from `1` to `runLen` is the triangular number `runLen * (runLen + 1) / 2`; subtracting `1` removes the trivial length-1 "suffix" and leaves exactly the sum of lengths of every valid (length >= 2) consecutive subarray ending at that index. Accumulate this contribution at every position.

## C# Solution

```csharp
public class Solution 
{
    public long SumOfConsecutiveSubarrays(int[] nums) 
    {
        long total = 0;
        long runLen = 1;

        for (int i = 0; i < nums.Length; i++) 
        {
            if (i > 0 && nums[i] == nums[i - 1] + 1) 
            {
                runLen++;
            } 
            else 
            {
                runLen = 1;
            }

            total += runLen * (runLen + 1) / 2 - 1;
        }

        return total;
    }
}
```

## Complexity

- **Time:** O(n), a single pass over `nums`.
- **Space:** O(1) additional space.
