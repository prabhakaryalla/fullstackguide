# 2563. Count the Number of Fair Pairs

**Difficulty:** Medium
**Category:** Array, Two Pointers, Binary Search, Sorting

## Problem

Given a 0-indexed integer array `nums` of size `n` and two integers `lower` and `upper`, return the number of fair pairs.

A pair `(i, j)` is fair if:
- `0 <= i < j < n`, and
- `lower <= nums[i] + nums[j] <= upper`

### Example

```
Input: nums = [0,1,7,4,4,5], lower = 3, upper = 6
Output: 6
Explanation: Fair pairs are (0,3), (0,4), (0,5), (1,3), (1,4), (1,5)

Input: nums = [1,7,9,2,5], lower = 11, upper = 11
Output: 1
Explanation: Only fair pair is (2,3) where 9+2=11
```

## Approach

Sort the array first (this doesn't affect the count since we only care about values, not original indices).

For each element `nums[i]`, use binary search to find:
- The leftmost index `j` where `nums[i] + nums[j] >= lower`
- The rightmost index `k` where `nums[i] + nums[j] <= upper`

The count of valid pairs with `nums[i]` is `k - j + 1` (excluding pairs where `j <= i`).

Alternatively, use two pointers after sorting for an O(n log n) solution.

## C# Solution

```csharp
public class Solution
{
    public long CountFairPairs(int[] nums, int lower, int upper)
    {
        Array.Sort(nums);
        long count = 0;
        int n = nums.Length;
        
        for (int i = 0; i < n - 1; i++)
        {
            int left = LowerBound(nums, i + 1, n, lower - nums[i]);
            int right = UpperBound(nums, i + 1, n, upper - nums[i]);
            count += right - left;
        }
        
        return count;
    }
    
    private int LowerBound(int[] nums, int start, int end, int target)
    {
        while (start < end)
        {
            int mid = start + (end - start) / 2;
            if (nums[mid] < target)
                start = mid + 1;
            else
                end = mid;
        }
        return start;
    }
    
    private int UpperBound(int[] nums, int start, int end, int target)
    {
        while (start < end)
        {
            int mid = start + (end - start) / 2;
            if (nums[mid] <= target)
                start = mid + 1;
            else
                end = mid;
        }
        return start;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting, then O(n log n) for binary searches
- **Space:** O(1) excluding sort space
