# 2270. Number of Ways to Split Array

**Difficulty:** Medium
**Category:** Array, Prefix Sum

## Problem

You are given an integer array `nums` of length `n`. A split at index `i` is valid if the sum of the first `i+1` elements is greater than or equal to the sum of the last `n-i-1` elements. Return the number of valid splits.

### Example

```
Input: nums = [10,4,-8,7]
Output: 2
Explanation: Valid splits at index 0: sum([10]) >= sum([4,-8,7]), and at index 1.
```

## Approach

Compute the total sum. Iterate through the array, maintaining a running left sum. At each index i (except the last), check if leftSum >= (total - leftSum). Count valid splits.

## C# Solution

```csharp
public class Solution
{
    public int WaysToSplitArray(int[] nums)
    {
        long total = 0;
        foreach (var num in nums)
        {
            total += num;
        }
        
        long leftSum = 0;
        int count = 0;
        
        for (int i = 0; i < nums.Length - 1; i++)
        {
            leftSum += nums[i];
            if (leftSum >= total - leftSum)
            {
                count++;
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
