# 1828. Queries on Number of Points Inside a Circle

**Difficulty:** Medium
**Category:** Array, Math, Geometry

## Problem

Given an array `points` and an array `queries` where `queries[i] = [x, y, r]` describes a circle, return an array `answer` where `answer[i]` is the number of points that lie inside or on the boundary of the `i`-th circle.

### Example

```
Input: points = [[1,3],[3,3],[5,3],[2,2]], queries = [[2,3,1],[4,3,1],[1,1,2]]
Output: [3,2,2]
```

## Approach

For each query circle, iterate over every point and check whether its squared distance to the circle's center is at most `r^2`, using squared distances to avoid floating-point square roots. The problem's constraints keep both arrays small enough for this brute-force approach to be efficient.

## C# Solution

```csharp
public class Solution
{
    public int[] CountPoints(int[][] points, int[][] queries)
    {
        var result = new int[queries.Length];

        for (int q = 0; q < queries.Length; q++)
        {
            int x = queries[q][0], y = queries[q][1], r = queries[q][2];
            int count = 0;

            foreach (var p in points)
            {
                int dx = p[0] - x, dy = p[1] - y;
                if (dx * dx + dy * dy <= r * r) count++;
            }

            result[q] = count;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(p * q)` where `p` is the number of points and `q` the number of queries.
- **Space:** `O(q)` for the output.
