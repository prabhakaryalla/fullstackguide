# 1138. Alphabet Board Path

**Difficulty:** Medium
**Category:** Hash Table, String

## Problem

An alphabet board is laid out as rows `"abcde"`, `"fghij"`, `"klmno"`, `"pqrst"`, `"uvwxy"`, `"z"`, with the pointer starting at `'a'`. Given a `target` string, return a sequence of moves (`U`, `D`, `L`, `R`) and `!` (to select the current letter) that spells out `target` with the fewest characters possible (any valid sequence is accepted).

### Example

```
Input: target = "leet"
Output: "DDR!UURRR!!DDD!"
```

## Approach

Compute each letter's `(row, col)` position from its alphabet index (`row = index / 5`, `col = index % 5`). For each target letter, move from the current position to the new one, but always move `Left` before `Down` and `Up` before `Right`. This specific ordering guarantees the path never tries to step into a non-existent cell around `'z'`, which is the lone letter in the last row.

## C# Solution

```csharp
public class Solution
{
    public string AlphabetBoardPath(string target)
    {
        var sb = new StringBuilder();
        int curRow = 0, curCol = 0;

        foreach (char c in target)
        {
            int index = c - 'a';
            int row = index / 5, col = index % 5;

            if (col < curCol) sb.Append(new string('L', curCol - col));
            if (row < curRow) sb.Append(new string('U', curRow - row));
            if (row > curRow) sb.Append(new string('D', row - curRow));
            if (col > curCol) sb.Append(new string('R', col - curCol));

            sb.Append('!');
            curRow = row;
            curCol = col;
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the length of `target`.
- **Space:** `O(n)` for the output string.
