# 319. Bulb Switcher

**Difficulty:** Medium
**Category:** Math, Brainteaser

## Problem

There are `n` bulbs initially off. On the `i`th round, toggle every bulb whose index is a multiple of `i`, for `i` from `1` to `n`. Return the number of bulbs that are on after `n` rounds.

### Example

```
Input: n = 3
Output: 1
Explanation: Bulb 1 is toggled once, bulb 2 twice, bulb 3 twice. Only bulb 1 remains on.
```

### Constraints

- `0 <= n <= 10^9`

## Approach

Bulb `k` is toggled once for every divisor of `k`, so it ends up on only if it has an odd number of divisors — which happens exactly when `k` is a perfect square (divisors pair up except for the square root). The answer is therefore the count of perfect squares from `1` to `n`, which equals `floor(sqrt(n))`.

## C# Solution

```csharp
public class Solution
{
    public int BulbSwitch(int n)
    {
        return (int)Math.Sqrt(n);
    }
}
```

## Complexity

- **Time:** `O(1)` — a single square root computation.
- **Space:** `O(1)`.
