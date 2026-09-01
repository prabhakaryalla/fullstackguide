# 2364. Count Number of Bad Pairs

**Difficulty:** Medium
**Category:** Array, Hash Table

## Problem

You are given a 0-indexed integer array `nums`. A pair of indices `(i, j)` is a bad pair if `i < j` and `j - i != nums[j] - nums[i]`.

Return the total number of bad pairs in `nums`.

### Example

```
Input: nums = [4,1,3,3]
Output: 5
Explanation: Total pairs = 6, good pairs = 1, bad pairs = 5
```

## Approach

Rearrange the condition: `j - i != nums[j] - nums[i]` is equivalent to `nums[i] - i != nums[j] - j`. Count pairs where `nums[i] - i == nums[j] - j` (good pairs), then total_pairs - good_pairs gives bad pairs.

## C# Solution

```csharp
public class Solution
{
    public long CountBadPairs(int[] nums)
    {
        int n = nums.Length;
        long totalPairs = (long)n * (n - 1) / 2;
        
        var countMap = new Dictionary<int, long>();
        long goodPairs = 0;
        
        for (int i = 0; i < n; i++)
        {
            int key = nums[i] - i;
            if (countMap.ContainsKey(key))
            {
                goodPairs += countMap[key];
                countMap[key]++;
            }
            else
            {
                countMap[key] = 1;
            }
        }
        
        return totalPairs - goodPairs;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
