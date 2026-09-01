# 1589. Maximum Sum Obtained of Any Permutation

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting, Prefix Sum

## Problem

Given an array `nums` and a list of `requests`, where each request `[start, end]` asks for the sum of `nums[start..end]`, you may rearrange `nums` in any order before evaluating all requests. Return the maximum possible total sum across all requests, modulo `10^9 + 7`.

### Example

```
Input: nums = [1,2,3,4,5], requests = [[1,3],[0,1]]
Output: 19
```

## Approach

Use a difference array to count how many requests cover each index: increment at `start` and decrement just after `end`, then take a running prefix sum to get each index's coverage "weight" (how many requests include it). Sort these weights and sort `nums` — both ascending — then pair the largest weights with the largest values to maximize the total contribution (the classic rearrangement inequality).

## C# Solution

```csharp
public class Solution
{
    public int MaxSumRangeQuery(int[] nums, int[][] requests)
    {
        const int Mod = 1_000_000_007;
        int n = nums.Length;
        int[] diff = new int[n + 1];

        foreach (int[] request in requests)
        {
            diff[request[0]]++;
            diff[request[1] + 1]--;
        }

        int[] weight = new int[n];
        int running = 0;
        for (int i = 0; i < n; i++)
        {
            running += diff[i];
            weight[i] = running;
        }

        Array.Sort(weight);
        Array.Sort(nums);

        long total = 0;
        for (int i = 0; i < n; i++)
        {
            total = (total + (long)weight[i] * nums[i]) % Mod;
        }

        return (int)total;
    }
}
```

## Complexity

- **Time:** `O(n log n + r)` — sorting dominates, plus a linear pass to build the difference array from `r` requests.
- **Space:** `O(n)` for the difference and weight arrays.
