# 2152. Minimum Number of Lines to Cover Points

**Difficulty:** Medium
**Category:** Array, Backtracking, Bit Manipulation
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array of points on a 2D plane, return the minimum number of straight lines needed to cover all points. Each line can pass through any two or more points.

### Example

```
Input: points = [[0,0],[1,1],[2,2],[3,3]]
Output: 1
Explanation: All points lie on a single line.
```

## Approach

This is a set cover problem. Since the number of points is small (≤10), we can use backtracking or bitmask DP:
1. For each pair of points, determine which other points lie on the same line
2. Use backtracking to find the minimum number of lines to cover all points
3. Try selecting each line and recursively cover remaining points

## C# Solution

```csharp
public class Solution
{
    private int minLines;
    
    public int MinimumLines(int[][] points)
    {
        int n = points.Length;
        if (n <= 2) return n == 0 ? 0 : 1;
        
        minLines = n;
        Backtrack(points, 0, new bool[n], 0);
        return minLines;
    }
    
    private void Backtrack(int[][] points, int start, bool[] covered, int lineCount)
    {
        if (lineCount >= minLines) return;
        
        // Find first uncovered point
        int firstUncovered = -1;
        for (int i = 0; i < points.Length; i++)
        {
            if (!covered[i])
            {
                firstUncovered = i;
                break;
            }
        }
        
        if (firstUncovered == -1)
        {
            minLines = Math.Min(minLines, lineCount);
            return;
        }
        
        // Try pairing with each other uncovered point
        for (int j = firstUncovered + 1; j < points.Length; j++)
        {
            if (covered[j]) continue;
            
            // Mark all points on this line as covered
            var original = (bool[])covered.Clone();
            covered[firstUncovered] = covered[j] = true;
            
            for (int k = 0; k < points.Length; k++)
            {
                if (!covered[k] && OnSameLine(points[firstUncovered], points[j], points[k]))
                    covered[k] = true;
            }
            
            Backtrack(points, firstUncovered + 1, covered, lineCount + 1);
            
            // Restore
            Array.Copy(original, covered, covered.Length);
        }
        
        // Try single point line
        covered[firstUncovered] = true;
        Backtrack(points, firstUncovered + 1, covered, lineCount + 1);
        covered[firstUncovered] = false;
    }
    
    private bool OnSameLine(int[] p1, int[] p2, int[] p3)
    {
        // Cross product: (p2-p1) × (p3-p1) == 0
        return (p2[1] - p1[1]) * (p3[0] - p1[0]) == (p3[1] - p1[1]) * (p2[0] - p1[0]);
    }
}
```

## Complexity

- **Time:** O(2^n * n²) in worst case
- **Space:** O(n) for recursion and covered array
