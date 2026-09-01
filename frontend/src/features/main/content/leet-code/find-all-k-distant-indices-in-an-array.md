# 2441. Find All K-Distant Indices in an Array

**Difficulty:** Easy
**Category:** Array, Two Pointers

## Problem

You are given a 0-indexed integer array `nums` and two integers `key` and `k`. A k-distant index is an index `i` of `nums` for which there exists at least one index `j` such that `|i - j| <= k` and `nums[j] == key`.

Return a list of all k-distant indices sorted in increasing order.

### Example

```
Input: nums = [3,4,9,1,3,9,5], key = 9, k = 1
Output: [1,2,3,4,5,6]
Explanation:
- Index 2 has nums[2] = 9, so indices 1, 2, 3 are k-distant.
- Index 5 has nums[5] = 9, so indices 4, 5, 6 are k-distant.
```

## Approach

Find all indices where `nums[i] == key`. For each such index, mark all indices within distance `k` as k-distant. Use a hash set to avoid duplicates, then sort the result.

## C# Solution

```csharp
public class Solution
{
    public IList<int> FindKDistantIndices(int[] nums, int key, int k)
    {
        var result = new SortedSet<int>();
        
        for (int j = 0; j < nums.Length; j++)
        {
            if (nums[j] == key)
            {
                for (int i = Math.Max(0, j - k); i <= Math.Min(nums.Length - 1, j + k); i++)
                {
                    result.Add(i);
                }
            }
        }
        
        return result.ToList();
    }
}
```

## Complexity

- **Time:** O(n × k) where n is the array length
- **Space:** O(n) for the result set
