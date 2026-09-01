# 1659. Maximize Grid Happiness

**Difficulty:** Hard
**Category:** Dynamic Programming, Bitmask

## Problem

Given an `m x n` grid, place `introvertsCount` introverts (base happiness `120`, `-30` per adjacent occupied neighbor) and `extrovertsCount` extroverts (base happiness `40`, `+20` per adjacent occupied neighbor) into distinct cells (cells may also stay empty) to maximize total happiness.

### Example

```
Input: m = 2, n = 3, introvertsCount = 1, extrovertsCount = 2
Output: 240
```

## Approach

Process cells in row-major order, maintaining a base-3 encoded "sliding window" state of the last `n` placements (0 = empty, 1 = introvert, 2 = extrovert): this window's oldest digit is exactly the cell directly above the current cell, and its newest digit is the cell directly to the left. At each cell, try leaving it empty, placing an introvert, or placing an extrovert (whichever remain), adding the corresponding happiness delta for interactions with the up/left neighbors already placed, and memoize on `(cellIndex, windowState, introvertsLeft, extrovertsLeft)`.

## C# Solution

```csharp
public class Solution
{
    private int rows;
    private int cols;
    private int[] pow3;
    private Dictionary<long, int> memo;

    public int GetMaxGridHappiness(int m, int n, int introvertsCount, int extrovertsCount)
    {
        rows = m;
        cols = n;
        pow3 = new int[cols + 1];
        pow3[0] = 1;

        for (int i = 1; i <= cols; i++)
        {
            pow3[i] = pow3[i - 1] * 3;
        }

        memo = new Dictionary<long, int>();

        return Solve(0, 0, introvertsCount, extrovertsCount);
    }

    private int Solve(int index, int mask, int introverts, int extroverts)
    {
        if (index == rows * cols || (introverts == 0 && extroverts == 0))
        {
            return 0;
        }

        long key = ((long)index * pow3[cols] + mask) * 49 + introverts * 7 + extroverts;

        if (memo.TryGetValue(key, out int cached))
        {
            return cached;
        }

        int col = index % cols;
        int upType = (mask / pow3[cols - 1]) % 3;
        int leftType = col == 0 ? 0 : mask % 3;
        int shifted = (mask % pow3[cols - 1]) * 3;

        int best = Solve(index + 1, shifted, introverts, extroverts);

        if (introverts > 0)
        {
            int value = 120 + Neighbor(upType, 1) + Neighbor(leftType, 1);
            best = Math.Max(best, value + Solve(index + 1, shifted + 1, introverts - 1, extroverts));
        }

        if (extroverts > 0)
        {
            int value = 40 + Neighbor(upType, 2) + Neighbor(leftType, 2);
            best = Math.Max(best, value + Solve(index + 1, shifted + 2, introverts, extroverts - 1));
        }

        memo[key] = best;
        return best;
    }

    private int Neighbor(int neighborType, int currentType)
    {
        if (neighborType == 0)
        {
            return 0;
        }

        int delta = currentType == 1 ? -30 : 20;
        delta += neighborType == 1 ? -30 : 20;
        return delta;
    }
}
```

## Complexity

- **Time:** `O(rows * cols * 3^cols * introvertsCount * extrovertsCount)` distinct memoized states.
- **Space:** Same bound, for the memoization cache.
