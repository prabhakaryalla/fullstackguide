# 2050. Parallel Courses III

**Difficulty:** Hard
**Category:** Dynamic Programming, Graph, Topological Sort

## Problem

You are given an integer `n` denoting the number of courses (numbered `1` to `n`), a 2D array `relations` where `relations[i] = [prevCourse, nextCourse]` means `prevCourse` must be completed before `nextCourse` can start, and an array `time` where `time[i]` is the number of months to complete course `i + 1`. You may take multiple courses at the same time, as long as their prerequisites are satisfied. Return *the minimum number of months needed to complete all courses*.

## Approach

This is a longest-path-in-a-DAG problem: a course can only start once all its prerequisites have finished, so `finishTime[course] = time[course] + max(finishTime[prereq] for all prereqs of course)` (or just `time[course]` if it has no prerequisites). Compute this with Kahn's algorithm (topological sort via in-degrees): initialize every course with in-degree `0` to `finishTime = time[course]` and enqueue it. Process the queue, and whenever we finish a course `u`, relax every successor `v`: `finishTime[v] = max(finishTime[v], finishTime[u] + time[v])`, decrementing `v`'s in-degree and enqueuing it once it reaches `0`. The answer is the maximum `finishTime` across all courses.

## C# Solution

```csharp
public class Solution
{
    public int MinimumTime(int n, int[][] relations, int[] time)
    {
        var adj = new List<int>[n + 1];
        var indegree = new int[n + 1];
        for (int i = 1; i <= n; i++) adj[i] = new List<int>();

        foreach (var rel in relations)
        {
            adj[rel[0]].Add(rel[1]);
            indegree[rel[1]]++;
        }

        var finishTime = new int[n + 1];
        var queue = new Queue<int>();
        for (int i = 1; i <= n; i++)
        {
            if (indegree[i] == 0)
            {
                finishTime[i] = time[i - 1];
                queue.Enqueue(i);
            }
        }

        int answer = 0;
        while (queue.Count > 0)
        {
            var u = queue.Dequeue();
            answer = Math.Max(answer, finishTime[u]);

            foreach (var v in adj[u])
            {
                finishTime[v] = Math.Max(finishTime[v], finishTime[u] + time[v - 1]);
                indegree[v]--;
                if (indegree[v] == 0)
                    queue.Enqueue(v);
            }
        }

        return answer;
    }
}
```

## Complexity

- **Time:** `O(n + relations.Length)`.
- **Space:** `O(n + relations.Length)` for the adjacency list and auxiliary arrays.
