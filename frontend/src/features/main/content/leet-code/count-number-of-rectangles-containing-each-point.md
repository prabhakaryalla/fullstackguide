# 2250. Count Number of Rectangles Containing Each Point

**Difficulty:** Medium
**Category:** Array, Binary Search, Sorting

## Problem

You are given a 2D integer array `rectangles` where `rectangles[i] = [li, hi]` represents a rectangle with dimensions `li x hi`, and a 2D integer array `points` where `points[j] = [xj, yj]` represents a point. Return an array `count` where `count[j]` is the number of rectangles that contain the point `points[j]`.

### Example

```
Input: rectangles = [[1,2],[2,3],[2,5]], points = [[2,1],[1,4]]
Output: [2,1]
```

## Approach

Group rectangles by height. For each query point, iterate through all heights >= point's y-coordinate, and use binary search to count rectangles with length >= point's x-coordinate.

## C# Solution

```csharp
public class Solution
{
    public int[] CountRectangles(int[][] rectangles, int[][] points)
    {
        var byHeight = new Dictionary<int, List<int>>();
        
        foreach (var rect in rectangles)
        {
            if (!byHeight.ContainsKey(rect[1]))
            {
                byHeight[rect[1]] = new List<int>();
            }
            byHeight[rect[1]].Add(rect[0]);
        }
        
        foreach (var list in byHeight.Values)
        {
            list.Sort();
        }
        
        int[] result = new int[points.Length];
        for (int i = 0; i < points.Length; i++)
        {
            int x = points[i][0], y = points[i][1];
            int count = 0;
            
            for (int h = y; h <= 100; h++)
            {
                if (byHeight.ContainsKey(h))
                {
                    var list = byHeight[h];
                    int idx = BinarySearch(list, x);
                    count += list.Count - idx;
                }
            }
            
            result[i] = count;
        }
        
        return result;
    }
    
    private int BinarySearch(List<int> list, int target)
    {
        int left = 0, right = list.Count;
        while (left < right)
        {
            int mid = left + (right - left) / 2;
            if (list[mid] >= target) right = mid;
            else left = mid + 1;
        }
        return left;
    }
}
```

## Complexity

- **Time:** O((m + n) * h * log m) where m is rectangles count, n is points count, h is max height
- **Space:** O(m)
