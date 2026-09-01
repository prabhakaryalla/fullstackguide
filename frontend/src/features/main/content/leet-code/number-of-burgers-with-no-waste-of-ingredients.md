# 1276. Number of Burgers with No Waste of Ingredients

**Difficulty:** Medium
**Category:** Math

## Problem

A jumbo burger needs `4` tomato slices and `1` cheese slice; a small burger needs `2` tomato slices and `1` cheese slice. Given the total available `tomatoSlices` and `cheeseSlices`, return `[jumboCount, smallCount]` that uses every slice exactly, or an empty array if impossible.

### Example

```
Input: tomatoSlices = 16, cheeseSlices = 7
Output: [1,6]
```

## Approach

This reduces to solving two linear equations: `4j + 2s = tomatoSlices` and `j + s = cheeseSlices`. Substituting `s = cheeseSlices - j` into the first equation and solving gives `j = (tomatoSlices - 2 * cheeseSlices) / 2`. Compute that directly, derive `s`, and validate both are non-negative integers that satisfy the original tomato-slice equation exactly — if not, no valid combination exists.

## C# Solution

```csharp
public class Solution
{
    public IList<long> NumOfBurgers(int tomatoSlices, int cheeseSlices)
    {
        if (tomatoSlices % 2 != 0) return new List<long>();

        long jumbo = (tomatoSlices - 2L * cheeseSlices) / 2;
        long small = cheeseSlices - jumbo;

        if (jumbo < 0 || small < 0 || 4 * jumbo + 2 * small != tomatoSlices)
            return new List<long>();

        return new List<long> { jumbo, small };
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
