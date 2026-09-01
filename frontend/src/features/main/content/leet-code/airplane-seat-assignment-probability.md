# 1227. Airplane Seat Assignment Probability

**Difficulty:** Medium
**Category:** Math, Dynamic Programming, Brainteaser

## Problem

`n` passengers board a plane with exactly `n` seats, boarding one at a time. The first passenger loses their ticket and sits in a random seat. Every subsequent passenger sits in their own assigned seat if it's free, otherwise picks a random remaining free seat. Return the probability that the `n`th passenger sits in their own assigned seat.

### Example

```
Input: n = 2
Output: 0.5
```

## Approach

By symmetry, once the first passenger displaces someone, that displaced situation recursively behaves the same way regardless of `n` (for `n >= 2`): the last passenger's own seat and the first passenger's own seat end up equally likely to be the one occupied "by accident," so the probability the last passenger gets their own seat converges to exactly `0.5` for any `n >= 2`. The only special case is `n == 1`, where the sole passenger obviously gets their own seat with probability `1`.

## C# Solution

```csharp
public class Solution
{
    public double NthPersonGetsNthSeat(int n)
    {
        return n == 1 ? 1.0 : 0.5;
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
