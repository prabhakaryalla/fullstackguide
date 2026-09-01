# 2527. Find Xor-Beauty of Array

**Difficulty:** Medium
**Category:** Array, Math, Bit Manipulation

## Problem

You are given an integer array `nums`. The xor-beauty of the array is defined as:
```
Sum of ((nums[i] | nums[j]) & nums[k]) for all 0 <= i, j, k < nums.length
```

Return the xor-beauty of `nums`.

### Example

```
Input: nums = [1,4]
Output: 5
Explanation: Calculate (1|1)&1 XOR (1|1)&4 XOR (1|4)&1 XOR (1|4)&4 XOR (4|1)&1 XOR (4|1)&4 XOR (4|4)&1 XOR (4|4)&4
= 1 XOR 0 XOR 1 XOR 4 XOR 1 XOR 4 XOR 0 XOR 4 = 5
```

## Approach

Use mathematical properties of XOR and bit operations. The key insight: for each bit position, count how many times each configuration appears across all triplets. Due to XOR properties, many terms cancel out. The result simplifies to XOR of all elements in the array.

## C# Solution

```csharp
public class Solution
{
    public int XorBeauty(int[] nums)
    {
        int result = 0;
        foreach (int num in nums)
        {
            result ^= num;
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of nums
- **Space:** O(1)
