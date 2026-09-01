# 2392. Build a Matrix With Conditions

**Difficulty:** Hard
**Category:** Graph, Topological Sort, Array, Matrix

## Problem

You are given a positive integer `k`. You are also given:
- A 2D integer array `rowConditions` of size `n` where `rowConditions[i] = [above_i, below_i]`
- A 2D integer array `colConditions` of size `m` where `colConditions[i] = [left_i, right_i]`

The two arrays contain integers from `1` to `k`.

You have to build a `k x k` matrix that contains each of the numbers from `1` to `k` exactly once. The remaining cells should have the value `0`.

The matrix should also satisfy the following conditions:
- For every `[above, below]` in `rowConditions`, number `above` should appear in a row above the row where number `below` appears
- For every `[left, right]` in `colConditions`, number `left` should appear in a column left of the column where number `right` appears

Return any matrix that satisfies the conditions. If no such matrix exists, return an empty matrix.

### Example

```
Input: k = 3, rowConditions = [[1,2],[3,2]], colConditions = [[2,1],[3,2]]
Output: [[3,0,0],[0,0,1],[0,2,0]]
Explanation:
The diagram shows a valid example. Number 3 is in row 0, number 1 is in row 1, and number 2 is in row 2.
```

## Approach

This problem requires two independent topological sorts:
1. One for row ordering based on `rowConditions`
2. One for column ordering based on `colConditions`

If either topological sort fails (cycle detected), return an empty matrix.

After obtaining both orderings, place each number at the intersection of its row and column position.

## C# Solution

```csharp
public class Solution
{
    public int[][] BuildMatrix(int k, int[][] rowConditions, int[][] colConditions)
    {
        List<int> rowOrder = TopologicalSort(k, rowConditions);
        List<int> colOrder = TopologicalSort(k, colConditions);
        
        if (rowOrder.Count == 0 || colOrder.Count == 0)
            return new int[0][];
        
        int[][] matrix = new int[k][];
        for (int i = 0; i < k; i++)
            matrix[i] = new int[k];
        
        Dictionary<int, int> rowPos = new Dictionary<int, int>();
        Dictionary<int, int> colPos = new Dictionary<int, int>();
        
        for (int i = 0; i < k; i++)
        {
            rowPos[rowOrder[i]] = i;
            colPos[colOrder[i]] = i;
        }
        
        for (int num = 1; num <= k; num++)
        {
            matrix[rowPos[num]][colPos[num]] = num;
        }
        
        return matrix;
    }
    
    private List<int> TopologicalSort(int k, int[][] conditions)
    {
        Dictionary<int, List<int>> graph = new Dictionary<int, List<int>>();
        int[] indegree = new int[k + 1];
        
        for (int i = 1; i <= k; i++)
            graph[i] = new List<int>();
        
        foreach (var condition in conditions)
        {
            graph[condition[0]].Add(condition[1]);
            indegree[condition[1]]++;
        }
        
        Queue<int> queue = new Queue<int>();
        for (int i = 1; i <= k; i++)
        {
            if (indegree[i] == 0)
                queue.Enqueue(i);
        }
        
        List<int> result = new List<int>();
        
        while (queue.Count > 0)
        {
            int node = queue.Dequeue();
            result.Add(node);
            
            foreach (int neighbor in graph[node])
            {
                indegree[neighbor]--;
                if (indegree[neighbor] == 0)
                    queue.Enqueue(neighbor);
            }
        }
        
        return result.Count == k ? result : new List<int>();
    }
}
```

## Complexity

- **Time:** O(k + n + m) where n and m are the lengths of conditions arrays
- **Space:** O(k + n + m) for the graph and auxiliary data structures
