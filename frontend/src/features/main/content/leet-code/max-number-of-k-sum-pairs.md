# 1679. Max Number of K-Sum Pairs

**Difficulty:** Medium
**Category:** Array, Hash Table, Two Pointers, Sorting

## Problem

Given `nums` and an integer `k`, in one operation you may pick two numbers summing to `k` and remove them. Return the maximum number of such operations you can perform.

### Example

```
Input: nums = [1,2,3,4], k = 5
Output: 2
```

## Approach

Sort the array and use two pointers from both ends: if the pointed pair sums to `k`, count it and move both pointers inward; if the sum is too small, advance the left pointer; if too large, retreat the right pointer.

## C# Solution

```csharp
public class Solution
{
    public int MaxOperations(int[] nums, int k)
    {
        Array.Sort(nums);
        int left = 0;
        int right = nums.Length - 1;
        int count = 0;

        while (left < right)
        {
            int sum = nums[left] + nums[right];

            if (sum == k)
            {
                count++;
                left++;
                right--;
            }
            else if (sum < k)
            {
                left++;
            }
            else
            {
                right--;
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(log n)` for the sort.
