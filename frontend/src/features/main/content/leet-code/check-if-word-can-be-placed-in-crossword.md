# 2018. Check if Word Can Be Placed In Crossword

**Difficulty:** Medium
**Category:** Array, String, Matrix, Enumeration

## Problem

Given an `m x n` character matrix `board` representing a crossword, where `'#'` marks blocked cells, `' '` marks empty cells, and uppercase letters mark cells already filled in, and a string `word`, determine whether `word` can be placed in the crossword. A placement is valid if there is a maximal run of non-`'#'` cells (bounded by `'#'` cells or the grid edge), either horizontally left-to-right or vertically top-to-bottom, whose length exactly equals `word.Length`, and every cell in that run is either empty or already matches the corresponding character of `word` read in that direction (the word may also be placed reversed).

## Approach

For every row, split it into maximal runs of non-`'#'` cells. If a run's length matches `word.Length`, check whether the run matches `word` forward or `word` reversed, allowing empty cells (`' '`) to match anything. Repeat the same scan column by column for vertical placements. Return `true` as soon as any valid placement is found.

## C# Solution

```csharp
public class Solution
{
    public bool PlaceWordInCrossword(char[][] board, string word)
    {
        int rows = board.Length, cols = board[0].Length;
        string reversed = new string(word.Reverse().ToArray());

        for (int r = 0; r < rows; r++)
        {
            int c = 0;
            while (c < cols)
            {
                if (board[r][c] == '#') { c++; continue; }
                int start = c;
                while (c < cols && board[r][c] != '#') c++;

                int len = c - start;
                if (len == word.Length &&
                    (Matches(board, r, start, 0, 1, word) || Matches(board, r, start, 0, 1, reversed)))
                    return true;
            }
        }

        for (int c = 0; c < cols; c++)
        {
            int r = 0;
            while (r < rows)
            {
                if (board[r][c] == '#') { r++; continue; }
                int start = r;
                while (r < rows && board[r][c] != '#') r++;

                int len = r - start;
                if (len == word.Length &&
                    (Matches(board, start, c, 1, 0, word) || Matches(board, start, c, 1, 0, reversed)))
                    return true;
            }
        }

        return false;
    }

    private bool Matches(char[][] board, int r, int c, int dr, int dc, string word)
    {
        for (int i = 0; i < word.Length; i++)
        {
            char cell = board[r + i * dr][c + i * dc];
            if (cell != ' ' && cell != word[i]) return false;
        }
        return true;
    }
}
```

## Complexity

- **Time:** `O(m * n)` to scan every row and column once.
- **Space:** `O(word.Length)` for the reversed string.
