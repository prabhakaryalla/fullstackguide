# 1515. Best Position for a Service Centre

**Difficulty:** Hard
**Category:** Math, Geometry, Randomized

## Problem

Given the positions of customers as `positions[i] = [xi, yi]`, find a point (the service centre) that minimizes the sum of Euclidean distances to all customers. Return that minimum possible sum, with a small tolerance for error.

### Example

```
Input: positions = [[0,1],[1,0],[1,2],[2,1]]
Output: 4.00000
```

## Approach

This is the classic "geometric median" problem, which generally has no closed-form solution. Use **Weiszfeld's algorithm**: start at the centroid, then iteratively move the estimate to the weighted average of all points, where each point's weight is the inverse of its current distance to the estimate. Repeat until the estimate converges (the total distance stops improving significantly).

## C# Solution

```csharp
public class Solution
{
    public double GetMinDistSum(int[][] positions)
    {
        int n = positions.Length;
        double x = 0, y = 0;
        foreach (int[] p in positions)
        {
            x += p[0];
            y += p[1];
        }
        x /= n;
        y /= n;

        double Total(double cx, double cy)
        {
            double sum = 0;
            foreach (int[] p in positions)
            {
                sum += Math.Sqrt((p[0] - cx) * (p[0] - cx) + (p[1] - cy) * (p[1] - cy));
            }
            return sum;
        }

        double prevTotal = Total(x, y);

        for (int iter = 0; iter < 200; iter++)
        {
            double numX = 0, numY = 0, denom = 0;

            foreach (int[] p in positions)
            {
                double dist = Math.Sqrt((p[0] - x) * (p[0] - x) + (p[1] - y) * (p[1] - y));
                double weight = dist < 1e-6 ? 1e6 : 1.0 / dist;
                numX += p[0] * weight;
                numY += p[1] * weight;
                denom += weight;
            }

            x = numX / denom;
            y = numY / denom;

            double newTotal = Total(x, y);
            if (Math.Abs(newTotal - prevTotal) < 1e-6)
            {
                prevTotal = newTotal;
                break;
            }
            prevTotal = newTotal;
        }

        return prevTotal;
    }
}
```

## Complexity

- **Time:** `O(n * iterations)` — each of a bounded number of Weiszfeld iterations scans all `n` points.
- **Space:** `O(1)` extra space.
