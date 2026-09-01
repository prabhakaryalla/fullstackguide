# 3314. Construct the Minimum Bitwise Array I

**Difficulty:** Easy
**Category:** Array, Bit Manipulation

## Problem

You are given an array `nums` consisting of `n` prime integers.

Construct an array `ans` of length `n` such that for each index `i`, `ans[i] OR (ans[i] + 1) == nums[i]`, and each `ans[i]` is minimized. If no such value exists, set `ans[i] = -1`.

### Example

Input: `nums = [2,3,5,7]`

Output: `[-1,1,4,3]`

Explanation: No value works for 2, so it's -1. For 3, `1 OR 2 == 3`. For 5, `4 OR 5 == 5`. For 7, `3 OR 4 == 7`.

## Approach

Since `nums[i] <= 1000`, we can brute-force: for each `num`, try every `x` from `0` up to `num` and check whether `x | (x + 1) == num`. Return the first (smallest) `x` found, or `-1` if none works. Note `2` never has a solution since `x | (x + 1)` is always odd.

## C# Solution

```csharp
public class Solution 
{
    public int[] MinBitwiseArray(int[] nums) 
    {
        int n = nums.Length;
        int[] ans = new int[n];
        for (int i = 0; i < n; i++)
        {
            int num = nums[i];
            int result = -1;
            for (int x = 0; x <= num; x++)
            {
                if ((x | (x + 1)) == num) { result = x; break; }
            }
            ans[i] = result;
        }
        return ans;
    }
}
```

## Complexity

- **Time:** O(n * maxNum) where maxNum <= 1000.
- **Space:** O(n) for the output.
