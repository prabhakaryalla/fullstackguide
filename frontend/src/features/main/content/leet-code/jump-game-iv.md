# 1345. Jump Game IV

**Difficulty:** Hard
**Category:** Array, Breadth-First Search

## Problem

Given an array `arr`, starting at index `0`, you may jump to `i + 1`, `i - 1`, or any index `j` with `arr[j] == arr[i]`. Return the minimum number of jumps to reach the last index.

### Example

```
Input: arr = [100,-23,-23,404,100,23,23,23,3,404]
Output: 3
```

## Approach

Run a breadth-first search over indices, using a value-to-indices map to jump between equal values in one step. Once a value's group has been fully explored from some index, clear that group from the map so it isn't re-processed on later, unnecessary visits — this keeps the search linear despite many equal-valued indices.

## C# Solution

```csharp
public class Solution
{
    public int MinJumps(int[] arr)
    {
        int n = arr.Length;
        if (n == 1) return 0;

        var byValue = new Dictionary<int, List<int>>();
        for (int i = 0; i < n; i++)
        {
            if (!byValue.ContainsKey(arr[i])) byValue[arr[i]] = new List<int>();
            byValue[arr[i]].Add(i);
        }

        var visited = new bool[n];
        visited[0] = true;
        var queue = new Queue<int>();
        queue.Enqueue(0);
        int steps = 0;

        while (queue.Count > 0)
        {
            int size = queue.Count;
            for (int s = 0; s < size; s++)
            {
                int i = queue.Dequeue();
                if (i == n - 1) return steps;

                if (byValue.TryGetValue(arr[i], out var group))
                {
                    foreach (int j in group)
                    {
                        if (!visited[j])
                        {
                            visited[j] = true;
                            queue.Enqueue(j);
                        }
                    }
                    byValue.Remove(arr[i]);
                }

                foreach (int j in new[] { i - 1, i + 1 })
                {
                    if (j >= 0 && j < n && !visited[j])
                    {
                        visited[j] = true;
                        queue.Enqueue(j);
                    }
                }
            }
            steps++;
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the value map and visited array.
