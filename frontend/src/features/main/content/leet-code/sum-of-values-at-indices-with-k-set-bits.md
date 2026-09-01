# 2859. Sum of Values at Indices With K Set Bits

**Difficulty:** Easy
**Category:** Array, Bit Manipulation

## Problem

You are given a 0-indexed integer array `nums` and an integer `k`. Return the sum of elements in `nums` whose corresponding index has exactly `k` set bits in its binary representation.

### Example

```
Input: nums = [5,10,1,5,2], k = 1
Output: 13
Explanation:
Indices with exactly 1 set bit:
- Index 1 (binary: 1): nums[1] = 10
- Index 2 (binary: 10): nums[2] = 1
- Index 4 (binary: 100): nums[4] = 2
Sum = 10 + 1 + 2 = 13
```

## Approach

Iterate through all indices of the array. For each index, count the number of set bits (1s) in its binary representation. If the count equals `k`, add the corresponding element to the result sum.

Use `BitOperations.PopCount` for efficient bit counting, or manually count by repeatedly checking the least significant bit.

## C# Solution

```csharp
public class Solution
{
    public int SumIndicesWithKSetBits(int[] nums, int k)
    {
        int sum = 0;
        
        for (int i = 0; i < nums.Length; i++)
        {
            if (System.Numerics.BitOperations.PopCount((uint)i) == k)
            {
                sum += nums[i];
            }
        }
        
        return sum;
    }
}
```

## Complexity

- **Time:** `O(n)` — iterate through all indices.
- **Space:** `O(1)`.
