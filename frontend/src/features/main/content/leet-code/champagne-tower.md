# 799. Champagne Tower

**Difficulty:** Medium
**Category:** Dynamic Programming

## Problem

A champagne tower has 100 rows of glasses stacked in a triangle; row `r` has `r + 1` glasses. `poured` glasses are poured into the top glass; any excess over a glass's capacity of 1 splits equally into the two glasses below it. Return how full the glass at `(queryRow, queryGlass)` is (capped at `1.0`).

### Example

```
Input: poured = 2, queryRow = 1, queryGlass = 1
Output: 0.50000
```

## Approach

Simulate the pouring row by row using a 2D array representing the amount poured into (not necessarily held by) each glass. Starting with the full `poured` amount at the top, for each glass compute how much overflows (anything above `1.0`, split in half), and add that overflow to the two glasses below it in the next row. The final amount held by any glass is capped at `1.0` when returned.

## C# Solution

```csharp
public class Solution
{
    public double ChampagneTower(int poured, int queryRow, int queryGlass)
    {
        var tower = new double[queryRow + 2][];
        for (int i = 0; i <= queryRow + 1; i++)
            tower[i] = new double[i + 1];

        tower[0][0] = poured;

        for (int row = 0; row <= queryRow; row++)
        {
            for (int glass = 0; glass <= row; glass++)
            {
                double excess = (tower[row][glass] - 1.0) / 2.0;

                if (excess > 0)
                {
                    tower[row + 1][glass] += excess;
                    tower[row + 1][glass + 1] += excess;
                }
            }
        }

        return Math.Min(1.0, tower[queryRow][queryGlass]);
    }
}
```

## Complexity

- **Time:** `O(queryRow^2)`.
- **Space:** `O(queryRow^2)` for the tower array.
