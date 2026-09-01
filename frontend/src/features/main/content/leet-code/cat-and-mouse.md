# 913. Cat and Mouse

**Difficulty:** Hard
**Category:** Math, Dynamic Programming, Graph, Topological Sort, Memoization, Game Theory

## Problem

A game is played on an undirected `graph` where node `0` is a hole, the mouse starts at node `1`, and the cat starts at node `2`; the mouse moves first. The mouse wins by reaching the hole, the cat wins by catching the mouse, and it's a draw if the same state repeats. The cat can never move onto the hole. Return `1` if the mouse wins, `2` if the cat wins, or `0` for a draw.

### Example

```
Input: graph = [[2,5],[3],[0,4,5],[1,4,5],[2,3],[0,2,3]]
Output: 0
```

## Approach

Use retrograde analysis (a BFS from known terminal states backward). Any state where the mouse is at node `0` is a mouse win; any state where mouse and cat share a node is a cat win. Propagate these results backward: a predecessor state is decided immediately if the player to move *can* move into a winning state for them, and is decided once *all* of its moves lead to a loss (tracked via a remaining-degree counter) otherwise. States that are never resolved remain draws.

## C# Solution

```csharp
public class Solution
{
    private const int Draw = 0, MouseWin = 1, CatWin = 2;

    public int CatMouseGame(int[][] graph)
    {
        int n = graph.Length;
        var color = new int[n, n, 2];
        var degree = new int[n, n, 2];

        for (int mouse = 0; mouse < n; mouse++)
        {
            for (int cat = 1; cat < n; cat++)
            {
                degree[mouse, cat, 0] = graph[mouse].Length;
                degree[mouse, cat, 1] = graph[cat].Count(c => c != 0);
            }
        }

        var queue = new Queue<(int mouse, int cat, int turn)>();

        for (int cat = 1; cat < n; cat++)
        {
            for (int turn = 0; turn < 2; turn++)
            {
                color[0, cat, turn] = MouseWin;
                queue.Enqueue((0, cat, turn));
            }
        }

        for (int mouse = 0; mouse < n; mouse++)
        {
            for (int turn = 0; turn < 2; turn++)
            {
                color[mouse, mouse, turn] = CatWin;
                queue.Enqueue((mouse, mouse, turn));
            }
        }

        while (queue.Count > 0)
        {
            var (mouse, cat, turn) = queue.Dequeue();
            int result = color[mouse, cat, turn];
            int prevTurn = 1 - turn;

            if (prevTurn == 0)
            {
                foreach (var prevMouse in graph[mouse])
                {
                    if (color[prevMouse, cat, 0] != Draw) continue;

                    if (result == MouseWin)
                    {
                        color[prevMouse, cat, 0] = MouseWin;
                        queue.Enqueue((prevMouse, cat, 0));
                    }
                    else if (--degree[prevMouse, cat, 0] == 0)
                    {
                        color[prevMouse, cat, 0] = CatWin;
                        queue.Enqueue((prevMouse, cat, 0));
                    }
                }
            }
            else
            {
                foreach (var prevCat in graph[cat])
                {
                    if (prevCat == 0 || color[mouse, prevCat, 1] != Draw) continue;

                    if (result == CatWin)
                    {
                        color[mouse, prevCat, 1] = CatWin;
                        queue.Enqueue((mouse, prevCat, 1));
                    }
                    else if (--degree[mouse, prevCat, 1] == 0)
                    {
                        color[mouse, prevCat, 1] = MouseWin;
                        queue.Enqueue((mouse, prevCat, 1));
                    }
                }
            }
        }

        return color[1, 2, 0];
    }
}
```

## Complexity

- **Time:** `O(n^3)` states, each processed a constant number of times.
- **Space:** `O(n^2)` for the color/degree tables.
