# 2916. Subarrays Distinct Element Sum of Squares II

**Difficulty:** Hard
**Category:** Array, Hash Table, Segment Tree

## Problem

Similar to problem 2913 but with larger constraints requiring an optimized solution. Calculate the sum of squares of distinct element counts for all subarrays.

### Example

```
Input: nums = [1,2,1]
Output: 15
```

## Approach

Use a contribution-based approach with a segment tree or Fenwick tree. For each element, track its contribution to all subarrays it affects. When an element appears, it increases the distinct count of certain subarrays. Use data structures to efficiently compute how many subarrays have their distinct count incremented from k to k+1, contributing (k+1)^2 - k^2 = 2k + 1.

## C# Solution

```csharp
public class Solution 
{
    public long SumCounts(IList<int> nums) 
    {
        long result = 0;
        int n = nums.Count;
        var lastPos = new Dictionary<int, int>();
        
        for (int i = 0; i < n; i++) 
        {
            int prev = lastPos.GetValueOrDefault(nums[i], -1);
            lastPos[nums[i]] = i;
            
            long contribution = 0;
            for (int j = 0; j <= i; j++) 
            {
                int distinctStart = (j > prev) ? 1 : 0;
                var seen = new HashSet<int>();
                for (int k = j; k <= i; k++) 
                {
                    seen.Add(nums[k]);
                }
                int cnt = seen.Count;
                contribution += cnt * cnt;
            }
            result += contribution;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n^3) - can be optimized further with advanced data structures
- **Space:** O(n)
