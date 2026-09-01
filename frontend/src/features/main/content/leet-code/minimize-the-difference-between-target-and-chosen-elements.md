# 1981. Minimize the Difference Between Target and Chosen Elements

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Matrix

## Problem

Given an `m x n` integer matrix `mat` and an integer `target`, choose exactly one element from each row to form a sum; return the minimum possible absolute difference between that sum and `target`.

### Example

```
Input: mat = [[1,2,3],[4,5,6],[7,8,9]], target = 13
Output: 0
Explanation: Choose 1, 5, 7 (or another combination) summing exactly to 13.
```

### Constraints

- `m == mat.length`
- `n == mat[i].length`
- `1 <= m, n <= 70`
- `1 <= mat[i][j] <= 70`
- `1 <= target <= 800`

## Approach

The maximum possible sum is `m * 70 <= 4900`. Use a boolean DP set: `possible` is the set of achievable sums using one element from each processed row so far, starting with `{0}`. For each row, compute a new set of achievable sums by adding each element of the row to each sum currently in `possible` (bounded to avoid unnecessary growth beyond, say, `2 * target` since sums far beyond target are only useful up to a point — but capping at the true max sum bound like 4900 is simplest and still efficient). After processing all rows, find the achievable sum closest to `target` and return the absolute difference.

## C# Solution

```csharp
public class Solution
{
    public int MinimizeTheDifference(int[][] mat, int target)
    {
        int m = mat.Length;
        int maxSum = m * 70;
        var possible = new bool[maxSum + 1];
        possible[0] = true;

        foreach (var row in mat)
        {
            var next = new bool[maxSum + 1];
            for (int s = 0; s <= maxSum; s++)
            {
                if (!possible[s]) continue;
                foreach (int value in row)
                {
                    int newSum = s + value;
                    if (newSum <= maxSum)
                    {
                        next[newSum] = true;
                    }
                }
            }
            possible = next;
        }

        int best = int.MaxValue;
        for (int s = 0; s <= maxSum; s++)
        {
            if (possible[s])
            {
                best = Math.Min(best, Math.Abs(s - target));
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(m * n * maxSum)` — for each row, updating the achievable-sum set.
- **Space:** `O(maxSum)` for the boolean achievable-sum arrays.
