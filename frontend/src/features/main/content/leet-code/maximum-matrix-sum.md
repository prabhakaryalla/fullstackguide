# 1975. Maximum Matrix Sum

**Difficulty:** Medium
**Category:** Array, Greedy, Matrix

## Problem

Given an `n x n` integer matrix, you may repeatedly choose any two adjacent elements (sharing an edge) and multiply both by `-1`, any number of times. Return the maximum possible sum of all elements achievable.

### Example

```
Input: matrix = [[1,-1],[-1,1]]
Output: 4
Explanation: Negating any adjacent pair twice or choosing to negate a pair of already-negative numbers turns all entries into 1, giving sum 4.
```

### Constraints

- `n == matrix.length == matrix[i].length`
- `2 <= n <= 250`
- `-10^5 <= matrix[i][j] <= 10^5`

## Approach

Because any two adjacent cells' signs can be flipped together, and the grid is connected, the parity of the total count of negative numbers is the only real invariant (you can move a "negative" from one cell to any other connected cell by chaining adjacent-pair flips, effectively). Compute the sum of absolute values of all elements and the count of negative numbers (and check for a zero, which acts as a free sign-absorber). If the count of negatives is even, all values can become non-negative, so the answer is the sum of absolute values. If it's odd, one negative must remain unless there's a zero in the matrix (a zero has |value| 0 and can "absorb" the leftover negative sign at no cost) — otherwise subtract twice the smallest absolute value from the sum of absolute values.

## C# Solution

```csharp
public class Solution
{
    public long MaxMatrixSum(int[][] matrix)
    {
        int n = matrix.Length;
        long sumAbs = 0;
        int negativeCount = 0;
        long minAbs = long.MaxValue;
        bool hasZero = false;

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n; j++)
            {
                int value = matrix[i][j];
                if (value < 0) negativeCount++;
                if (value == 0) hasZero = true;

                long abs = Math.Abs((long)value);
                sumAbs += abs;
                minAbs = Math.Min(minAbs, abs);
            }
        }

        if (negativeCount % 2 == 0 || hasZero)
        {
            return sumAbs;
        }

        return sumAbs - 2 * minAbs;
    }
}
```

## Complexity

- **Time:** `O(n^2)` — a single pass over all matrix cells.
- **Space:** `O(1)`.
