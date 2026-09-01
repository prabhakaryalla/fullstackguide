# 2948. Make Lexicographically Smallest Array by Swapping Elements

**Difficulty:** Medium
**Category:** Array, Union Find, Sorting

## Problem

You are given an array `nums` and an integer `limit`. You can swap any two elements whose absolute difference is at most `limit`. Return the lexicographically smallest array possible after any number of swaps.

### Example

```
Input: nums = [1,5,3,9,8], limit = 2
Output: [1,3,5,8,9]
Explanation: Elements within limit can be rearranged optimally.
```

## Approach

Group elements that can be swapped (connected by chains where consecutive elements differ by at most limit). Sort each group and place them back in their original positions in sorted order.

## C# Solution

```csharp
public class Solution 
{
    public int[] LexicographicallySmallestArray(int[] nums, int limit) 
    {
        int n = nums.Length;
        var indexed = nums.Select((val, idx) => (val, idx)).OrderBy(x => x.val).ToArray();
        var groups = new List<List<int>>();
        var positions = new List<List<int>>();
        
        var currentGroup = new List<int> { indexed[0].val };
        var currentPos = new List<int> { indexed[0].idx };
        
        for (int i = 1; i < n; i++) 
        {
            if (indexed[i].val - indexed[i - 1].val <= limit) 
            {
                currentGroup.Add(indexed[i].val);
                currentPos.Add(indexed[i].idx);
            } 
            else 
            {
                groups.Add(new List<int>(currentGroup));
                positions.Add(new List<int>(currentPos));
                currentGroup.Clear();
                currentPos.Clear();
                currentGroup.Add(indexed[i].val);
                currentPos.Add(indexed[i].idx);
            }
        }
        groups.Add(currentGroup);
        positions.Add(currentPos);
        
        int[] result = new int[n];
        for (int g = 0; g < groups.Count; g++) 
        {
            var sortedPos = positions[g].OrderBy(x => x).ToList();
            for (int i = 0; i < sortedPos.Count; i++) 
            {
                result[sortedPos[i]] = groups[g][i];
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
