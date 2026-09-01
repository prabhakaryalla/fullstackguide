# 2820. Count the Number of Ways to Place People I

**Difficulty:** Medium
**Category:** Array, Geometry, Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a 2D array `points` where `points[i] = [xᵢ, yᵢ]` represents the coordinates of people. Two people can see each other if there are no other people in the rectangle formed by their positions (with sides parallel to axes).

Count the number of ways to select pairs of people such that they can see each other.

### Example

```
Input: points = [[1,1],[2,2],[3,3]]
Output: 2
Explanation: (1,1) can see (2,2), and (2,2) can see (3,3)
```

## Approach

For each pair of points:
1. Form a rectangle with sides parallel to axes
2. Check if any other point lies strictly inside this rectangle
3. If no point is inside, this pair can see each other

## C# Solution

```csharp
public class Solution
{
    public int NumberOfPairs(int[][] points)
    {
        int n = points.Length;
        int count = 0;
        
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (i == j)
                    continue;
                
                int x1 = points[i][0];
                int y1 = points[i][1];
                int x2 = points[j][0];
                int y2 = points[j][1];
                
                int minX = Math.Min(x1, x2);
                int maxX = Math.Max(x1, x2);
                int minY = Math.Min(y1, y2);
                int maxY = Math.Max(y1, y2);
                
                bool hasBlocking = false;
                for (int k = 0; k < n; k++)
                {
                    if (k == i || k == j)
                        continue;
                    
                    int x = points[k][0];
                    int y = points[k][1];
                    
                    if (x > minX && x < maxX && y > minY && y < maxY)
                    {
                        hasBlocking = true;
                        break;
                    }
                }
                
                if (!hasBlocking)
                {
                    count++;
                }
            }
        }
        
        return count / 2;
    }
}
```

## Complexity

- **Time:** O(n³) for checking all pairs and all blocking points
- **Space:** O(1)
