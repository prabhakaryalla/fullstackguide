# 2509. Cycle Length Queries in a Tree

**Difficulty:** Hard
**Category:** Tree, Binary Search

## Problem

You are given an integer `n`. There is a complete binary tree with `2^n - 1` nodes. The root is numbered 1, and for every node `i`, its children are numbered `2*i` and `2*i + 1`.

You are given a 2D array `queries` where `queries[i] = [a_i, b_i]`. For each query, find the length of the cycle formed by the path from `a_i` to `b_i` plus the edge from `b_i` to `a_i`.

Return an array where the ith element is the answer to the ith query.

### Example

```
Input: n = 3, queries = [[5,3],[4,7],[2,3]]
Output: [4,2,3]
Explanation: For query [5,3]: path 5→2→1→3, plus edge 3→5 = 4 edges
```

## Approach

For each query, find the Lowest Common Ancestor (LCA) of the two nodes:
1. The distance from a to LCA + distance from b to LCA + 1 (for the extra edge)
2. In a complete binary tree, node i's parent is i/2
3. Use the binary representation or repeated division to find LCA

The cycle length = dist(a, LCA) + dist(b, LCA) + 1

## C# Solution

```csharp
public class Solution
{
    public int[] CycleLengthQueries(int n, int[][] queries)
    {
        int m = queries.Length;
        int[] result = new int[m];
        
        for (int i = 0; i < m; i++)
        {
            int a = queries[i][0];
            int b = queries[i][1];
            
            int distA = 0;
            int distB = 0;
            
            while (a != b)
            {
                if (a > b)
                {
                    a /= 2;
                    distA++;
                }
                else
                {
                    b /= 2;
                    distB++;
                }
            }
            
            result[i] = distA + distB + 1;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(m × log n) where m is the number of queries
- **Space:** O(1) excluding the output array
