# 2280. Minimum Lines to Represent a Line Chart

**Difficulty:** Medium
**Category:** Array, Math, Geometry, Sorting

## Problem

You are given a 2D integer array `stockPrices` where `stockPrices[i] = [day[i], price[i]]` indicates the price of stock on day `day[i]`.

A line chart is created from the array by plotting the points on an XY plane and connecting adjacent points. Return the minimum number of lines needed to represent the line chart.

### Example

```
Input: stockPrices = [[1,7],[2,6],[3,5],[4,4],[5,4],[6,3],[7,2],[8,1]]
Output: 3
Explanation: The chart can be represented by 3 lines with different slopes.
```

## Approach

Sort points by day. Compare the slope between consecutive segments. When the slope changes, increment the line count. Use cross-multiplication to avoid floating-point precision issues.

## C# Solution

```csharp
public class Solution
{
    public int MinimumLines(int[][] stockPrices)
    {
        if (stockPrices.Length == 1) return 0;
        
        Array.Sort(stockPrices, (a, b) => a[0].CompareTo(b[0]));
        
        int lines = 1;
        
        for (int i = 2; i < stockPrices.Length; i++)
        {
            long x1 = stockPrices[i - 1][0] - stockPrices[i - 2][0];
            long y1 = stockPrices[i - 1][1] - stockPrices[i - 2][1];
            long x2 = stockPrices[i][0] - stockPrices[i - 1][0];
            long y2 = stockPrices[i][1] - stockPrices[i - 1][1];
            
            if (y1 * x2 != y2 * x1)
            {
                lines++;
            }
        }
        
        return lines;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting.
- **Space:** O(1).
