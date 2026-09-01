# 841. Keys and Rooms

**Difficulty:** Medium
**Category:** Depth-First Search, Breadth-First Search, Graph

## Problem

There are `n` rooms labeled `0` to `n-1`, each containing a list of keys to other rooms. Starting in room `0` (unlocked), return `true` if you can eventually visit every room.

### Example

```
Input: rooms = [[1],[2],[3],[]]
Output: true
```

## Approach

Perform a DFS (or BFS) starting from room `0`, treating each key found as an edge to another room. Track visited rooms to avoid revisiting, and count how many distinct rooms are reached. All rooms are visitable exactly when this count equals the total number of rooms.

## C# Solution

```csharp
public class Solution
{
    public bool CanVisitAllRooms(IList<IList<int>> rooms)
    {
        var visited = new bool[rooms.Count];
        var stack = new Stack<int>();
        stack.Push(0);
        visited[0] = true;
        int count = 1;

        while (stack.Count > 0)
        {
            var room = stack.Pop();

            foreach (var key in rooms[room])
            {
                if (!visited[key])
                {
                    visited[key] = true;
                    count++;
                    stack.Push(key);
                }
            }
        }

        return count == rooms.Count;
    }
}
```

## Complexity

- **Time:** `O(n + k)`, where `k` is the total number of keys.
- **Space:** `O(n)` for the visited array and stack.
