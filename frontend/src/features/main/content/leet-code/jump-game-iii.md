# 1306. Jump Game III

**Difficulty:** Medium
**Category:** Array, Depth-First Search, Breadth-First Search

## Problem

Given an array of non-negative integers `arr` and a `start` index, you may jump from index `i` to `i + arr[i]` or `i - arr[i]` (if within bounds). Return `true` if you can reach any index with value `0`.

### Example

```
Input: arr = [4,2,3,0,3,1,2], start = 5
Output: true
```

## Approach

Explore reachable indices with breadth-first search, marking visited indices to avoid revisiting. Stop and return `true` as soon as an index holding value `0` is reached; if the search exhausts all reachable indices without finding one, return `false`.

## C# Solution

```csharp
public class Solution
{
    public bool CanReach(int[] arr, int start)
    {
        int n = arr.Length;
        var visited = new bool[n];
        var queue = new Queue<int>();
        queue.Enqueue(start);
        visited[start] = true;

        while (queue.Count > 0)
        {
            int i = queue.Dequeue();
            if (arr[i] == 0) return true;

            foreach (int next in new[] { i + arr[i], i - arr[i] })
            {
                if (next >= 0 && next < n && !visited[next])
                {
                    visited[next] = true;
                    queue.Enqueue(next);
                }
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the visited array and queue.
