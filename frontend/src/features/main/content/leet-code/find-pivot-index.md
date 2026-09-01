# 724. Find Pivot Index

**Difficulty:** Easy
**Category:** Array, Prefix Sum

## Problem

Given an array of integers `nums`, return the leftmost pivot index — an index where the sum of all elements to its left equals the sum of all elements to its right. Return `-1` if no such index exists.

### Example

```
Input: nums = [1,7,3,6,5,6]
Output: 3
```

## Approach

Compute the total sum of the array up front. Scan left to right, maintaining a running `leftSum`; at each index, the right-side sum can be derived as `totalSum - leftSum - nums[i]` without a separate pass. The first index where these two sums match is the answer.

## C# Solution

```csharp
public class Solution
{
    public int PivotIndex(int[] nums)
    {
        int totalSum = nums.Sum();
        int leftSum = 0;

        for (int i = 0; i < nums.Length; i++)
        {
            int rightSum = totalSum - leftSum - nums[i];
            if (leftSum == rightSum) return i;

            leftSum += nums[i];
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
