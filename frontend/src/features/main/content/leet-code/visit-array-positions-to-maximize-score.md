# 2786. Visit Array Positions to Maximize Score

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Hash Table

## Problem

You are given a 0-indexed integer array `nums` and a positive integer `x`. You start at index 0 with a score equal to `nums[0]`. You may repeatedly move to any later index `j` from your current index `i` (`j > i`), adding `nums[j]` to your score. However, if the parity (odd/even) of `nums[i]` differs from the parity of `nums[j]`, you lose `x` points for that move. Return the maximum score achievable.

### Example

Input: nums = [2,3,6,1,9,2], x = 5
Output: 13
Explanation: One optimal path visits indices 0,2,3,4 (or similar) to accumulate a score of 13 after parity penalties.

## Approach

Track two running best scores: the best total score of a valid path ending on an even value (`even`) and ending on an odd value (`odd`). When processing `nums[i]`, if it's even, the best way to extend to it is from the best of `even` (no penalty) or `odd - x` (crossing parity costs `x`), then add `nums[i]`. The symmetric update applies when `nums[i]` is odd. The answer is the maximum of the two running values after processing the whole array.

## C# Solution

```csharp
public class Solution 
{
    public long MaxScore(int[] nums, int x) 
    {
        long even = long.MinValue, odd = long.MinValue;
        if (nums[0] % 2 == 0) even = nums[0]; else odd = nums[0];

        for (int i = 1; i < nums.Length; i++) 
        {
            if (nums[i] % 2 == 0) 
            {
                even = Math.Max(even, odd - x) + nums[i];
            } 
            else 
            {
                odd = Math.Max(odd, even - x) + nums[i];
            }
        }

        return Math.Max(even, odd);
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
