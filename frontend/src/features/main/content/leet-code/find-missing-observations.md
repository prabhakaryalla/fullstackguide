# 2028. Find Missing Observations

**Difficulty:** Medium
**Category:** Array, Math, Simulation

## Problem

You have observations from rolling an `n`-sided die (values `1` to `6`) `m + n` times, but only `m` of the rolls, given in the array `rolls`, were recorded — `n` are missing. You are also given the target average `mean` for all `m + n` rolls. Return an array of `n` integers (each between `1` and `6`) representing values the missing rolls could have taken so that the overall average equals `mean`; return an empty array if no such assignment is possible.

## Approach

The total sum of all `m + n` rolls must equal `mean * (m + n)`. Subtract the known sum of `rolls` to get `missingSum`, the sum the `n` missing rolls must contribute. This is only achievable if `n <= missingSum <= 6 * n` (each missing roll is between 1 and 6). If feasible, distribute `missingSum` as evenly as possible: let `base = missingSum / n` and `remainder = missingSum % n`; assign `base + 1` to `remainder` of the missing rolls and `base` to the rest.

## C# Solution

```csharp
public class Solution
{
    public int[] MissingRolls(int[] rolls, int mean, int n)
    {
        int m = rolls.Length;
        long totalSum = (long)mean * (m + n);
        long knownSum = rolls.Sum(x => (long)x);
        long missingSum = totalSum - knownSum;

        if (missingSum < n || missingSum > 6L * n) return Array.Empty<int>();

        int baseVal = (int)(missingSum / n);
        int remainder = (int)(missingSum % n);

        var result = new int[n];
        for (int i = 0; i < n; i++)
            result[i] = i < remainder ? baseVal + 1 : baseVal;

        return result;
    }
}
```

## Complexity

- **Time:** `O(m + n)`.
- **Space:** `O(n)` for the result array.
