# 351. Android Unlock Patterns

**Difficulty:** Medium
**Category:** Dynamic Programming, Backtracking
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an Android 3x3 unlock pattern grid (dots numbered 1-9), and integers `m` and `n`, return the number of unique valid unlock patterns with a length between `m` and `n` inclusive. A pattern may not reuse a dot, and jumping over an unvisited dot to reach the next one is only allowed if that intermediate dot lies exactly between them and has already been visited.

### Example

```
Input: m = 1, n = 1
Output: 9
```

### Constraints

- `1 <= m, n <= 9`

## Approach

Precompute, for every pair of dots, which intermediate dot (if any) lies directly between them (e.g., dot 5 lies between 1 and 9). Use backtracking starting from every possible first dot, extending the current pattern to any unvisited next dot as long as either there is no intermediate dot in the way, or that intermediate dot has already been visited. Count a valid pattern each time its length falls within `[m, n]`, continuing to extend as long as length is below `n`.

## C# Solution

```csharp
public class Solution
{
    private readonly int[,] skip = new int[10, 10];

    public int NumberOfPatterns(int m, int n)
    {
        SetupSkip();

        var visited = new bool[10];
        int count = 0;

        for (int start = 1; start <= 9; start++)
        {
            count += Backtrack(start, 1, m, n, visited);
        }

        return count;
    }

    private void SetupSkip()
    {
        skip[1, 3] = skip[3, 1] = 2;
        skip[1, 7] = skip[7, 1] = 4;
        skip[3, 9] = skip[9, 3] = 6;
        skip[7, 9] = skip[9, 7] = 8;
        skip[1, 9] = skip[9, 1] = 5;
        skip[3, 7] = skip[7, 3] = 5;
        skip[2, 8] = skip[8, 2] = 5;
        skip[4, 6] = skip[6, 4] = 5;
    }

    private int Backtrack(int current, int length, int m, int n, bool[] visited)
    {
        visited[current] = true;
        int count = 0;

        if (length >= m) count++;

        if (length < n)
        {
            for (int next = 1; next <= 9; next++)
            {
                if (visited[next]) continue;

                int between = skip[current, next];
                if (between == 0 || visited[between])
                    count += Backtrack(next, length + 1, m, n, visited);
            }
        }

        visited[current] = false;
        return count;
    }
}
```

## Complexity

- **Time:** Bounded by the permutations of 9 dots, pruned heavily by the jump-over rule.
- **Space:** `O(1)` extra (fixed-size skip table and visited array).
