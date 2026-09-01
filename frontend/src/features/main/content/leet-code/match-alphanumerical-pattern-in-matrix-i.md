# 3078. Match Alphanumerical Pattern in Matrix I

**Difficulty:** Medium
**Category:** Array, Hash Table, Matrix, String

## Problem

You are given an `m x n` integer matrix `board` of single digits, and a 2D pattern array `pattern` of strings, where each character is either a digit or a lowercase letter. A placement of the pattern at top-left corner `(x, y)` in `board` **matches** if every digit character in the pattern equals the corresponding board digit, and every letter in the pattern maps consistently to exactly one digit (and every occurrence of that digit maps back to that letter). Return the coordinates `[x, y]` of the first (any) matching top-left position in row-major order, or `[-1, -1]` if none exists.

## Approach

Brute-force every valid top-left position `(x, y)` for the pattern within the board's bounds, and for each position check whether it's a match. To check a match, maintain a bijection between digits and letters seen so far as you scan the pattern cell by cell; if a digit cell mismatches, or a letter maps inconsistently in either direction, the placement fails.

## C# Solution

```csharp
public class Solution {
    public int[] FindPattern(int[][] board, string[] pattern) {
        int boardRows = board.Length, boardCols = board[0].Length;
        int patRows = pattern.Length, patCols = pattern[0].Length;

        for (int x = 0; x <= boardRows - patRows; x++)
            for (int y = 0; y <= boardCols - patCols; y++)
                if (IsMatch(board, x, y, pattern))
                    return new[] { x, y };

        return new[] { -1, -1 };
    }

    private bool IsMatch(int[][] board, int x, int y, string[] pattern) {
        var digitToLetter = new Dictionary<int, char>();
        var letterToDigit = new Dictionary<char, int>();

        for (int i = 0; i < pattern.Length; i++) {
            for (int j = 0; j < pattern[i].Length; j++) {
                int digit = board[i + x][j + y];
                char c = pattern[i][j];
                if (char.IsDigit(c)) {
                    if (c - '0' != digit)
                        return false;
                } else {
                    if (digitToLetter.TryGetValue(digit, out char mappedLetter) && mappedLetter != c)
                        return false;
                    if (letterToDigit.TryGetValue(c, out int mappedDigit) && mappedDigit != digit)
                        return false;
                    digitToLetter[digit] = c;
                    letterToDigit[c] = digit;
                }
            }
        }

        return true;
    }
}
```

## Complexity

- Time: O(m * n * p * q) — for every top-left position, checking the p x q pattern.
- Space: O(p * q) — the digit/letter bijection maps.
