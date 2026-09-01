# 3000. Maximum Area of Longest Diagonal Rectangle

**Difficulty:** Easy
**Category:** Array, Math

## Problem

You are given a 2D array `dimensions` where `dimensions[i] = [lengthi, widthi]` represents a rectangle. Return the area of the rectangle with the longest diagonal. If there are multiple rectangles with the longest diagonal, return the maximum area among them.

### Example

```
Input: dimensions = [[9,3],[8,6]]
Output: 48
Explanation: 
- Rectangle 0: diagonal = sqrt(81+9) = sqrt(90)
- Rectangle 1: diagonal = sqrt(64+36) = sqrt(100) = 10 (longer)
Return area of rectangle 1: 8*6 = 48

Input: dimensions = [[3,4],[4,3]]
Output: 12
Explanation: Both have diagonal 5, same area 12.
```

## Approach

For each rectangle, calculate the square of its diagonal (to avoid floating point). Track the maximum diagonal² and the maximum area among rectangles with that diagonal².

## C# Solution

```csharp
public class Solution
{
    public int AreaOfMaxDiagonal(int[][] dimensions)
    {
        int maxDiagonalSq = 0;
        int maxArea = 0;

        foreach (var dim in dimensions)
        {
            int length = dim[0], width = dim[1];
            int diagonalSq = length * length + width * width;
            int area = length * width;

            if (diagonalSq > maxDiagonalSq || 
                (diagonalSq == maxDiagonalSq && area > maxArea))
            {
                maxDiagonalSq = diagonalSq;
                maxArea = area;
            }
        }

        return maxArea;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
