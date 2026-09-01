# 3371. Identify the Largest Outlier in an Array

**Difficulty:** Medium
**Category:** Array, Hash Table

## Problem

An array `nums` has `n` numbers: `n-2` are "special numbers", one is the sum of the special numbers, and one is an outlier. Given `nums`, find the largest possible value the outlier could have.

### Example

Input: `nums = [2,3,5,10]`
Output: `10` — treating `2,3` as special (sum 5) makes `10` the outlier.

## Approach

Let `total` be the sum of all elements. If some element `x` is the "sum" element, then the special numbers sum to `x`, so the outlier equals `total - 2*x`. For every candidate `x` in `nums` (using frequency counts to handle duplicates and index distinctness), check if `total - 2*x` also exists as a distinct element, and track the maximum such outlier.

## C# Solution

```csharp
public class Solution 
{
    public int GetLargestOutlier(int[] nums) 
    {
        long total = 0;
        var freq = new Dictionary<int, int>();
        foreach (int x in nums) 
        {
            total += x;
            freq[x] = freq.GetValueOrDefault(x, 0) + 1;
        }

        int best = int.MinValue;
        foreach (int x in nums) 
        {
            long outlier = total - 2L * x;
            if (outlier == x) 
            {
                if (freq[x] >= 2) best = Math.Max(best, (int)outlier);
            } 
            else if (freq.ContainsKey((int)outlier)) 
            {
                best = Math.Max(best, (int)outlier);
            }
        }
        return best;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
