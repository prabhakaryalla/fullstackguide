# 207. Course Schedule

**Difficulty:** Medium
**Category:** Depth-First Search, Breadth-First Search, Graph, Topological Sort

## Problem

There are `numCourses` courses labeled `0` to `numCourses - 1`. Given a list of prerequisite pairs `[a, b]` meaning course `b` must be taken before course `a`, determine whether it's possible to finish all courses.

### Example

```
numCourses = 2, prerequisites = [[1,0]] -> true
numCourses = 2, prerequisites = [[1,0],[0,1]] -> false (cycle)
```

## Approach

This is cycle detection in a directed graph: all courses can be finished if and only if the prerequisite graph has no cycle. Use Kahn's algorithm (BFS topological sort): compute each course's in-degree, start a queue with all in-degree-zero courses, and repeatedly remove a course and decrement its dependents' in-degrees, enqueuing any that drop to zero. If every course gets processed this way, there's no cycle.

## C# Solution

```csharp
public class Solution
{
    public bool CanFinish(int numCourses, int[][] prerequisites)
    {
        var adjacency = new List<int>[numCourses];
        var inDegree = new int[numCourses];

        for (int i = 0; i < numCourses; i++) adjacency[i] = new List<int>();

        foreach (var pair in prerequisites)
        {
            int course = pair[0], prereq = pair[1];
            adjacency[prereq].Add(course);
            inDegree[course]++;
        }

        var queue = new Queue<int>();
        for (int i = 0; i < numCourses; i++)
        {
            if (inDegree[i] == 0) queue.Enqueue(i);
        }

        int processed = 0;

        while (queue.Count > 0)
        {
            int course = queue.Dequeue();
            processed++;

            foreach (var next in adjacency[course])
            {
                if (--inDegree[next] == 0) queue.Enqueue(next);
            }
        }

        return processed == numCourses;
    }
}
```

## Complexity

- **Time:** `O(V + E)` — every course and prerequisite edge is processed once.
- **Space:** `O(V + E)` — for the adjacency list and in-degree array.
