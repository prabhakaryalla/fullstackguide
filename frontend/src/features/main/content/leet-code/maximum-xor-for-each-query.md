# 1829. Maximum XOR for Each Query

**Difficulty:** Medium
**Category:** Array, Bit Manipulation, Prefix Sum

## Problem

Given a sorted array `nums` of non-negative integers each less than `2^maximumBit`, for each query `i` (processed from `nums.Length` down to `1`) find the non-negative integer `k < 2^maximumBit` that maximizes the XOR of `k` with the XOR of the first `nums.Length - i` (i.e., all but the last `i`) elements of `nums`, then conceptually remove the last element of `nums`. Return the array of these maximal `k` values in the order the queries are answered.

### Example

```
Input: nums = [0,1,1,3], maximumBit = 2
Output: [0,3,2,3]
```

## Approach

Since all `maximumBit` bits should ideally be set to maximize the XOR, the best possible achievable value for a given prefix XOR `p` is `mask = (1 << maximumBit) - 1`; solving `p XOR k = mask` gives `k = p XOR mask`. Precompute the XOR of the entire array, then process from the last element backward: at each step, the current running XOR represents the prefix XOR that remains after removing elements from the end, so record `k = runningXor XOR mask`, then XOR out the next element to be removed (from the end) to prepare the running value for the next query.

## C# Solution

```csharp
public class Solution
{
    public int[] GetMaximumXor(int[] nums, int maximumBit)
    {
        int mask = (1 << maximumBit) - 1;
        int prefixXor = 0;
        foreach (int n in nums) prefixXor ^= n;

        var result = new int[nums.Length];

        for (int i = 0; i < nums.Length; i++)
        {
            result[i] = prefixXor ^ mask;
            prefixXor ^= nums[nums.Length - 1 - i];
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the output array.
