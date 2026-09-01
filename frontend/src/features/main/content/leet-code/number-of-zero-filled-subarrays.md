# 2348. Number of Zero-Filled Subarrays

**Difficulty:** Medium
**Category:** Array, Math

## Problem

Given an integer array `nums`, return the number of subarrays filled with `0`.

A subarray is a contiguous non-empty sequence of elements within an array.

### Example

```
Input: nums = [1,3,0,0,2,0,0,4]
Output: 6
Explanation: There are 6 subarrays of zeros:
- [0] at index 2
- [0,0] from index 2-3
- [0] at index 3
- [0] at index 5
- [0,0] from index 5-6
- [0] at index 6
```

## Approach

Count consecutive zeros. For each contiguous segment of `k` zeros, it contributes `k * (k + 1) / 2` subarrays (arithmetic series).

## C# Solution

```csharp
public class Solution
{
    public long ZeroFilledSubarray(int[] nums)
    {
        long result = 0;
        long count = 0;
        
        foreach (int num in nums)
        {
            if (num == 0)
            {
                count++;
            }
            else
            {
                result += count * (count + 1) / 2;
                count = 0;
            }
        }
        
        result += count * (count + 1) / 2;
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
