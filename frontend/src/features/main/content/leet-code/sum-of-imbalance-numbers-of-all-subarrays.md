# 2763. Sum of Imbalance Numbers of All Subarrays

**Difficulty:** Hard
**Category:** Array

## Problem

The imbalance number of a 0-indexed integer array `arr` of length `n` is defined as the number of indices in `sarr = sorted(arr)` such that the following conditions hold:
- `0 <= i < n - 1`, and
- `sarr[i+1] - sarr[i] > 1`

Here, `sorted(arr)` is the function that returns the sorted version of `arr`.

Given a 0-indexed integer array `nums`, return the sum of imbalance numbers of all its subarrays.

### Example

```
Input: nums = [2,3,1,4]
Output: 3
Explanation: Consider all subarrays and their imbalance numbers.
```

## Approach

For each subarray, sort it and count pairs of adjacent elements with difference > 1. This gives the imbalance number. Sum across all subarrays.

## C# Solution

```csharp
public class Solution
{
    public int SumImbalanceNumbers(int[] nums)
    {
        int n = nums.Length;
        int totalSum = 0;
        
        for (int i = 0; i < n; i++)
        {
            var subarray = new List<int>();
            
            for (int j = i; j < n; j++)
            {
                subarray.Add(nums[j]);
                subarray.Sort();
                
                int imbalance = 0;
                for (int k = 0; k < subarray.Count - 1; k++)
                {
                    if (subarray[k + 1] - subarray[k] > 1)
                    {
                        imbalance++;
                    }
                }
                
                totalSum += imbalance;
            }
        }
        
        return totalSum;
    }
}
```

## Complexity

- **Time:** O(n³ log n)
- **Space:** O(n)
