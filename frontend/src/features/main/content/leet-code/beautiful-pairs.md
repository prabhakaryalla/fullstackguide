# 2613. Beautiful Pairs

**Difficulty:** Hard
**Category:** Array, Math, Binary Search, Geometry

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given two 2D integer arrays `nums1` and `nums2`. A pair `(i, j)` is considered beautiful if `nums1[i]` and `nums2[j]` are close in terms of some distance metric.

Return an array of the most beautiful pairs according to the given criteria.

### Example

```
Input: nums1 = [[1,2],[3,4]], nums2 = [[2,3],[4,5]]
Output: [0,1]
Explanation: The pair (0,1) has minimum combined distance.
```

## Approach

For each element in nums1, find the closest element in nums2 using a distance metric (typically Manhattan or Euclidean distance). Sort pairs by their distance and return the pair with minimum distance. If there are ties, return the lexicographically smallest indices.

## C# Solution

```csharp
public class Solution
{
    public int[] ClosestPair(int[][] nums1, int[][] nums2)
    {
        int minDist = int.MaxValue;
        int[] result = new int[2];
        
        for (int i = 0; i < nums1.Length; i++)
        {
            for (int j = 0; j < nums2.Length; j++)
            {
                int dist = Distance(nums1[i], nums2[j]);
                
                if (dist < minDist || (dist == minDist && (i < result[0] || (i == result[0] && j < result[1]))))
                {
                    minDist = dist;
                    result[0] = i;
                    result[1] = j;
                }
            }
        }
        
        return result;
    }
    
    private int Distance(int[] p1, int[] p2)
    {
        return Math.Abs(p1[0] - p2[0]) + Math.Abs(p1[1] - p2[1]);
    }
}
```

## Complexity

- **Time:** O(n * m) where n and m are lengths of the two arrays
- **Space:** O(1)
