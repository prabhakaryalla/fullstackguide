# 2770. Length of the Longest Increasing Path

**Difficulty:** Hard
**Category:** Array, Binary Search, Dynamic Programming

## Problem

You are given a 2D array `coordinates` of length `n` where `coordinates[i] = [xi, yi]` indicates the position of the `i`-th point in a 2D plane. You are also given an integer array `arr` of length `n`.

Return the length of the longest increasing path where you can move from point `i` to point `j` if:
- `xi < xj` and `yi < yj`, and
- `arr[i] < arr[j]`.

### Example

```
Input: coordinates = [[3,1],[2,2],[4,1],[0,0],[5,3]], arr = [3,4,2,1,5]
Output: 3
Explanation: One longest increasing path is: (0,0) -> (2,2) -> (5,3).
```

## Approach

Sort the coordinates by their position while keeping track of original indices. Use dynamic programming similar to Longest Increasing Subsequence but considering both coordinate constraints and value constraints.

## C# Solution

```csharp
public class Solution
{
    public int LengthOfLIS(int[][] coordinates, int[] arr)
    {
        int n = coordinates.Length;
        var points = new (int x, int y, int val, int idx)[n];
        
        for (int i = 0; i < n; i++)
        {
            points[i] = (coordinates[i][0], coordinates[i][1], arr[i], i);
        }
        
        Array.Sort(points, (a, b) =>
        {
            int cmp = a.x.CompareTo(b.x);
            return cmp != 0 ? cmp : a.y.CompareTo(b.y);
        });
        
        var dp = new int[n];
        Array.Fill(dp, 1);
        int maxLen = 1;
        
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < i; j++)
            {
                if (points[j].x < points[i].x && 
                    points[j].y < points[i].y && 
                    points[j].val < points[i].val)
                {
                    dp[i] = Math.Max(dp[i], dp[j] + 1);
                }
            }
            maxLen = Math.Max(maxLen, dp[i]);
        }
        
        return maxLen;
    }
}
```

## Complexity

- **Time:** O(n² log n)
- **Space:** O(n)
