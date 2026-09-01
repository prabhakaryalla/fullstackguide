# 2013. Detect Squares

**Difficulty:** Medium
**Category:** Array, Hash Table, Design, Counting

## Problem

Design a data structure that supports adding new points and counting the number of ways to form an axis-aligned square with three given points already added, using a queried point as the fourth corner. Implement the `DetectSquares` class:

- `Add(int[] point)` — adds a new point (duplicates are allowed).
- `Count(int[] point)` — counts the number of squares with all four corners already added (via `Add`), using `point` as one corner. Duplicate points count each occurrence separately.

## Approach

Store points grouped by their `x` coordinate: a dictionary mapping `x -> (dictionary mapping y -> count)`. To add a point, increment the corresponding `(x, y)` bucket.

To count squares using the query point `(px, py)` as one corner: iterate over every other point `(px, y2)` sharing the same `x` coordinate (this is a candidate for the adjacent corner along the vertical side, with side length `|y2 - py|`). For each such point, the square could extend either left or right by `side` along the x-axis, giving two candidate `x2` values (`px + side` and `px - side`). If points exist at `(x2, py)` and `(x2, y2)`, the four corners `(px, py)`, `(px, y2)`, `(x2, py)`, `(x2, y2)` form a valid square, and we multiply the counts of the three existing points together (since duplicates each form a distinct combination).

## C# Solution

```csharp
public class DetectSquares
{
    private readonly Dictionary<int, Dictionary<int, int>> pointsByX = new();

    public void Add(int[] point)
    {
        int x = point[0], y = point[1];
        if (!pointsByX.TryGetValue(x, out var col))
        {
            col = new Dictionary<int, int>();
            pointsByX[x] = col;
        }
        col[y] = col.GetValueOrDefault(y) + 1;
    }

    public int Count(int[] point)
    {
        int px = point[0], py = point[1];
        if (!pointsByX.TryGetValue(px, out var col)) return 0;

        int total = 0;
        foreach (var (y2, c1) in col)
        {
            if (y2 == py) continue;
            int side = Math.Abs(y2 - py);

            foreach (var dx in new[] { side, -side })
            {
                int x2 = px + dx;
                if (!pointsByX.TryGetValue(x2, out var col2)) continue;
                if (!col2.TryGetValue(py, out var c2)) continue;
                if (!col2.TryGetValue(y2, out var c3)) continue;

                total += c1 * c2 * c3;
            }
        }

        return total;
    }
}
```

## Complexity

- **Time:** `Add` is `O(1)`. `Count` is `O(k)`, where `k` is the number of distinct points sharing the query's `x` coordinate.
- **Space:** `O(n)` for all stored points.
