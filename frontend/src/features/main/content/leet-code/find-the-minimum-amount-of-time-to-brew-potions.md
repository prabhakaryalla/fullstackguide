# 3494. Find the Minimum Amount of Time to Brew Potions

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Simulation

## Problem

There are `n` wizards, where `skill[i]` is the skill of the `i`-th wizard, and `m` potions, where `mana[j]` is the mana required for the `j`-th potion. Wizard `i` brews potion `j` in exactly `skill[i] * mana[j]` time.

Potions must be brewed in order `0, 1, ..., m - 1`, and each potion must pass through every wizard in order `0, 1, ..., n - 1` (wizard `i` can only start potion `j` after wizard `i - 1` has finished potion `j`, and after wizard `i` itself has finished potion `j - 1`). Each wizard works on only one potion at a time, with no gaps once started. Return the earliest time at which the last wizard finishes the last potion.

### Example

```
Input: skill = [1,5,2,4], mana = [5,1,4,2]
Output: 110
Explanation: Simulating the pipeline of 4 wizards brewing 4 potions in order (each wizard must finish
the previous potion before starting the next, and each potion must clear every wizard in order)
yields a completion time of 110 for the final wizard on the final potion.
```

## Approach

Let `finish[i]` be the time wizard `i` completes the **current** potion. For the first potion, wizard `i` cannot start until wizard `i - 1` finishes it, so `finish[i]` is simply a running prefix sum of `skill[i] * mana[0]`.

For each subsequent potion `j`, wizard `i` can only start once both wizard `i` has finished potion `j - 1` (`prevFinish[i]`, from the previous row) and wizard `i - 1` has finished potion `j` (`finish[i - 1]`, already computed for the current row). This gives the recurrence:

```
finish[i] = max(prevFinish[i], finish[i - 1]) + skill[i] * mana[j]
```

Processing potions one at a time and reusing a single array for `finish` (row by row) avoids storing the full 2D table.

## C# Solution

```csharp
public class Solution 
{
    public long MinTime(int[] skill, int[] mana) 
    {
        int n = skill.Length;
        int m = mana.Length;
        long[] finish = new long[n];

        long acc = 0;
        for (int i = 0; i < n; i++)
        {
            acc += (long)skill[i] * mana[0];
            finish[i] = acc;
        }

        for (int j = 1; j < m; j++)
        {
            long[] cur = new long[n];
            long prevInRow = 0;
            for (int i = 0; i < n; i++)
            {
                long start = Math.Max(finish[i], prevInRow);
                cur[i] = start + (long)skill[i] * mana[j];
                prevInRow = cur[i];
            }
            finish = cur;
        }

        return finish[n - 1];
    }
}
```

## Complexity

- **Time:** O(n * m), where n is the number of wizards and m is the number of potions.
- **Space:** O(n) for the row of finish times.
