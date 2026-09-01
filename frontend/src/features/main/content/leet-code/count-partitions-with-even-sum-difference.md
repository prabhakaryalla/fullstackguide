# 3432. Count Partitions with Even Sum Difference

**Difficulty:** Easy
**Category:** Array, Math

## Problem

You are given an integer array `nums` of length `n`. Split `nums` into two non-empty parts, a prefix `nums[0..i]` and a suffix `nums[i+1..n-1]`, for each `i` from `0` to `n-2`. Count the number of such partitions where `sum(prefix) - sum(suffix)` is **even**.

### Example

`nums = [1,2,3,4]` (total sum `10`, even)

All 3 partitions (`i=0,1,2`) yield an even difference: `1-9=-8`, `3-7=-4`, `6-4=2`. All are even, so the count is `3`.

## Approach

Let `total` be the sum of the whole array and `prefixSum` be the sum of `nums[0..i]`. The difference is `prefixSum - (total - prefixSum) = 2*prefixSum - total`. Since `2*prefixSum` is always even, the parity of the difference equals the parity of `-total`, which is the same as the parity of `total`.

So **every** partition has the same parity of difference, determined solely by whether `total` is even. If `total` is even, all `n-1` partitions qualify; otherwise none do.

## C# Solution

```csharp
public class Solution 
{
    public int CountPartitions(int[] nums) 
    {
        long total = 0;
        foreach (int num in nums) 
        {
            total += num;
        }
        return total % 2 == 0 ? nums.Length - 1 : 0;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
