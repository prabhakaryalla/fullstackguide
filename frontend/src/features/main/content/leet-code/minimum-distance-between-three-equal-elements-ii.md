# 3741. Minimum Distance Between Three Equal Elements II

**Difficulty:** Medium
**Category:** Array, Hash Table

## Problem

Same as "Minimum Distance Between Three Equal Elements I" but with much larger input sizes, requiring an efficient linear-time solution.

### Example

nums = [4,1,4,2,4] → indices of value 4 are 0,2,4; k-i = 4-0 = 4 is the minimum (and only) triple span.

## Approach

The same grouping technique already runs in linear time: collect indices per value in a hash map (each list is naturally sorted since we scan left to right), then for each value with 3 or more occurrences, slide a window of size 3 across its index list and track the smallest span.

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
