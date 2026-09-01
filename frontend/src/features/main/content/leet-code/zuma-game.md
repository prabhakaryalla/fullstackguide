# 488. Zuma Game

**Difficulty:** Hard
**Category:** Hash Table, String, Breadth-First Search, Memoization

## Problem

Given a string `board` representing balls on a Zuma-style row, and a string `hand` of balls you can insert one at a time, return the minimum number of balls needed to clear the entire board (any run of 3 or more same-colored consecutive balls is removed automatically, which may chain). Return `-1` if impossible.

### Example

```
Input: board = "WRRBBW", hand = "RB"
Output: -1
```

### Constraints

- `1 <= board.length <= 16`
- `1 <= hand.length <= 5`
- Both strings consist of characters `'R'`, `'Y'`, `'B'`, `'G'`, `'W'` only.

## Approach

Sort the hand so identical colors are grouped, which allows skipping duplicate insertions at the same recursion branch to avoid redundant work. Recursively try inserting each distinct available ball at every valid position in the board, removing any resulting runs of 3+ (which may cascade), and memoize results keyed by the current board and remaining hand to avoid recomputation. The answer is the minimum number of insertions across all successful paths that empty the board, or `-1` if none succeed.

## C# Solution

```csharp
public class Solution
{
    public int FindMinStep(string board, string hand)
    {
        var handChars = hand.ToCharArray();
        Array.Sort(handChars);

        var memo = new Dictionary<string, int>();
        int result = Dfs(board, new string(handChars), memo);
        return result == int.MaxValue ? -1 : result;
    }

    private int Dfs(string board, string hand, Dictionary<string, int> memo)
    {
        if (board.Length == 0) return 0;
        if (hand.Length == 0) return int.MaxValue;

        var key = board + "#" + hand;
        if (memo.TryGetValue(key, out var cached)) return cached;

        int best = int.MaxValue;

        for (int i = 0; i < hand.Length; i++)
        {
            if (i > 0 && hand[i] == hand[i - 1]) continue;

            for (int j = 0; j <= board.Length; j++)
            {
                if (j > 0 && j < board.Length && board[j - 1] == board[j] && board[j] != hand[i]) continue;

                var newBoard = RemoveConsecutive(board.Insert(j, hand[i].ToString()));
                var newHand = hand.Remove(i, 1);

                int subResult = Dfs(newBoard, newHand, memo);
                if (subResult != int.MaxValue)
                    best = Math.Min(best, subResult + 1);
            }
        }

        memo[key] = best;
        return best;
    }

    private string RemoveConsecutive(string board)
    {
        int start = 0;

        while (start < board.Length)
        {
            int end = start;
            while (end < board.Length && board[end] == board[start])
                end++;

            if (end - start >= 3)
                return RemoveConsecutive(board.Remove(start, end - start));

            start = end;
        }

        return board;
    }
}
```

## Complexity

- **Time:** Exponential in the worst case, but bounded in practice by the small limits on `board` and `hand` lengths, aided by memoization.
- **Space:** `O(states)` for the memoization cache.
