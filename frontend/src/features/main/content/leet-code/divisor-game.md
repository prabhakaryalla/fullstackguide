# 1025. Divisor Game

**Difficulty:** Easy
**Category:** Math, Dynamic Programming, Brainteaser

## Problem

Alice and Bob play a game with a number `n`. On each turn, a player picks any `x` with `0 < x < n` such that `n % x == 0`, and replaces `n` with `n - x`. The player who can no longer make a move loses. Alice moves first. Return `true` if Alice wins with optimal play.

### Example

```
Input: n = 2
Output: true

Input: n = 3
Output: false
```

## Approach

This is a classic parity brainteaser: Alice wins if and only if `n` is even. Intuitively, if `n` is even, `x = 1` always keeps the number even after her opponent's turn breaks parity in her favor, forcing Bob to eventually face an odd number with only odd divisors (which flips it to even for Alice again); the game state alternates evenness/oddness in a way that always leaves Bob stuck at `n = 1`.

## C# Solution

```csharp
public class Solution
{
    public bool DivisorGame(int n)
    {
        return n % 2 == 0;
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
