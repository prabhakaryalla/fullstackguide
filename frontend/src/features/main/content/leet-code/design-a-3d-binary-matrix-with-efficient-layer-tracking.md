# 3391. Design a 3D Binary Matrix with Efficient Layer Tracking

**Difficulty:** Medium
**Category:** Design, Hash Table, Ordered Set
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Design a data structure that represents an `n x n x n` 3D binary matrix (all cells initially `0`), where the first coordinate `x` selects one of `n` "layers" (each an `n x n` 2D binary matrix), and supports:

- `Matrix3D(int n)`: initializes the structure.
- `void SetCell(int x, int y, int z)`: sets the value at `(x, y, z)` to `1`.
- `void UnsetCell(int x, int y, int z)`: sets the value at `(x, y, z)` to `0`.
- `int LargestMatrix()`: returns the index `x` of the layer that currently has the maximum number of `1`s set. If multiple layers tie for the maximum count, return the largest such index.

## Approach
Maintain a `count[x]` array tracking how many cells are currently set within layer `x`. `SetCell`/`UnsetCell` toggle the underlying 3D boolean array and adjust `count[x]` by 1 (no-op if the cell is already in the requested state, to keep the count accurate).

To answer `LargestMatrix()` in better than `O(n)`, keep a sorted set of `(count[x], x)` pairs. Because tuple comparison in a sorted set orders first by `count`, then by `x`, the maximum element of the set is exactly the layer with the highest count, with ties broken toward the larger `x` -- precisely the required tie-break rule. Each `SetCell`/`UnsetCell` call removes the stale pair for its layer and reinserts the updated one, which costs `O(log n)`, and `LargestMatrix()` simply reads the set's maximum in `O(log n)`.

## C# Solution

```csharp
public class Matrix3D 
{
    private readonly bool[,,] isSet;
    private readonly int[] count;
    private readonly SortedSet<(int Count, int X)> countsByLayer;

    public Matrix3D(int n)
    {
        isSet = new bool[n, n, n];
        count = new int[n];
        countsByLayer = new SortedSet<(int, int)>();
        for (int x = 0; x < n; x++)
            countsByLayer.Add((0, x));
    }

    public void SetCell(int x, int y, int z)
    {
        if (isSet[x, y, z])
            return;
        isSet[x, y, z] = true;
        countsByLayer.Remove((count[x], x));
        countsByLayer.Add((++count[x], x));
    }

    public void UnsetCell(int x, int y, int z)
    {
        if (!isSet[x, y, z])
            return;
        isSet[x, y, z] = false;
        countsByLayer.Remove((count[x], x));
        countsByLayer.Add((--count[x], x));
    }

    public int LargestMatrix()
    {
        return countsByLayer.Max.X;
    }
}
```

## Complexity

- **Time:** Constructor O(n log n); `SetCell`/`UnsetCell` O(log n); `LargestMatrix` O(log n).
- **Space:** O(n^3) for the underlying cell grid, O(n) for the auxiliary structures.
