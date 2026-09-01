# 3309. Maximum Possible Number by Binary Concatenation

**Difficulty:** Medium
**Category:** Array, Math, Enumeration, Bit Manipulation

## Problem

You are given an array `nums` containing exactly 3 positive integers.

Return the maximum possible number whose binary representation can be formed by concatenating the binary representations of all elements in `nums` in some order.

Note: The binary representation of any number does not contain leading zeros.

### Example

Input: `nums = [1,2,3]`

Output: `30`

Explanation: Concatenating the binary of 3 ("11"), 1 ("1"), and 2 ("10") gives `"11110"`, which is `30` in decimal — the maximum among all orderings.

## Approach

Since there are only 3 numbers, there are only `3! = 6` possible orderings. For each permutation, concatenate the binary string representations (via `Convert.ToString(num, 2)`, which never has leading zeros) and parse the resulting binary string back to an integer. Track the maximum value across all 6 permutations.

## C# Solution

```csharp
public class Solution 
{
    public int MaxGoodNumber(int[] nums) 
    {
        int[][] perms = 
        {
            new[] { 0, 1, 2 }, new[] { 0, 2, 1 }, new[] { 1, 0, 2 },
            new[] { 1, 2, 0 }, new[] { 2, 0, 1 }, new[] { 2, 1, 0 }
        };

        int best = 0;
        foreach (var p in perms)
        {
            string bin = Convert.ToString(nums[p[0]], 2)
                       + Convert.ToString(nums[p[1]], 2)
                       + Convert.ToString(nums[p[2]], 2);
            int val = Convert.ToInt32(bin, 2);
            if (val > best) best = val;
        }
        return best;
    }
}
```

## Complexity

- **Time:** O(1) — a fixed 6 permutations, each doing O(1) work since values are bounded.
- **Space:** O(1).
