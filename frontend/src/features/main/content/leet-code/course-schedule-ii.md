# 210. Course Schedule II

**Difficulty:** Medium
**Category:** Depth-First Search, Breadth-First Search, Graph, Topological Sort

## Problem

There are `numCourses` courses labeled `0` to `numCourses - 1`. Given prerequisite pairs `[a, b]` meaning course `b` must be taken before course `a`, return a valid order in which to take all courses, or an empty array if it's impossible (a cycle exists).

### Example

```
numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]] -> [0,1,2,3] (one valid order)
```

## Approach

Same Kahn's algorithm as Course Schedule, but instead of just checking feasibility, record each course as it's dequeued — that recorded sequence is a valid topological order. If not all courses get processed (a cycle blocks some of them), return an empty array instead.

## C# Solution

```csharp
public class Solution
{
    public int[] FindOrder(int numCourses, int[][] prerequisites)
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

        var order = new int[numCourses];
        int index = 0;

        while (queue.Count > 0)
        {
            int course = queue.Dequeue();
            order[index++] = course;

            foreach (var next in adjacency[course])
            {
                if (--inDegree[next] == 0) queue.Enqueue(next);
            }
        }

        return index == numCourses ? order : Array.Empty<int>();
    }
}
```

## Complexity

- **Time:** `O(V + E)` — every course and prerequisite edge is processed once.
- **Space:** `O(V + E)` — for the adjacency list and in-degree array.
