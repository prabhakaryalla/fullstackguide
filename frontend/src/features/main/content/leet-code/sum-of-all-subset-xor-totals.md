# 1863. Sum of All Subset XOR Totals

**Difficulty:** Easy
**Category:** Array, Bit Manipulation, Backtracking, Math

## Problem

The XOR total of an array is the bitwise XOR of all its elements (or `0` if empty). Given an array `nums`, return the sum of the XOR totals of every possible subset.

### Example

```
Input: nums = [1,3]
Output: 6
Explanation: Subsets [] , [1], [3], [1,3] have XOR totals 0, 1, 3, 2 -> sum = 6.
```

## Approach

For any bit that appears in the bitwise OR of all elements, exactly half of all `2^n` subsets will have that bit set in their XOR total (by a symmetry/pairing argument over which elements contributing that bit are included), so its contribution to the total sum is `bitValue * 2^(n-1)`. Summing over all bits, the total equals `(OR of all elements) * 2^(n-1)`, computed directly with a bit shift.

## C# Solution

```csharp
public class Solution
{
    public int SubsetXORSum(int[] nums)
    {
        int orAll = 0;
        foreach (int n in nums) orAll |= n;
        return orAll << (nums.Length - 1);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
