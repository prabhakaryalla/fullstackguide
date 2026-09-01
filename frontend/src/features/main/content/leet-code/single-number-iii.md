# 260. Single Number III

**Difficulty:** Medium
**Category:** Array, Bit Manipulation

## Problem

Given an integer array `nums` in which exactly two elements appear only once and all other elements appear exactly twice, find the two elements that appear only once, in any order.

### Example

```
Input: nums = [1,2,1,3,2,5]
Output: [3,5]
```

### Constraints

- `2 <= nums.length <= 3 * 10^4`
- Exactly two elements appear once; the rest appear exactly twice.

## Approach

XOR all numbers together — pairs cancel out, leaving `xorAll = a ^ b` where `a` and `b` are the two unique numbers. Find any set bit in `xorAll` (e.g. the lowest set bit); this bit must differ between `a` and `b`, so it can be used to partition all numbers into two groups. XOR-ing each group independently isolates `a` in one group and `b` in the other.

## C# Solution

```csharp
public class Solution
{
    public int[] SingleNumber(int[] nums)
    {
        int xorAll = 0;
        foreach (var n in nums) xorAll ^= n;

        int diffBit = xorAll & (-xorAll);

        int a = 0, b = 0;
        foreach (var n in nums)
        {
            if ((n & diffBit) != 0) a ^= n;
            else b ^= n;
        }

        return new[] { a, b };
    }
}
```

## Complexity

- **Time:** `O(n)` — two linear passes.
- **Space:** `O(1)`.
