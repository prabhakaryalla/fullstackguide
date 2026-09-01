# 3350. Adjacent Increasing Subarrays Detection II

**Difficulty:** Medium
**Category:** Array, Binary Search, Sliding Window

## Problem

Given an integer array `nums`, find the maximum `k` such that there exist two adjacent strictly increasing subarrays each of length `k`.

### Example

Input: `nums = [2,5,7,8,9,2,3,4,3,1]`
Output: `3` — the longest such pair of adjacent increasing subarrays has length 3 each.

## Approach

Compute the increasing run length ending at each index. Binary search on the answer `k`: for a candidate `k`, check every possible split point in O(n) using the precomputed run lengths. Total complexity is O(n log n).

## C# Solution

```csharp
public class Solution 
{
    public int MaxIncreasingSubarrays(IList<int> nums) 
    {
        int n = nums.Count;
        int[] inc = new int[n];
        inc[0] = 1;
        for (int i = 1; i < n; i++)
            inc[i] = nums[i] > nums[i - 1] ? inc[i - 1] + 1 : 1;

        int lo = 1, hi = n / 2, ans = 0;
        while (lo <= hi) 
        {
            int mid = (lo + hi) / 2;
            if (Check(inc, n, mid)) 
            {
                ans = mid;
                lo = mid + 1;
            } 
            else 
            {
                hi = mid - 1;
            }
        }
        return ans;
    }

    private bool Check(int[] inc, int n, int k) 
    {
        for (int i = k - 1; i + k < n; i++)
            if (inc[i] >= k && inc[i + k] >= k)
                return true;
        return false;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
