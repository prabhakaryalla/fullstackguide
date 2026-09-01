# 251. Flatten 2D Vector

**Difficulty:** Medium
**Category:** Array, Two Pointers, Design, Iterator

## Problem

Design an iterator to flatten a 2D vector (a list of lists of integers). The iterator should support `HasNext()` and `Next()`, producing all elements from the nested lists in order, skipping empty inner lists.

### Example

```
Vector2D([[1,2],[3],[4]])
Next() -> 1, Next() -> 2, Next() -> 3, HasNext() -> true, Next() -> 4, HasNext() -> false
```

### Constraints

- `0 <= vec.length <= 200`
- `0 <= vec[i].length <= 500`

## Approach

Track a `row` and `col` cursor into the nested list. Before answering `HasNext()` or `Next()`, advance a helper that skips over any exhausted rows (rows where `col` has reached the row's length), moving to the next row and resetting `col` to zero. `HasNext()` returns whether, after skipping, the cursor still points at a valid element.

## C# Solution

```csharp
public class Vector2D
{
    private readonly IList<IList<int>> vec;
    private int row = 0;
    private int col = 0;

    public Vector2D(IList<IList<int>> vec)
    {
        this.vec = vec;
    }

    private void Advance()
    {
        while (row < vec.Count && col == vec[row].Count)
        {
            row++;
            col = 0;
        }
    }

    public bool HasNext()
    {
        Advance();
        return row < vec.Count;
    }

    public int Next()
    {
        Advance();
        return vec[row][col++];
    }
}
```

## Complexity

- **Time:** `O(1)` amortized per `Next()`/`HasNext()` call.
- **Space:** `O(1)` extra space beyond the input.
