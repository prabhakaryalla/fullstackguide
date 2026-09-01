# 3315. Construct the Minimum Bitwise Array II

**Difficulty:** Medium
**Category:** Array, Bit Manipulation

## Problem

You are given an array `nums` consisting of `n` prime integers, with `nums[i]` up to `10^9`.

Construct an array `ans` of length `n` such that for each index `i`, `ans[i] OR (ans[i] + 1) == nums[i]`, and each `ans[i]` is minimized. If no such value exists, set `ans[i] = -1`.

### Example

Input: `nums = [2,3,5,7]`

Output: `[-1,1,4,3]`

## Approach

Brute force is too slow for `nums[i]` up to `10^9`, so we use a bit trick.

For any `x`, `x | (x + 1)` sets bit `p` (the position of the lowest 0-bit of `x`) to 1, while all bits below `p` (which were already 1 in `x`) remain 1, and all bits above `p` are unchanged from `x`. Therefore `num` must have a run of consecutive 1-bits starting from bit 0 through some bit `p`, and `x` equals `num` with bit `p` cleared.

To minimize `x`, choose the **largest** valid `p`, i.e., clear the highest bit within that trailing run of 1s. Concretely: let `z` be the position of the lowest 0-bit of `num` (equivalently, the number of trailing 1-bits). If `z == 0` (this only happens for `num == 2`), no answer exists. Otherwise `ans = num` with bit `z - 1` cleared.

## C# Solution

```csharp
public class Solution 
{
    public long[] MinBitwiseArray(IList<int> nums) 
    {
        int n = nums.Count;
        long[] ans = new long[n];
        for (int i = 0; i < n; i++)
        {
            long num = nums[i];
            int z = 0;
            while (((num >> z) & 1) == 1) z++;

            if (z == 0)
            {
                ans[i] = -1;
                continue;
            }
            ans[i] = num & ~(1L << (z - 1));
        }
        return ans;
    }
}
```

## Complexity

- **Time:** O(n * bits) where bits is at most ~30 for values up to 10^9.
- **Space:** O(n) for the output.
