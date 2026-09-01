# 2059. Minimum Operations to Convert Number

**Difficulty:** Medium
**Category:** Array, Breadth-First Search

## Problem

You are given a 0-indexed integer array `nums` containing distinct numbers, a `start`, and a `goal`. Starting from `start`, in each operation you may choose any `num` in `nums` and set the current value to `current + num`, `current - num`, or `current XOR num`. The current value must stay within `[0, 1000]` at all times (inclusive). Return *the minimum number of operations needed to reach `goal`*, or `-1` if impossible.

## Approach

Since the value is always constrained to `[0, 1000]`, this is a shortest-path problem over a small state space of `1001` possible values. Run a breadth-first search starting from `start`: at each state, try all three operations with each value in `nums`, and enqueue any resulting value in `[0, 1000]` that hasn't been visited yet. The first time `goal` is reached gives the minimum number of operations (BFS explores states in order of increasing operation count).

## C# Solution

```csharp
public class Solution
{
    public int MinimumOperations(int[] nums, int start, int goal)
    {
        if (start == goal) return 0;

        var visited = new bool[1001];
        var queue = new Queue<int>();
        queue.Enqueue(start);
        visited[start] = true;

        int steps = 0;
        while (queue.Count > 0)
        {
            steps++;
            int levelSize = queue.Count;

            for (int i = 0; i < levelSize; i++)
            {
                int cur = queue.Dequeue();

                foreach (var num in nums)
                {
                    foreach (var next in new[] { cur + num, cur - num, cur ^ num })
                    {
                        if (next == goal) return steps;

                        if (next >= 0 && next <= 1000 && !visited[next])
                        {
                            visited[next] = true;
                            queue.Enqueue(next);
                        }
                    }
                }
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(1001 * nums.Length)`, since each of the bounded states is processed at most once.
- **Space:** `O(1001)` for the visited array and queue.
