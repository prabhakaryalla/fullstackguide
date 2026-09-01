# 3344. Maximum Sized Array

**Difficulty:** Easy
**Category:** Math, Binary Search
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given an integer `target`, return the maximum possible length of an array of **distinct** positive integers whose sum is at most `target`.

### Example

Input: `target = 6`

Output: `3`

Explanation: The array `[1,2,3]` has sum 6 and length 3, which is the largest achievable.

## Approach
To maximize the count of distinct positive integers within a fixed sum budget, greedily use the smallest possible values `1, 2, 3, ...` — using any larger value in place of a smaller one only wastes budget. The largest `m` such that `1 + 2 + ... + m = m(m+1)/2 <= target` is therefore the answer. Binary search on `m` finds this value directly.

## C# Solution

```csharp
public class Solution 
{
    public int MaxSizedArray(int target) 
    {
        int lo = 0, hi = 200000;
        while (lo < hi) 
        {
            int mid = lo + (hi - lo + 1) / 2;
            if ((long)mid * (mid + 1) / 2 <= target) lo = mid;
            else hi = mid - 1;
        }
        return lo;
    }
}
```

## Complexity

- **Time:** O(log target)
- **Space:** O(1)
