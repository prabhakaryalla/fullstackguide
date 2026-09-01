# 2127. Maximum Employees to Be Invited to a Meeting

**Difficulty:** Hard
**Category:** Array, Graph, Depth-First Search, Topological Sort

## Problem

Each employee has a favorite person. For a round table meeting, each employee must sit next to their favorite person. Return the maximum number of employees that can be invited.

### Example

```
Input: favorite = [2,2,1,2]
Output: 3
Explanation: Employees 0,1,2 can sit with arrangement [0,2,1].
```

## Approach

Model as a directed graph where edges point to favorites. Valid arrangements are cycles. Find all cycles and the longest chains leading into 2-cycles. The answer is either the longest cycle or the sum of all 2-cycles with their incoming chains.

## C# Solution

```csharp
public class Solution
{
    public int MaximumInvitations(int[] favorite)
    {
        int n = favorite.Length;
        int[] inDegree = new int[n];
        
        for (int i = 0; i < n; i++)
            inDegree[favorite[i]]++;
        
        var queue = new Queue<int>();
        for (int i = 0; i < n; i++)
            if (inDegree[i] == 0)
                queue.Enqueue(i);
        
        int[] depth = new int[n];
        while (queue.Count > 0)
        {
            int curr = queue.Dequeue();
            int next = favorite[curr];
            depth[next] = Math.Max(depth[next], depth[curr] + 1);
            if (--inDegree[next] == 0)
                queue.Enqueue(next);
        }
        
        int maxCycle = 0, sumTwoCycles = 0;
        bool[] visited = new bool[n];
        
        for (int i = 0; i < n; i++)
        {
            if (visited[i] || inDegree[i] == 0) continue;
            
            int len = 0, curr = i;
            while (!visited[curr])
            {
                visited[curr] = true;
                curr = favorite[curr];
                len++;
            }
            
            if (len == 2)
                sumTwoCycles += len + depth[i] + depth[favorite[i]];
            else
                maxCycle = Math.Max(maxCycle, len);
        }
        
        return Math.Max(maxCycle, sumTwoCycles);
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
