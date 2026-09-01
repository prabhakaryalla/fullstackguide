# 891. Sum of Subsequence Widths

**Difficulty:** Hard
**Category:** Array, Math, Sorting

## Problem

The width of a subsequence is the difference between its maximum and minimum elements. Given an array `nums`, return the sum of widths over every non-empty subsequence, modulo `10^9 + 7`.

### Example

```
Input: nums = [2,1,3]
Output: 6
```

## Approach

Sort the array. For the element at sorted index `i`, it acts as the maximum of a subsequence for every possible subset of the `i` smaller elements chosen alongside it, contributing `2^i` such subsequences; symmetrically, it acts as the minimum for `2^(n-1-i)` subsequences (choosing any subset of the larger elements). Since total width sums to (sum of maximums) minus (sum of minimums) over all subsequences, each element's net contribution is `nums[i] * (2^i - 2^(n-1-i))`. Precompute powers of 2 modulo the required modulus and sum these contributions.

## C# Solution

```csharp
public class Solution
{
    public int SumSubseqWidths(int[] nums)
    {
        const int MOD = 1_000_000_007;
        Array.Sort(nums);
        int n = nums.Length;

        var pow2 = new long[n];
        pow2[0] = 1;
        for (int i = 1; i < n; i++)
            pow2[i] = pow2[i - 1] * 2 % MOD;

        long total = 0;

        for (int i = 0; i < n; i++)
        {
            long contribution = (pow2[i] - pow2[n - 1 - i] + MOD) % MOD;
            total = (total + contribution * nums[i]) % MOD;
        }

        return (int)total;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the powers-of-2 array.
