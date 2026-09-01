# 1728. Cat and Mouse II

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Memoization, Matrix, Game Theory

## Problem

A mouse and a cat take turns moving on a grid (`'#'` wall, `'.'` floor, `'M'` mouse start, `'C'` cat start, `'F'` food), the mouse moving first. Each can jump up to `mouseJump`/`catJump` cells in a straight line per turn (without passing through walls). The cat wins if it catches the mouse or reaches the food first; the mouse wins if it reaches the food first. If the game exceeds `1000` total moves, it is a draw (mouse does not win). Return `true` if the mouse can force a win.

### Example

```
Input: grid = ["####F","#C...","M...."], catJump = 4, mouseJump = 4
Output: true
```

## Approach

Because the problem explicitly defines "more than 1000 moves" as a draw, a memoized minimax search over the state `(mousePosition, catPosition, turnNumber)` bounded at `1000` turns is exact, not just a heuristic: since the turn number strictly increases with every recursive call, there are no cycles and memoization simply avoids recomputation for the same state reached via different move orders. On the mouse's turn it wins if any reachable move lets it win; on the cat's turn the mouse only wins if every reachable move still lets it win.

## C# Solution

```csharp
public class Solution
{
    private static readonly int[] Dr = { -1, 1, 0, 0 };
    private static readonly int[] Dc = { 0, 0, -1, 1 };

    public bool CanMouseWin(string[] grid, int catJump, int mouseJump)
    {
        int rows = grid.Length, cols = grid[0].Length;
        int mouseStart = 0, catStart = 0, food = 0;

        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
            {
                char ch = grid[r][c];
                if (ch == 'M') mouseStart = r * cols + c;
                else if (ch == 'C') catStart = r * cols + c;
                else if (ch == 'F') food = r * cols + c;
            }

        const int MaxTurns = 1000;
        var memo = new Dictionary<(int mouse, int cat, int turn), bool>();

        bool Dfs(int mouse, int cat, int turn)
        {
            if (mouse == cat) return false;
            if (mouse == food) return true;
            if (cat == food) return false;
            if (turn >= MaxTurns) return false;

            var key = (mouse, cat, turn);
            if (memo.TryGetValue(key, out bool cached)) return cached;

            bool isMouseTurn = turn % 2 == 0;
            int pos = isMouseTurn ? mouse : cat;
            int row = pos / cols, col = pos % cols;
            int jump = isMouseTurn ? mouseJump : catJump;

            var moves = new List<int> { pos };
            for (int d = 0; d < 4; d++)
            {
                for (int j = 1; j <= jump; j++)
                {
                    int nr = row + Dr[d] * j, nc = col + Dc[d] * j;
                    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || grid[nr][nc] == '#') break;
                    moves.Add(nr * cols + nc);
                }
            }

            bool result;
            if (isMouseTurn)
            {
                result = false;
                foreach (int next in moves)
                    if (Dfs(next, cat, turn + 1)) { result = true; break; }
            }
            else
            {
                result = true;
                foreach (int next in moves)
                    if (!Dfs(mouse, next, turn + 1)) { result = false; break; }
            }

            memo[key] = result;
            return result;
        }

        return Dfs(mouseStart, catStart, 0);
    }
}
```

## Complexity

- **Time:** `O((rows * cols)^2 * 1000)` states, each doing `O(jump)` work.
- **Space:** `O((rows * cols)^2 * 1000)` for the memo table in the worst case.
