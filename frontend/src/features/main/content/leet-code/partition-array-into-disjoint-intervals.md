# 915. Partition Array into Disjoint Intervals

**Difficulty:** Medium
**Category:** Array

## Problem

Given an integer array `nums`, partition it into two contiguous, non-empty parts `left` and `right` such that every element in `left` is less than or equal to every element in `right`, and `left` has the smallest possible length. Return the length of `left`.

### Example

```
Input: nums = [5,0,3,8,6]
Output: 3
```

## Approach

Track the running maximum of everything seen so far (`curMax`) and the maximum allowed for the left partition (`leftMax`). Whenever a smaller element than `leftMax` shows up, the partition boundary must move past it, so extend `leftMax` to `curMax` and record the new partition index.

## C# Solution

```csharp
public class Solution
{
    public int PartitionDisjoint(int[] nums)
    {
        int leftMax = nums[0], curMax = nums[0], partitionIdx = 0;

        for (int i = 1; i < nums.Length; i++)
        {
            curMax = Math.Max(curMax, nums[i]);

            if (nums[i] < leftMax)
            {
                leftMax = curMax;
                partitionIdx = i;
            }
        }

        return partitionIdx + 1;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
