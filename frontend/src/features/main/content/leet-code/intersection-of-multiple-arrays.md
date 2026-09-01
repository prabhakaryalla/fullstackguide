# 2248. Intersection of Multiple Arrays

**Difficulty:** Easy
**Category:** Array, Hash Table, Counting

## Problem

Given a 2D integer array `nums` where `nums[i]` is a sorted array of distinct integers, return a sorted array of integers that appear in all arrays of `nums`.

### Example

```
Input: nums = [[3,1,2,4,5],[1,2,3,4],[3,4,5,6]]
Output: [3,4]
```

## Approach

Use a hash table to count occurrences of each number across all arrays. Numbers appearing in all n arrays (count == n) are in the intersection. Sort and return them.

## C# Solution

```csharp
public class Solution
{
    public IList<int> Intersection(int[][] nums)
    {
        var count = new Dictionary<int, int>();
        foreach (var arr in nums)
        {
            foreach (var num in arr)
            {
                count[num] = count.GetValueOrDefault(num, 0) + 1;
            }
        }
        
        var result = new List<int>();
        foreach (var kvp in count)
        {
            if (kvp.Value == nums.Length)
            {
                result.Add(kvp.Key);
            }
        }
        
        result.Sort();
        return result;
    }
}
```

## Complexity

- **Time:** O(n * m) where n is number of arrays and m is average array size
- **Space:** O(k) where k is the number of unique elements
