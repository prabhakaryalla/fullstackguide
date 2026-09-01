# 3729. Count Distinct Subarrays Divisible By K In Sorted Array

**Difficulty:** Medium
**Category:** Array, Hashing, Sorting

## Problem
You are given a non-decreasing sorted integer array `nums` and an integer `k`. Return the number of **distinct** subarrays (subarrays counted only once even if the same sequence of values appears at multiple positions) whose sum is divisible by `k`.

## Approach
For every pair of start and end indices, maintain a running sum and a running polynomial rolling hash of the subarray's values. Because `nums` is sorted, two subarrays that occupy different positions but contain the exact same sequence of values will produce the same rolling hash, allowing duplicates to be detected with a hash set.

Whenever the running sum is divisible by `k`, attempt to insert the current rolling hash into a set; if it wasn't already present, count this subarray.

## C# Solution

```csharp
public class Solution
{
    public int CountDistinctSubarrays(int[] nums, int k)
    {
        int n = nums.Length;
        const long BASE = 131;
        const long MOD_HASH = 1_000_000_007L;

        var seen = new HashSet<long>();
        int count = 0;

        for (int i = 0; i < n; i++)
        {
            long sum = 0;
            long hash = 0;
            for (int j = i; j < n; j++)
            {
                sum += nums[j];
                hash = (hash * BASE + nums[j] + 1) % MOD_HASH;

                if (sum % k == 0 && seen.Add(hash))
                {
                    count++;
                }
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** O(n^2)
- **Space:** O(n^2) worst case for the hash set
