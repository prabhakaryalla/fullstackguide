# 2345. Finding the Number of Visible Mountains

**Difficulty:** Medium
**Category:** Array, Stack, Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a 2D integer array `peaks` where `peaks[i] = [xi, yi]` represents that there is a mountain at coordinate `(xi, yi)`. A mountain forms an isoceles triangle with its peak at `(xi, yi)` and extending down with a slope of 45 degrees on both sides.

A mountain is considered visible if there is no other mountain that completely covers it (i.e., a taller mountain with the same or wider base that blocks the view).

Return the number of visible mountains.

### Example

```
Input: peaks = [[2,2],[6,3],[5,4]]
Output: 2
Explanation:
The mountain at (2,2) has base from 0 to 4
The mountain at (6,3) has base from 3 to 9  
The mountain at (5,4) has base from 1 to 9
The mountain at (5,4) completely covers (6,3)
So only 2 mountains are visible: (2,2) and (5,4)
```

## Approach

For each mountain at `(x, y)`, it spans from `x - y` to `x + y`. Convert each mountain to its left and right boundaries.

A mountain is hidden if another mountain has:
- Left boundary <= its left boundary
- Right boundary >= its right boundary
- And it's not the same mountain

Sort mountains and check for covering relationships. Also handle duplicate mountains (identical peaks should not count as visible).

## C# Solution

```csharp
public class Solution
{
    public int VisibleMountains(int[][] peaks)
    {
        var mountains = new List<(int left, int right, int index)>();
        
        for (int i = 0; i < peaks.Length; i++)
        {
            int x = peaks[i][0];
            int y = peaks[i][1];
            mountains.Add((x - y, x + y, i));
        }
        
        var duplicateSet = new HashSet<(int, int)>();
        var mountainSet = new Dictionary<(int, int), int>();
        
        foreach (var m in mountains)
        {
            var key = (m.left, m.right);
            if (mountainSet.ContainsKey(key))
            {
                duplicateSet.Add(key);
            }
            else
            {
                mountainSet[key] = 1;
            }
        }
        
        var uniqueMountains = mountainSet.Keys.Where(k => !duplicateSet.Contains(k)).ToList();
        
        int visibleCount = 0;
        
        foreach (var m1 in uniqueMountains)
        {
            bool isCovered = false;
            
            foreach (var m2 in uniqueMountains)
            {
                if (m1 == m2) continue;
                
                if (m2.Item1 <= m1.Item1 && m2.Item2 >= m1.Item2)
                {
                    isCovered = true;
                    break;
                }
            }
            
            if (!isCovered)
            {
                visibleCount++;
            }
        }
        
        return visibleCount;
    }
}
```

## Complexity

- **Time:** O(n^2) where n is the number of mountains
- **Space:** O(n) for storing mountain data
