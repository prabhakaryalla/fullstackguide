# 3727. Maximum Alternating Sum of Squares

**Difficulty:** Medium
**Category:** Dynamic Programming, Array

## Problem

Given an integer array `nums`, choose a non-empty subsequence `nums[i1], nums[i2], ..., nums[im]` (indices strictly increasing) and compute `nums[i1]^2 - nums[i2]^2 + nums[i3]^2 - ...` (signs alternate, starting with `+`). Return the maximum possible value of this alternating sum.

### Example

nums = [1,5,3] → picking all three gives 1 - 25 + 9 = -15, but picking just [5] gives 25, which is best.

## Approach

Maintain two running best values while scanning left to right: `even` — the best alternating sum so far ending with an even number of picks (next pick uses `+`), and `odd` — the best sum ending with an odd number of picks (next pick uses `-`). For each value `x = nums[i]^2`, update `even = max(even, odd + x)` and `odd = max(odd, even - x)` using the pre-update values. The answer is the maximum of `even` and `odd` at the end.

## C# Solution

```csharp
public class Solution 
{
    public long MaxAlternatingSumOfSquares(int[] nums) 
    {
        long even = 0, odd = long.MinValue / 2;
        foreach (int num in nums) 
        {
            long x = (long)num * num;
            long newEven = Math.Max(even, odd + x);
            long newOdd = Math.Max(odd, even - x);
            even = newEven;
            odd = newOdd;
        }
        return Math.Max(even, odd);
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
