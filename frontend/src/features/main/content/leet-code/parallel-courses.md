# 1136. Parallel Courses

**Difficulty:** Medium
**Category:** Graph, Topological Sort

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given `n` courses labeled `1` to `n` and a list of prerequisite `relations[i] = [prevCourse, nextCourse]`, where all courses in one semester can be taken simultaneously as long as their prerequisites are met, return the minimum number of semesters needed to complete all courses. Return `-1` if it's impossible due to a cycle.

### Example

```
Input: n = 3, relations = [[1,3],[2,3]]
Output: 2
```

## Approach

This is Kahn's algorithm (BFS topological sort) processed level by level. Build an adjacency list and in-degree count, then repeatedly dequeue every course with an in-degree of zero as one semester's batch, decrementing the in-degree of their dependents. Each full batch counts as one semester. If every course gets processed, the number of batches is the answer; otherwise a cycle exists and the answer is `-1`.

## C# Solution

```csharp
public class Solution
{
    public int MinimumSemesters(int n, int[][] relations)
    {
        var adj = new List<int>[n + 1];
        int[] indegree = new int[n + 1];
        for (int i = 1; i <= n; i++) adj[i] = new List<int>();

        foreach (var r in relations)
        {
            adj[r[0]].Add(r[1]);
            indegree[r[1]]++;
        }

        var queue = new Queue<int>();
        for (int i = 1; i <= n; i++)
        {
            if (indegree[i] == 0) queue.Enqueue(i);
        }

        int semesters = 0, studied = 0;

        while (queue.Count > 0)
        {
            int size = queue.Count;
            semesters++;

            for (int i = 0; i < size; i++)
            {
                int course = queue.Dequeue();
                studied++;

                foreach (var next in adj[course])
                {
                    if (--indegree[next] == 0) queue.Enqueue(next);
                }
            }
        }

        return studied == n ? semesters : -1;
    }
}
```

## Complexity

- **Time:** `O(V + E)`.
- **Space:** `O(V + E)`.
