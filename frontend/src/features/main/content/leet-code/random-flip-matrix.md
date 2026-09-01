# 519. Random Flip Matrix

**Difficulty:** Medium
**Category:** Hash Table, Math, Randomization
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the dimensions `m x n` of a binary matrix (all zeros initially), implement `Flip()`, which chooses a uniformly random `0` cell, flips it to `1`, and returns its coordinates, and `Reset()`, which resets the matrix to all zeros.

### Example

```
Input:
["Solution", "flip", "flip", "flip", "reset", "flip"]
[[3, 1], [], [], [], [], []]
Output:
[null, [1, 0], [2, 0], [0, 0], null, [2, 0]] (values may vary)
```

### Constraints

- `1 <= m, n <= 10^4`
- At most `1000` calls total to `Flip` and `Reset`.

## Approach

Avoid materializing the full `m x n` grid by treating unflipped cells as indices `0` to `remaining - 1` in a virtual array, using the classic "swap with the last element" trick via a sparse map. To flip, pick a uniformly random index in `[0, remaining)`; if that index was previously remapped (via a prior swap), use its remapped value as the actual cell, otherwise use the index directly. Then conceptually swap that slot with the last remaining slot by recording the mapping, and shrink `remaining` by one.

## C# Solution

```csharp
public class Solution
{
    private readonly int rows, cols;
    private int remaining;
    private readonly Dictionary<int, int> mapping = new();
    private readonly Random random = new();

    public Solution(int m, int n)
    {
        rows = m;
        cols = n;
        remaining = m * n;
    }

    public int[] Flip()
    {
        int randomIndex = random.Next(remaining);
        int actualIndex = mapping.GetValueOrDefault(randomIndex, randomIndex);

        remaining--;
        mapping[randomIndex] = mapping.GetValueOrDefault(remaining, remaining);

        return new[] { actualIndex / cols, actualIndex % cols };
    }

    public void Reset()
    {
        remaining = rows * cols;
        mapping.Clear();
    }
}
```

## Complexity

- **Time:** `O(1)` amortized per `Flip` call, `O(1)` per `Reset`.
- **Space:** `O(min(flips, m * n))` for the mapping.
