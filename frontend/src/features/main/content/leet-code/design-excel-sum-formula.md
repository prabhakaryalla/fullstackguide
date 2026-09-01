# 631. Design Excel Sum Formula

**Difficulty:** Hard
**Category:** Array, Hash Table, Design, Graph, Topological Sort
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Design an Excel-like spreadsheet supporting `Set(row, column, val)` (assigns a raw value, clearing any formula), `Get(row, column)` (returns the current value), and `Sum(row, column, numbers)` (assigns the cell to the sum of a list of cells and/or cell ranges, and returns that sum).

### Example

```
Input:
["Excel", "set", "sum", "set", "get"]
[[3, "C"], [1, "A", 2], [1, "B", ["A1", "A1:B2"]], [2, "B", 2], [1, "B"]]
Output:
[null, null, 4, null, 6]
```

## Approach

Store raw cell values in a 2D array, and separately track which cells hold a `Sum` formula along with the list of referenced cells/ranges that formula depends on. `Get` on a formula cell recursively sums the current values of every referenced cell (recursively resolving any of *those* cells that are themselves formulas), naturally propagating updates without needing to eagerly recompute dependents when a raw value changes. Cell ranges (e.g., `"A1:B2"`) are expanded into their individual cell references when the formula is first set.

## C# Solution

```csharp
public class Excel
{
    private readonly int[,] values;
    private readonly Dictionary<(int Row, char Col), (int Row, char Col)[]> formulas = new();

    public Excel(int height, char width)
    {
        values = new int[height + 1, width - 'A' + 1];
    }

    public void Set(int row, char column, int val)
    {
        formulas.Remove((row, column));
        values[row, column - 'A'] = val;
    }

    public int Get(int row, char column)
    {
        if (formulas.TryGetValue((row, column), out var cells))
            return Sum(row, column, cells);

        return values[row, column - 'A'];
    }

    public int Sum(int row, char column, string[] numbers)
    {
        var cells = ParseCells(numbers);
        formulas[(row, column)] = cells;
        int total = Sum(row, column, cells);
        values[row, column - 'A'] = total;
        return total;
    }

    private int Sum(int row, char column, (int Row, char Col)[] cells)
    {
        int total = 0;
        foreach (var (cellRow, cellCol) in cells)
            total += Get(cellRow, cellCol);

        return total;
    }

    private (int, char)[] ParseCells(string[] numbers)
    {
        var result = new List<(int, char)>();

        foreach (var token in numbers)
        {
            if (token.Contains(':'))
            {
                var parts = token.Split(':');
                var (startRow, startCol) = ParseCell(parts[0]);
                var (endRow, endCol) = ParseCell(parts[1]);

                for (int r = startRow; r <= endRow; r++)
                    for (char c = startCol; c <= endCol; c++)
                        result.Add((r, c));
            }
            else
            {
                result.Add(ParseCell(token));
            }
        }

        return result.ToArray();
    }

    private (int Row, char Col) ParseCell(string cell)
    {
        char col = cell[0];
        int row = int.Parse(cell.Substring(1));
        return (row, col);
    }
}
```

## Complexity

- **Time:** `O(cells referenced)` per `Get` or `Sum` call, assuming no circular references.
- **Space:** `O(rows * cols)` for the values grid and formula map.
