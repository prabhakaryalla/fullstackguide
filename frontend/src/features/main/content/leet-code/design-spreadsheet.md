# 3484. Design Spreadsheet

**Difficulty:** Medium
**Category:** Design, Hash Table, String, Array

## Problem

A spreadsheet has a fixed number of rows and 26 columns labeled `'A'` to `'Z'`. Each cell is identified by a string like `"A1"` (column letter followed by a 1-indexed row number). Every cell initially holds the value `0`.

Implement the `Spreadsheet` class:

- `Spreadsheet(int rows)` initializes the spreadsheet with the given number of rows.
- `void SetCell(string cell, int value)` sets the value of the given cell.
- `void ResetCell(string cell)` resets the given cell back to `0`.
- `int GetValue(string formula)` evaluates a formula of the form `"=X+Y"`, where `X` and `Y` are each either a cell reference or a non-negative integer literal, and returns the resulting sum. A cell reference that was never set (or has been reset) evaluates to `0`.

### Example

```
Spreadsheet sheet = new Spreadsheet(3);
sheet.SetCell("A1", 2);
sheet.SetCell("B2", 3);
sheet.GetValue("=A1+B2"); // returns 5
sheet.ResetCell("A1");
sheet.GetValue("=A1+B2"); // returns 3
sheet.GetValue("=5+B2");  // returns 8
```

## Approach

Only cells that have been explicitly set need to be stored, so a `Dictionary<string, int>` mapping cell name to value is sufficient; `ResetCell` simply removes the key.

To evaluate a formula, strip the leading `=`, split on the single `+` sign, and resolve each operand: if the operand starts with a letter it is a cell reference (looked up in the dictionary, defaulting to `0`), otherwise it is parsed as an integer literal.

## C# Solution

```csharp
public class Spreadsheet 
{
    private readonly Dictionary<string, int> cells = new Dictionary<string, int>();

    public Spreadsheet(int rows)
    {
    }

    public void SetCell(string cell, int value)
    {
        cells[cell] = value;
    }

    public void ResetCell(string cell)
    {
        cells.Remove(cell);
    }

    public int GetValue(string formula)
    {
        string expr = formula.Substring(1);
        int plusIdx = expr.IndexOf('+');
        string left = expr.Substring(0, plusIdx);
        string right = expr.Substring(plusIdx + 1);
        return ResolveValue(left) + ResolveValue(right);
    }

    private int ResolveValue(string token)
    {
        if (char.IsLetter(token[0]))
        {
            return cells.TryGetValue(token, out int v) ? v : 0;
        }
        return int.Parse(token);
    }
}
```

## Complexity

- **Time:** O(1) for `SetCell`/`ResetCell`/`GetValue` (amortized dictionary operations plus constant-length formula parsing).
- **Space:** O(k) where k is the number of cells that have been set.
