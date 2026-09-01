# 3740. Minimum Distance Between Three Equal Elements I

**Difficulty:** Easy
**Category:** Array, Hash Table

## Problem

Given an integer array `nums`, find three indices `i < j < k` such that `nums[i] == nums[j] == nums[k]`, and return the minimum possible value of `k - i`. Return -1 if no such triple exists.

### Example

nums = [1,2,1,3,1] → indices 0,2,4 all hold value 1, giving k-i = 4-0 = 4, the only option here.

## Approach

Group indices by value using a hash map. For a value with at least three occurrences, the minimum `k - i` span for that value comes from some three consecutive stored indices (since indices are collected in increasing order, any 3 consecutive entries give the tightest spread). Slide a window of 3 over each value's index list and track the global minimum.

## C# Solution

```csharp
public class Solution 
{
    public int MinimumDistance(int[] nums) 
    {
        var indices = new Dictionary<int, List<int>>();
        for (int i = 0; i < nums.Length; i++) 
        {
            if (!indices.TryGetValue(nums[i], out var list)) 
            {
                list = new List<int>();
                indices[nums[i]] = list;
            }
            list.Add(i);
        }

        int best = int.MaxValue;
        foreach (var list in indices.Values) 
        {
            for (int k = 0; k + 2 < list.Count; k++) 
            {
                best = Math.Min(best, list[k + 2] - list[k]);
            }
        }
        return best == int.MaxValue ? -1 : best;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
