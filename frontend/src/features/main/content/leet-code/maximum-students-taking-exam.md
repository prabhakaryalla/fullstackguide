# 1349. Maximum Students Taking Exam

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Bitmask, Matrix

## Problem

Given an `m x n` seat matrix where `'.'` is a usable seat and `'#'` is broken, place students so no student can cheat off another sitting immediately left, right, or diagonally adjacent (in the row directly in front or behind). Return the maximum number of students that can take the exam.

### Example

```
Input: seats = [["#",".","#","#",".","#"],[".","#","#","#","#","."],["#",".","#","#",".","#"]]
Output: 4
```

## Approach

For each row, precompute every bitmask of seat assignments that both avoids broken seats and avoids placing two students in horizontally adjacent seats. Then run a bitmask dynamic program across rows: `dp[row][mask]` is the maximum number of students seated using `mask` in that row, transitioning from a previous row's mask only if no bit in `mask` diagonally aligns with a bit in the previous mask (checked via shifted bitwise ANDs).

## C# Solution

```csharp
public class Solution
{
    public int MaxStudents(char[][] seats)
    {
        int m = seats.Length, n = seats[0].Length;
        int fullMask = (1 << n) - 1;
        var validMasks = new List<int>[m];

        for (int r = 0; r < m; r++)
        {
            int broken = 0;
            for (int c = 0; c < n; c++)
            {
                if (seats[r][c] == '#') broken |= (1 << c);
            }

            validMasks[r] = new List<int>();
            for (int mask = 0; mask <= fullMask; mask++)
            {
                if ((mask & broken) != 0) continue;
                if ((mask & (mask << 1)) != 0) continue;
                validMasks[r].Add(mask);
            }
        }

        var dp = new Dictionary<int, int> { [0] = 0 };

        for (int r = 0; r < m; r++)
        {
            var next = new Dictionary<int, int>();

            foreach (var mask in validMasks[r])
            {
                int popCount = System.Numerics.BitOperations.PopCount((uint)mask);

                foreach (var (prevMask, prevBest) in dp)
                {
                    if ((mask & (prevMask << 1)) != 0) continue;
                    if ((mask & (prevMask >> 1)) != 0) continue;

                    int candidate = prevBest + popCount;
                    if (!next.TryGetValue(mask, out int cur) || candidate > cur)
                    {
                        next[mask] = candidate;
                    }
                }
            }

            dp = next;
        }

        return dp.Count == 0 ? 0 : dp.Values.Max();
    }
}
```

## Complexity

- **Time:** `O(m * 3^n)` in the worst case for mask transitions.
- **Space:** `O(2^n)` for the DP states per row.
