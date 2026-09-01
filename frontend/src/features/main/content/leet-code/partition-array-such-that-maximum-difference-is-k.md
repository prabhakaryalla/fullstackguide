# 2294. Partition Array Such That Maximum Difference Is K

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting

## Problem

You are given an integer array `nums` and an integer `k`. You may partition `nums` into one or more subsequences such that each element in `nums` appears in exactly one subsequence.

Return the minimum number of subsequences needed such that the difference between the maximum and minimum values in each subsequence is at most `k`.

### Example

```
Input: nums = [3,6,1,2,5], k = 2
Output: 2
Explanation: Partition into [1,2,3] (diff = 2) and [5,6] (diff = 1). Total: 2 subsequences.
```

## Approach

Sort the array. Greedily create subsequences by starting with the smallest element and including elements until adding the next would exceed the `k` difference constraint.

## C# Solution

```csharp
public class Solution
{
    public int PartitionArray(int[] nums, int k)
    {
        Array.Sort(nums);
        
        int count = 1;
        int minVal = nums[0];
        
        for (int i = 1; i < nums.Length; i++)
        {
            if (nums[i] - minVal > k)
            {
                count++;
                minVal = nums[i];
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting.
- **Space:** O(1).
