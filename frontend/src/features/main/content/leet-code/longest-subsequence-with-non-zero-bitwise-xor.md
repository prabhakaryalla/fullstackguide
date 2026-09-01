# 3702. Longest Subsequence With Non-Zero Bitwise XOR

**Difficulty:** Medium
**Category:** Array, Bit Manipulation, Greedy

## Problem

Given an integer array `nums`, return the length of the longest subsequence whose elements XOR to a non-zero value.

### Example

Input: `nums = [1,2,3]`
Output: `3`
Explanation: `1 ^ 2 ^ 3 = 0`, but removing one non-zero element such as `3` leaves `1 ^ 2 = 3 != 0`, so the longest valid subsequence has length `2`... Actually here the full array already XORs to `0`, so the answer is `n - 1 = 2` since a non-zero element exists to drop.

## Approach

If the XOR of the entire array is non-zero, the whole array works, so the answer is `n`. Otherwise, if the array contains at least one non-zero element, removing it flips the total XOR to non-zero, giving `n - 1`. If every element is `0`, no subsequence can have a non-zero XOR, so the answer is `0`.

## C# Solution

```csharp
public class Solution 
{
    public int LongestSubsequence(int[] nums) 
    {
        int totalXor = 0;
        bool hasNonZero = false;
        foreach (int num in nums) 
        {
            totalXor ^= num;
            if (num != 0) hasNonZero = true;
        }
        if (totalXor != 0) return nums.Length;
        return hasNonZero ? nums.Length - 1 : 0;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
