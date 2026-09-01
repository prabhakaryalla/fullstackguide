# 2256. Minimum Average Difference

**Difficulty:** Medium
**Category:** Array, Prefix Sum

## Problem

You are given a 0-indexed integer array `nums` of length `n`. The average difference of index `i` is the absolute difference between:
- The average of the first `i + 1` elements of `nums`
- The average of the last `n - i - 1` elements (or 0 if no elements remain)

Return the index with the minimum average difference. If there are multiple answers, return the smallest one.

### Example

```
Input: nums = [2,5,3,9,5,3]
Output: 3
Explanation:
- Index 0: avg(2) = 2, avg(5,3,9,5,3) = 5, diff = 3
- Index 1: avg(2,5) = 3.5, avg(3,9,5,3) = 5, diff = 1.5
- Index 2: avg(2,5,3) = 3.33, avg(9,5,3) = 5.67, diff = 2.33
- Index 3: avg(2,5,3,9) = 4.75, avg(5,3) = 4, diff = 0.75 (minimum)
- Index 4: avg(2,5,3,9,5) = 4.8, avg(3) = 3, diff = 1.8
- Index 5: avg(2,5,3,9,5,3) = 4.5, avg() = 0, diff = 4.5
```

## Approach

Compute prefix sum for efficient range sum queries. For each index, calculate left and right averages using integer division, then find the minimum absolute difference.

## C# Solution

```csharp
public class Solution
{
    public int MinimumAverageDifference(int[] nums)
    {
        int n = nums.Length;
        long totalSum = 0;
        
        foreach (int num in nums)
        {
            totalSum += num;
        }
        
        long leftSum = 0;
        long minDiff = long.MaxValue;
        int result = 0;
        
        for (int i = 0; i < n; i++)
        {
            leftSum += nums[i];
            long leftAvg = leftSum / (i + 1);
            
            long rightSum = totalSum - leftSum;
            long rightAvg = (i == n - 1) ? 0 : rightSum / (n - i - 1);
            
            long diff = Math.Abs(leftAvg - rightAvg);
            
            if (diff < minDiff)
            {
                minDiff = diff;
                result = i;
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n).
- **Space:** O(1).
