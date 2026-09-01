# 552. Student Attendance Record II

**Difficulty:** Hard
**Category:** Dynamic Programming, Math

## Problem

Given an integer `n`, return the number of possible attendance records of length `n` (using `'A'`, `'L'`, `'P'`) that make a student eligible for an award (at most one `'A'` total, and never 3 or more consecutive `'L'`s), modulo `10^9 + 7`.

### Example

```
Input: n = 2
Output: 8
```

### Constraints

- `1 <= n <= 10^5`

## Approach

Track the count of valid records using a state of `(total absences so far: 0 or 1, trailing consecutive lates: 0, 1, or 2)` — 6 possible states in total. For each new day, transition every state by appending `'P'` (always resets the late streak), `'A'` (only allowed from 0 absences, resets the late streak and moves to 1 absence), or `'L'` (only allowed if the late streak is below 2, incrementing it). Sum all state counts after `n` days for the final answer.

## C# Solution

```csharp
public class Solution
{
    private const int Mod = 1_000_000_007;

    public int CheckRecord(int n)
    {
        var dp = new long[2, 3];
        dp[0, 0] = 1;

        for (int day = 0; day < n; day++)
        {
            var next = new long[2, 3];

            for (int absences = 0; absences < 2; absences++)
            {
                for (int lates = 0; lates < 3; lates++)
                {
                    long ways = dp[absences, lates];
                    if (ways == 0) continue;

                    next[absences, 0] = (next[absences, 0] + ways) % Mod;

                    if (absences == 0)
                        next[1, 0] = (next[1, 0] + ways) % Mod;

                    if (lates < 2)
                        next[absences, lates + 1] = (next[absences, lates + 1] + ways) % Mod;
                }
            }

            dp = next;
        }

        long total = 0;
        for (int absences = 0; absences < 2; absences++)
            for (int lates = 0; lates < 3; lates++)
                total = (total + dp[absences, lates]) % Mod;

        return (int)total;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` — a fixed-size 2x3 state table.
