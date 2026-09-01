# 808. Soup Servings

**Difficulty:** Medium
**Category:** Math, Dynamic Programming, Probability and Statistics

## Problem

You have `n` mL each of soup A and soup B. Each turn, one of four equally likely operations serves some combination of soup A and soup B (in decreasing amounts of A relative to B on average), stopping early if either soup runs out. Return the probability that soup A runs out first, plus half the probability that both run out at the same time.

### Example

```
Input: n = 50
Output: 0.62500
```

## Approach

Scale down by units of 25 mL (since every serving amount is a multiple of 25), reducing the state space to a manageable number of "unit" servings remaining for each soup. Use memoized recursion on the remaining units of soup A and B: if both are non-positive, the outcome is a tie (probability 0.5); if only A is depleted, A finished first (probability 1.0); if only B is depleted, probability 0. Otherwise, average the outcomes of the four equally likely serving operations. Since the probability converges to `1.0` once `n` is large (empirically once it exceeds roughly 4800 mL, given the problem's required precision), return `1.0` directly beyond that threshold to avoid deep recursion.

## C# Solution

```csharp
public class Solution
{
    private Dictionary<(int, int), double> memo = new();

    public double SoupServings(int n)
    {
        int m = (int)Math.Ceiling(n / 25.0);
        if (m >= 179) return 1.0;

        return Helper(m, m);
    }

    private double Helper(int a, int b)
    {
        if (a <= 0 && b <= 0) return 0.5;
        if (a <= 0) return 1.0;
        if (b <= 0) return 0.0;

        if (memo.TryGetValue((a, b), out var cached)) return cached;

        double result = 0.25 * (
            Helper(a - 4, b) +
            Helper(a - 3, b - 1) +
            Helper(a - 2, b - 2) +
            Helper(a - 1, b - 3)
        );

        memo[(a, b)] = result;
        return result;
    }
}
```

## Complexity

- **Time:** `O(m^2)`, where `m` is the scaled-down serving count.
- **Space:** `O(m^2)` for the memoization table.
