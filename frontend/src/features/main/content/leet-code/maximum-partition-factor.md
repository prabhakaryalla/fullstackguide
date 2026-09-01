# 3710. Maximum Partition Factor

**Difficulty:** Hard
**Category:** Sorting, Greedy, Binary Search

## Problem

Given an even-length integer array `nums`, split its elements into two groups of equal size so that the minimum absolute difference between any two elements placed in the same group is as large as possible. Return this maximum possible minimum difference.

### Example

nums = [1,3,5,9] → sort to [1,3,5,9]; assign alternating groups {1,5} and {3,9}; the smallest same-group gap is 4, which is optimal.

## Approach

Sort the array. Assigning groups by alternating the sorted index (even sorted positions to group A, odd to group B) always produces two equal-size groups, and the smallest same-group gap after this assignment is `min(sorted[i+2] - sorted[i])` over all valid `i`, because any two elements placed in the same group are always at least two positions apart in the sorted order. This value is also the provable upper bound, since any 3 consecutive sorted elements can't all be pairwise farther apart than their combined span.

## C# Solution

```csharp
public class Solution 
{
    public int MaxPartitionFactor(int[] nums) 
    {
        Array.Sort(nums);
        int n = nums.Length;
        int best = int.MaxValue;
        for (int i = 0; i + 2 < n; i++) 
        {
            best = Math.Min(best, nums[i + 2] - nums[i]);
        }
        return best;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(1) extra (excluding sort)
