# 2943. Maximize Area of Square Hole in Grid

**Difficulty:** Medium
**Category:** Array, Sorting

## Problem

You are given the dimensions of a grid and arrays representing removed horizontal and vertical bars. A square hole is formed by removed consecutive bars. Return the maximum side length of a square hole that can be formed.

### Example

```
Input: n = 2, m = 1, hBars = [2,3], vBars = [2]
Output: 2
```

## Approach

Find the longest consecutive sequence in both hBars and vBars arrays. The maximum square side is limited by the minimum of the two longest consecutive sequences plus 1 (since bars define edges, not spaces).

## C# Solution

```csharp
public class Solution 
{
    public int MaximizeSquareHoleArea(int n, int m, int[] hBars, int[] vBars) 
    {
        int maxH = MaxConsecutive(hBars);
        int maxV = MaxConsecutive(vBars);
        int side = Math.Min(maxH, maxV) + 1;
        return side * side;
    }
    
    private int MaxConsecutive(int[] bars) 
    {
        if (bars.Length == 0) return 0;
        Array.Sort(bars);
        
        int maxLen = 1, currentLen = 1;
        for (int i = 1; i < bars.Length; i++) 
        {
            if (bars[i] == bars[i - 1] + 1) 
            {
                currentLen++;
                maxLen = Math.Max(maxLen, currentLen);
            } 
            else 
            {
                currentLen = 1;
            }
        }
        
        return maxLen;
    }
}
```

## Complexity

- **Time:** O(n log n + m log m)
- **Space:** O(1)
