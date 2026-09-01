# 3762. Minimum Operations to Equalize Subarrays

**Difficulty:** Hard
**Category:** Array, Math, Binary Search, Segment Tree, Sorting

## Problem

Given an integer array `nums` and integer `k`, one operation increases or decreases any element by exactly `k`. Given queries `[li, ri]`, for each query find the minimum number of operations to make all elements of `nums[li..ri]` equal, or `-1` if impossible.

### Example

Input: `nums = [1,4,7], k = 3, queries = [[0,1],[0,2]]`
Output: `[1,2]`

## Approach

All elements in a range can only be made equal if they share the same remainder modulo `k` (since operations preserve `nums[i] % k`). If so, the values `nums[i] / k` must all be transformed to their median, minimizing the total number of `±1` steps (sum of absolute deviations from the median). This reference implementation evaluates each query directly (sorting the range to find the median); a persistent segment tree keyed by remainder class would be needed to meet the tightest time limits on very large inputs.

## C# Solution

```csharp
public class Solution 
{
    public long[] MinOperations(int[] nums, int k, int[][] queries) 
    {
        var ans = new long[queries.Length];
        for (int q = 0; q < queries.Length; q++)
        {
            int l = queries[q][0], r = queries[q][1];
            int rem = nums[l] % k;
            bool ok = true;
            var quotients = new List<long>();
            for (int i = l; i <= r; i++)
            {
                if (nums[i] % k != rem) { ok = false; break; }
                quotients.Add(nums[i] / k);
            }
            if (!ok) { ans[q] = -1; continue; }
            quotients.Sort();
            long median = quotients[quotients.Count / 2];
            long cost = 0;
            foreach (long v in quotients) cost += Math.Abs(v - median);
            ans[q] = cost;
        }
        return ans;
    }
}
```

## Complexity

- **Time:** O(q * n log n) for this direct approach
- **Space:** O(n) per query
