# 353. Design Snake Game

**Difficulty:** Medium
**Category:** Array, Hash Table, Design, Simulation, Queue
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Design a Snake game that runs on an `width x height` screen, where food appears one piece at a time at given `food` positions. Implement the `SnakeGame` class with a `Move(direction)` method that moves the snake one step, growing it when it eats food, and returns the current score or `-1` if the game is over (the snake hits a wall or itself).

### Example

```
Input:
["SnakeGame", "move", "move", "move", "move", "move", "move"]
[[3, 2, [[1, 2], [0, 1]]], ["R"], ["D"], ["R"], ["U"], ["L"], ["U"]]
Output:
[null, 0, 0, 1, 1, 2, -1]
```

### Constraints

- `1 <= width, height <= 10^4`
- `1 <= food.length <= 50`

## Approach

Represent the snake's body as a doubly linked list (or deque) of coordinates, plus a hash set for O(1) collision checks. On each move, compute the new head position; if it's out of bounds, game over. If the new head doesn't land on the next food item, remove the tail first (since the snake doesn't grow) before checking for self-collision against the (now-shrunk) body, since the vacated tail cell is safe to move into. If it does land on food, keep the tail (the snake grows) and advance the food index.

## C# Solution

```csharp
public class SnakeGame
{
    private readonly int width, height;
    private readonly int[][] food;
    private int foodIndex = 0;
    private readonly LinkedList<(int Row, int Col)> snake = new();
    private readonly HashSet<(int Row, int Col)> snakeSet = new();
    private int score = 0;

    public SnakeGame(int width, int height, int[][] food)
    {
        this.width = width;
        this.height = height;
        this.food = food;

        snake.AddLast((0, 0));
        snakeSet.Add((0, 0));
    }

    public int Move(string direction)
    {
        var (headRow, headCol) = snake.Last.Value;
        int newRow = headRow, newCol = headCol;

        switch (direction)
        {
            case "U": newRow--; break;
            case "D": newRow++; break;
            case "L": newCol--; break;
            case "R": newCol++; break;
        }

        if (newRow < 0 || newRow >= height || newCol < 0 || newCol >= width)
            return -1;

        bool ateFood = foodIndex < food.Length && food[foodIndex][0] == newRow && food[foodIndex][1] == newCol;

        var tail = snake.Last.Value;
        if (!ateFood)
        {
            snake.RemoveLast();
            snakeSet.Remove(tail);
        }

        if (snakeSet.Contains((newRow, newCol)))
            return -1;

        snake.AddLast((newRow, newCol));
        snakeSet.Add((newRow, newCol));

        if (ateFood)
        {
            foodIndex++;
            score++;
        }

        return score;
    }
}
```

## Complexity

- **Time:** `O(1)` per `Move` call.
- **Space:** `O(n)` for the snake body, where `n` is the snake's current length.
