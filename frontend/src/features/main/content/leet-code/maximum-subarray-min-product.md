# 1856. Maximum Subarray Min-Product

**Difficulty:** Medium
**Category:** Array, Stack, Prefix Sum

## Problem

The min-product of an array is the minimum element multiplied by the sum of all its elements. Given an array `nums` of positive integers, return the maximum min-product of any non-empty contiguous subarray, modulo `1e9 + 7`.

### Example

```
Input: nums = [3,1,5,6,4,2]
Output: 60
```

## Approach

For every index `i`, the widest subarray in which `nums[i]` is the minimum element spans from just after the previous strictly-smaller element to just before the next strictly-smaller-or-equal element — found using a monotonic increasing stack in one left-to-right pass (previous smaller) and one right-to-left pass (next smaller-or-equal, handled symmetrically). Combined with prefix sums for O(1) range-sum queries, the min-product achievable with `nums[i]` as the minimum is `nums[i] * sum(range)`; the answer is the maximum of this value over all `i`.

## C# Solution

```csharp
public class Solution
{
    public int MaxSumMinProduct(int[] nums)
    {
        const int Mod = 1_000_000_007;
        int n = nums.Length;
        var prefix = new long[n + 1];
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];

        var left = new int[n];
        var right = new int[n];
        var stack = new Stack<int>();

        for (int i = 0; i < n; i++)
        {
            while (stack.Count > 0 && nums[stack.Peek()] >= nums[i]) stack.Pop();
            left[i] = stack.Count == 0 ? -1 : stack.Peek();
            stack.Push(i);
        }

        stack.Clear();

        for (int i = n - 1; i >= 0; i--)
        {
            while (stack.Count > 0 && nums[stack.Peek()] >= nums[i]) stack.Pop();
            right[i] = stack.Count == 0 ? n : stack.Peek();
            stack.Push(i);
        }

        long best = 0;
        for (int i = 0; i < n; i++)
        {
            long sum = prefix[right[i]] - prefix[left[i] + 1];
            best = Math.Max(best, sum * nums[i]);
        }

        return (int)(best % Mod);
    }
}
```

## Complexity

- **Time:** `O(n)` — each index is pushed/popped from the monotonic stack at most once.
- **Space:** `O(n)` for the prefix sums and stack bookkeeping.
