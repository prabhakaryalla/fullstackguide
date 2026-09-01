# 2107. Number of Unique Flavors After Sharing K Candies

**Difficulty:** Medium
**Category:** Array, Hash Table, Sliding Window
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You have an array of candies where each element represents a flavor. You share exactly `k` candies with your friend. Return the maximum number of unique flavors you can have remaining after sharing.

### Example

```
Input: candies = [1,2,1,3,4,3], k = 3
Output: 3
Explanation: Share candies [1,1,3] and keep [2,3,4] with 3 unique flavors.
```

## Approach

The problem is equivalent to finding a subarray of length k that minimizes the number of unique flavors (so the remaining part has maximum unique flavors). Use a sliding window to track unique flavors in windows of size k, and count total unique flavors minus those in the minimum window.

## C# Solution

```csharp
public class Solution
{
    public int MaxNumOfUniqueFlavorAfterSharing(int[] candies, int k)
    {
        var totalCount = new Dictionary<int, int>();
        foreach (int c in candies)
            totalCount[c] = totalCount.GetValueOrDefault(c, 0) + 1;
        
        var windowCount = new Dictionary<int, int>();
        int minUnique = int.MaxValue;
        
        for (int i = 0; i < candies.Length; i++)
        {
            windowCount[candies[i]] = windowCount.GetValueOrDefault(candies[i], 0) + 1;
            
            if (i >= k)
            {
                int left = candies[i - k];
                windowCount[left]--;
                if (windowCount[left] == 0)
                    windowCount.Remove(left);
            }
            
            if (i >= k - 1)
                minUnique = Math.Min(minUnique, windowCount.Count);
        }
        
        return totalCount.Count - minUnique;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
