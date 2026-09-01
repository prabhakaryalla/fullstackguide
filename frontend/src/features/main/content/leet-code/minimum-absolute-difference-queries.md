# 1906. Minimum Absolute Difference Queries

**Difficulty:** Medium
**Category:** Array, Hash Table, Prefix Sum
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array `nums` of integers in the range `[1, 100]` and an array of queries `[l, r]`, for each query find the minimum absolute difference between any two distinct values present in `nums[l..r]`. If the subarray has fewer than two distinct values, the answer for that query is `-1`.

### Example

```
Input: nums = [1,3,4,8], queries = [[0,1],[1,2],[2,3]]
Output: [2,1,4]
Explanation: [1,3]->2, [3,4]->1, [4,8]->4.
```

### Constraints

- `2 <= nums.length <= 10^5`
- `1 <= nums[i] <= 100`
- `1 <= queries.length <= 2 * 10^4`
- `0 <= queries[i][0] < queries[i][1] <= nums.length - 1`

## Approach

Since values are bounded by 100, precompute a prefix count array `prefix[i][v]` giving how many times value `v` appears in `nums[0..i-1]`. For each query `[l, r]`, determine which values in `1..100` occur in the range by comparing `prefix[r+1][v] - prefix[l][v] > 0`, collect the sorted list of distinct present values, and take the minimum difference between consecutive ones.

## C# Solution

```csharp
public class Solution
{
    public int[] MinDifference(int[] nums, int[][] queries)
    {
        int n = nums.Length;
        int[][] prefix = new int[n + 1][];
        prefix[0] = new int[101];

        for (int i = 0; i < n; i++)
        {
            prefix[i + 1] = (int[])prefix[i].Clone();
            prefix[i + 1][nums[i]]++;
        }

        int[] answer = new int[queries.Length];
        for (int q = 0; q < queries.Length; q++)
        {
            int l = queries[q][0], r = queries[q][1];
            int prevValue = -1;
            int best = int.MaxValue;

            for (int v = 1; v <= 100; v++)
            {
                if (prefix[r + 1][v] - prefix[l][v] > 0)
                {
                    if (prevValue != -1)
                    {
                        best = Math.Min(best, v - prevValue);
                    }
                    prevValue = v;
                }
            }

            answer[q] = best == int.MaxValue ? -1 : best;
        }

        return answer;
    }
}
```

## Complexity

- **Time:** `O(n * 100 + q * 100)` — prefix table construction plus a constant 100-value scan per query.
- **Space:** `O(n * 100)` for the prefix count table.
