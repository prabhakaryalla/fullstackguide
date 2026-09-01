# 1476. Subrectangle Queries

**Difficulty:** Medium
**Category:** Array, Design, Matrix

## Problem

Design a `SubrectangleQueries` class over an `m x n` `rectangle`, supporting: `UpdateSubrectangle(row1, col1, row2, col2, newValue)` — set every cell in that rectangle to `newValue`; `GetValue(row, col)` — return the current value at that cell. At most 500 updates will be performed.

### Example

```
Input: ["SubrectangleQueries","getValue","updateSubrectangle","getValue","getValue","updateSubrectangle","getValue"]
[[[[1,2,1],[4,3,4],[3,2,1],[1,1,1]]],[0,2],[0,0,3,2,5],[0,2],[3,1],[3,0,3,2,10],[3,1]]
Output: [null,1,null,5,5,null,10]
```

## Approach

Given the small update limit, avoid eagerly rewriting the grid on every update. Instead, log each update as a record. To answer `GetValue`, scan the update log from most recent to oldest and return the value of the first (most recent) update whose rectangle contains the queried cell; if none match, fall back to the original grid value.

## C# Solution

```csharp
public class SubrectangleQueries
{
    private readonly int[][] rectangle;
    private readonly List<(int Row1, int Col1, int Row2, int Col2, int Value)> updates = new();

    public SubrectangleQueries(int[][] rectangle)
    {
        this.rectangle = rectangle;
    }

    public void UpdateSubrectangle(int row1, int col1, int row2, int col2, int newValue)
    {
        updates.Add((row1, col1, row2, col2, newValue));
    }

    public int GetValue(int row, int col)
    {
        for (int i = updates.Count - 1; i >= 0; i--)
        {
            var (r1, c1, r2, c2, value) = updates[i];
            if (row >= r1 && row <= r2 && col >= c1 && col <= c2)
                return value;
        }

        return rectangle[row][col];
    }
}
```

## Complexity

- **Time:** `O(1)` per `UpdateSubrectangle`; `O(u)` per `GetValue`, where `u` is the number of updates so far.
- **Space:** `O(u)` for the update log.
