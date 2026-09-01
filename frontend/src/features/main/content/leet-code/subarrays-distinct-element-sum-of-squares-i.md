# 2913. Subarrays Distinct Element Sum of Squares I

**Difficulty:** Easy
**Category:** Array, Hash Table

## Problem

You are given an array `nums`. For each subarray, calculate the square of the count of distinct elements in that subarray. Return the sum of all these squared counts.

### Example

```
Input: nums = [1,2,1]
Output: 15
Explanation: 
- Subarray [1]: 1 distinct element, 1^2 = 1
- Subarray [2]: 1 distinct element, 1^2 = 1
- Subarray [1]: 1 distinct element, 1^2 = 1
- Subarray [1,2]: 2 distinct, 2^2 = 4
- Subarray [2,1]: 2 distinct, 2^2 = 4
- Subarray [1,2,1]: 2 distinct, 2^2 = 4
Total = 1+1+1+4+4+4 = 15
```

## Approach

Use a brute force approach with nested loops. For each starting index, expand the subarray and maintain a set to track distinct elements. For each subarray, square the distinct count and add to the result.

## C# Solution

```csharp
public class Solution 
{
    public int SumCounts(IList<int> nums) 
    {
        int n = nums.Count;
        int sum = 0;
        
        for (int i = 0; i < n; i++) 
        {
            var seen = new HashSet<int>();
            for (int j = i; j < n; j++) 
            {
                seen.Add(nums[j]);
                int distinctCount = seen.Count;
                sum += distinctCount * distinctCount;
            }
        }
        
        return sum;
    }
}
```

## Complexity

- **Time:** O(n^2)
- **Space:** O(n) for the hash set
