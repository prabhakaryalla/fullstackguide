# 2418. Find Subarrays With Equal Sum

**Difficulty:** Easy
**Category:** Array, Hash Table

## Problem

Given a 0-indexed integer array `nums`, determine whether there exist two subarrays of length 2 with equal sum. A subarray is a contiguous non-empty sequence of elements within an array.

Return `true` if these subarrays exist, and `false` otherwise.

### Example

```
Input: nums = [4,2,4]
Output: true
Explanation: The subarrays with elements [4,2] and [2,4] have the same sum of 6.
```

## Approach

Iterate through the array and calculate the sum of each consecutive pair. Use a hash set to track sums we've seen. If we encounter a sum that's already in the set, return true. If we finish without finding a duplicate, return false.

## C# Solution

```csharp
public class Solution
{
    public bool FindSubarrays(int[] nums)
    {
        var sums = new HashSet<int>();
        
        for (int i = 0; i < nums.Length - 1; i++)
        {
            int sum = nums[i] + nums[i + 1];
            if (sums.Contains(sum))
            {
                return true;
            }
            sums.Add(sum);
        }
        
        return false;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the array
- **Space:** O(n) for the hash set
