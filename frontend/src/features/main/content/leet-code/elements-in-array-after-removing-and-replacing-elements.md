# 2113. Elements in Array After Removing and Replacing Elements

**Difficulty:** Medium
**Category:** Array, Simulation
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array and a series of operations that remove and replace elements cyclically, return the array after all queries are processed.

### Example

```
Input: nums = [0,1,2], queries = [[0,2],[2,3]]
Output: [2,1,3]
```

## Approach

Simulate each query operation by performing the specified removal and replacement. Track array state after each query. For efficiency, consider using a list or deque structure to handle modifications.

## C# Solution

```csharp
public class Solution
{
    public int[] ElementsInArray(int[] nums, int[][] queries)
    {
        var list = new List<int>(nums);
        
        foreach (var query in queries)
        {
            int idx = query[0];
            int val = query[1];
            
            if (idx < list.Count)
                list[idx] = val;
        }
        
        return list.ToArray();
    }
}
```

## Complexity

- **Time:** O(n + q) where n is array length and q is number of queries
- **Space:** O(n)
