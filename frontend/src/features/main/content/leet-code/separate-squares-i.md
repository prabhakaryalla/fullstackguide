# 3453. Separate Squares I

**Difficulty:** Medium
**Category:** Array, Binary Search, Geometry

## Problem
You are given a 2D array `squares` where `squares[i] = [x, y, length]` describes an axis-aligned square with bottom-left corner `(x, y)` and side length `length`. Find a horizontal line `y = k` such that the total area of the squares above the line equals the total area of the squares below the line (parts of squares intersected by the line count proportionally). Return the value `k`. Answers within `1e-5` of the actual answer are accepted.

## Approach
Binary search on the real-valued line position `k`. For a given `k`, compute the total area below the line by summing, for each square, `min(length, max(0, k - y)) * length` (the overlap height clipped between 0 and the square's length, times its width which equals length since squares are equal-sided). Compare this to half the total area of all squares; adjust binary search bounds accordingly. Continue until convergence within the required precision.

## C# Solution

```csharp
public class Solution 
{
    public double SeparateSquares(int[][] squares) 
    {
        double totalArea = 0;
        double minY = double.MaxValue, maxY = double.MinValue;

        foreach (var sq in squares)
        {
            double y = sq[1];
            double len = sq[2];
            totalArea += len * len;
            minY = System.Math.Min(minY, y);
            maxY = System.Math.Max(maxY, y + len);
        }

        double target = totalArea / 2.0;
        double lo = minY, hi = maxY;

        for (int iter = 0; iter < 100; iter++)
        {
            double mid = (lo + hi) / 2.0;
            double areaBelow = 0;

            foreach (var sq in squares)
            {
                double y = sq[1];
                double len = sq[2];
                double overlap = System.Math.Min(len, System.Math.Max(0, mid - y));
                areaBelow += overlap * len;
            }

            if (areaBelow < target)
            {
                lo = mid;
            }
            else
            {
                hi = mid;
            }
        }

        return (lo + hi) / 2.0;
    }
}
```

## Complexity

- **Time:** O(n log(1/epsilon)) where n is the number of squares
- **Space:** O(1) auxiliary
