# 2680. Maximum OR

**Difficulty:** Medium
**Category:** Array, Greedy, Bit Manipulation, Prefix Sum

## Problem

You are given a 0-indexed integer array `nums` of length `n` and an integer `k`. In an operation, you can choose an element and multiply it by `2`.

You can perform at most `k` operations. Return the maximum possible value of `nums[0] | nums[1] | ... | nums[n - 1]` after performing the operations.

Note: `a | b` denotes the bitwise OR operation.

### Example

```
Input: nums = [12,9], k = 1
Output: 30
Explanation: Multiply 12 by 2 to get [24,9], then 24 | 9 = 30.

Input: nums = [8,1,2], k = 2
Output: 35
Explanation: Multiply 8 by 2 twice to get [32,1,2], then 32 | 1 | 2 = 35.
```

## Approach

To maximize the OR result, concentrate all `k` multiplications on a single element. This creates the largest possible value at one position. Try multiplying each element by `2^k` and compute the OR with all other original elements. Return the maximum.

Use prefix and suffix OR arrays to efficiently compute the OR of all elements except one.

## C# Solution

```csharp
public class Solution
{
    public long MaximumOr(int[] nums, int k)
    {
        int n = nums.Length;
        long[] prefix = new long[n];
        long[] suffix = new long[n];
        
        prefix[0] = 0;
        for (int i = 1; i < n; i++)
        {
            prefix[i] = prefix[i - 1] | nums[i - 1];
        }
        
        suffix[n - 1] = 0;
        for (int i = n - 2; i >= 0; i--)
        {
            suffix[i] = suffix[i + 1] | nums[i + 1];
        }
        
        long maxOr = 0;
        long multiplier = 1L << k;
        
        for (int i = 0; i < n; i++)
        {
            long currentOr = prefix[i] | ((long)nums[i] * multiplier) | suffix[i];
            maxOr = Math.Max(maxOr, currentOr);
        }
        
        return maxOr;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n) for prefix and suffix arrays
