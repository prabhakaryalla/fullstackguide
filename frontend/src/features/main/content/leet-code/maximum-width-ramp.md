# 962. Maximum Width Ramp

**Difficulty:** Medium
**Category:** Array, Stack, Monotonic Stack

## Problem

Given an integer array `nums`, a *ramp* is a pair of indices `i < j` with `nums[i] <= nums[j]`. Return the maximum width `j - i` of any ramp, or `0` if none exists.

### Example

```
Input: nums = [6,0,8,2,1,5]
Output: 4
```

## Approach

Build a monotonically decreasing stack of candidate left-endpoints (an index is only useful as a left endpoint if no earlier index has a smaller-or-equal value). Then scan from the right; while the stack's top index has a value `<= nums[j]`, it forms a ramp of width `j - index`, so pop it and update the maximum width, since any later (smaller) `j` can't produce a wider ramp with that same index.

## C# Solution

```csharp
public class Solution
{
    public int MaxWidthRamp(int[] nums)
    {
        var stack = new Stack<int>();
        int n = nums.Length;

        for (int i = 0; i < n; i++)
        {
            if (stack.Count == 0 || nums[stack.Peek()] > nums[i]) stack.Push(i);
        }

        int maxWidth = 0;

        for (int j = n - 1; j >= 0; j--)
        {
            while (stack.Count > 0 && nums[stack.Peek()] <= nums[j])
            {
                maxWidth = Math.Max(maxWidth, j - stack.Pop());
            }
        }

        return maxWidth;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the stack.
