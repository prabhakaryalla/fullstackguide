# 3356. Zero Array Transformation II

**Difficulty:** Medium
**Category:** Array, Binary Search, Difference Array

## Problem

Given `nums` and `queries`, where each query `[l, r, val]` decrements every element in `nums[l..r]` by at most `val`, find the minimum number of queries (a prefix of the `queries` array) needed so all elements of `nums` can become zero. Return `-1` if impossible even using all queries.

### Example

Input: `nums = [2,0,2]`, `queries = [[0,2,1],[0,2,1],[1,1,3]]`
Output: `2` — using the first two queries reduces every index by 2, zeroing `nums`.

## Approach

Binary search on the number of queries `m` to use. For a candidate `m`, use a difference array over the first `m` queries to compute the maximum total decrement available at each index, and check `decrement[i] >= nums[i]` for all `i`. The feasibility is monotonic in `m`, enabling binary search.

## C# Solution

```csharp
public class Solution 
{
    public int MinZeroArray(int[] nums, int[][] queries) 
    {
        int n = nums.Length;
        if (IsFeasible(nums, queries, 0)) return 0;

        int lo = 1, hi = queries.Length, ans = -1;
        while (lo <= hi) 
        {
            int mid = (lo + hi) / 2;
            if (IsFeasible(nums, queries, mid)) 
            {
                ans = mid;
                hi = mid - 1;
            } 
            else 
            {
                lo = mid + 1;
            }
        }
        return ans;
    }

    private bool IsFeasible(int[] nums, int[][] queries, int m) 
    {
        int n = nums.Length;
        int[] diff = new int[n + 1];
        for (int i = 0; i < m; i++) 
        {
            int l = queries[i][0], r = queries[i][1], val = queries[i][2];
            diff[l] += val;
            diff[r + 1] -= val;
        }

        int running = 0;
        for (int i = 0; i < n; i++) 
        {
            running += diff[i];
            if (running < nums[i]) return false;
        }
        return true;
    }
}
```

## Complexity

- **Time:** O((n + q) log q)
- **Space:** O(n)
