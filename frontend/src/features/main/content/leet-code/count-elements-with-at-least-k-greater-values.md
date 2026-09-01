# 3759. Count Elements With at Least K Greater Values

**Difficulty:** Medium
**Category:** Array, Binary Search, Sorting

## Problem

Given an integer array `nums` and an integer `k`, an element is "qualified" if there exist at least `k` elements in the array strictly greater than it. Return the number of qualified elements.

### Example

Input: `nums = [3,1,2], k = 1`
Output: `2`

Elements `1` and `2` each have at least one element greater than them (`3`); `3` has none greater, so it does not qualify.

## Approach

Sort a copy of the array. For each original element, binary search for the first index strictly greater than it; the count of elements after that index is the number of greater elements. Count elements where that value is `>= k`.

## C# Solution

```csharp
public class Solution 
{
    public int CountQualified(int[] nums, int k) 
    {
        int n = nums.Length;
        int[] sorted = (int[])nums.Clone();
        Array.Sort(sorted);

        int result = 0;
        foreach (int v in nums)
        {
            int idx = UpperBound(sorted, v);
            int greaterCount = n - idx;
            if (greaterCount >= k) result++;
        }
        return result;
    }

    private int UpperBound(int[] sorted, int v)
    {
        int lo = 0, hi = sorted.Length;
        while (lo < hi)
        {
            int mid = (lo + hi) / 2;
            if (sorted[mid] <= v) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
