# 773. Sliding Puzzle

**Difficulty:** Hard
**Category:** Array, Breadth-First Search, Matrix

## Problem

Given a `2 x 3` board with tiles `1-5` and one empty slot `0`, where an adjacent tile can slide into the empty slot, return the minimum number of moves to reach the solved state `[[1,2,3],[4,5,0]]`, or `-1` if unsolvable.

### Example

```
Input: board = [[1,2,3],[4,0,5]]
Output: 1
```

## Approach

Flatten the board into a 6-character string and precompute, for each of the 6 positions, which other positions are adjacent (reachable by sliding). Perform a breadth-first search over string states: at each state, find the position of `'0'` and swap it with each adjacent tile to generate neighboring states, stopping as soon as the target string `"123450"` is reached.

## C# Solution

```csharp
public class Solution
{
    public int SlidingPuzzle(int[][] board)
    {
        string target = "123450";
        var start = string.Concat(board[0].Concat(board[1]).Select(x => x.ToString()));

        if (start == target) return 0;

        int[][] neighbors = {
            new[] { 1, 3 }, new[] { 0, 2, 4 }, new[] { 1, 5 },
            new[] { 0, 4 }, new[] { 1, 3, 5 }, new[] { 2, 4 }
        };

        var visited = new HashSet<string> { start };
        var queue = new Queue<string>();
        queue.Enqueue(start);
        int steps = 0;

        while (queue.Count > 0)
        {
            steps++;
            int size = queue.Count;

            for (int i = 0; i < size; i++)
            {
                var state = queue.Dequeue();
                int zeroIndex = state.IndexOf('0');

                foreach (var neighbor in neighbors[zeroIndex])
                {
                    var chars = state.ToCharArray();
                    (chars[zeroIndex], chars[neighbor]) = (chars[neighbor], chars[zeroIndex]);
                    var next = new string(chars);

                    if (next == target) return steps;

                    if (visited.Add(next))
                        queue.Enqueue(next);
                }
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(6!)` bounded state space.
- **Space:** `O(6!)` for the visited set and queue.
