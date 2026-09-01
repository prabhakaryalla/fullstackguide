# 3357. Minimize the Maximum Adjacent Element Difference

**Difficulty:** Hard
**Category:** Array, Binary Search, Greedy

## Problem

Given an array `nums` where some elements are `-1` (missing/unknown), replace every `-1` with any positive integer so as to minimize the maximum absolute difference between adjacent elements.

### Example

Input: `nums = [1,2,-1,10,8]`
Output: `4` — replacing `-1` with 6 gives adjacent diffs `1,4,4,2`, max is 4.

## Approach

Binary search on the answer `d`. For a candidate `d`, greedily check feasibility: for each maximal run of `-1`s bounded by known values `a` (left) and `b` (right), the run is fillable with a monotone ramp iff `|a-b| <= d*(len+1)`; if only one side is known, need `d >= |value - x|` achievable by choosing `x` close to the bound (always feasible for one-sided since we can pick any value, so those are unconstrained except must be positive); consecutive known values must satisfy `|a-b| <= d`.

## C# Solution

```csharp
public class Solution 
{
    public int MinDifference(int[] nums) 
    {
        int n = nums.Length;
        int lo = 0, hi = 1_000_000_000, ans = 0;
        while (lo <= hi) 
        {
            int mid = lo + (hi - lo) / 2;
            if (Feasible(nums, mid)) 
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

    private bool Feasible(int[] nums, int d) 
    {
        int n = nums.Length;
        int i = 0;
        int prevVal = -1, prevIdx = -1;
        while (i < n) 
        {
            if (nums[i] != -1) 
            {
                if (prevIdx != -1 && prevIdx == i - 1 && Math.Abs(nums[i] - prevVal) > d)
                    return false;
                if (prevIdx != -1 && prevIdx != i - 1) 
                {
                    int gapLen = i - prevIdx - 1;
                    long allowed = (long)d * (gapLen + 1);
                    if (Math.Abs((long)nums[i] - prevVal) > allowed) return false;
                }
                prevVal = nums[i];
                prevIdx = i;
            }
            i++;
        }
        return true;
    }
}
```

## Complexity

- **Time:** O(n log(maxVal))
- **Space:** O(1)
