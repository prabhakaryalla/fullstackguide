# 1072. Flip Columns For Maximum Number of Equal Rows

**Difficulty:** Medium
**Category:** Array, Hash Table, Matrix

## Problem

Given a binary matrix, choose any subset of columns and flip every value in those columns (0 becomes 1 and vice versa). Return the maximum number of rows that can be made to have all values equal after such a flip.

### Example

```
Input: matrix = [[0,1],[1,1]]
Output: 1
```

## Approach

Two rows can be made all-equal simultaneously by the same column flips exactly when one is the bitwise complement of the other (or identical to it) — because flipping columns is a single global operation applied to every row. XOR-ing each row with its own first element produces a canonical "pattern" that captures this relationship: rows needing the exact same flip set to become uniform share the same pattern. Count how many rows share each pattern and return the largest count.

## C# Solution

```csharp
public class Solution
{
    public int MaxEqualRowsAfterFlips(int[][] matrix)
    {
        var patternCounts = new Dictionary<string, int>();
        int best = 0;

        foreach (var row in matrix)
        {
            var pattern = new char[row.Length];
            for (int i = 0; i < row.Length; i++)
            {
                pattern[i] = (char)('0' + (row[i] ^ row[0]));
            }

            string key = new string(pattern);
            patternCounts.TryGetValue(key, out var count);
            count++;
            patternCounts[key] = count;
            best = Math.Max(best, count);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(rows * cols)` for the pattern keys.
