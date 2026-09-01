# 292. Nim Game

**Difficulty:** Easy
**Category:** Math, Brainteaser, Game Theory

## Problem

You are playing a game with a friend: there are `n` stones in a pile. On each turn, a player removes 1, 2, or 3 stones; the player who removes the last stone wins. You go first. Given `n`, return `true` if you can win the game, assuming both players play optimally.

### Example

```
Input: n = 4
Output: false
```

## Approach

If there are exactly 4 stones left on your turn, no matter whether you take 1, 2, or 3, your opponent can always take the rest and win — so 4 is a losing position. This pattern repeats every 4 stones: any multiple of 4 is a losing position for the player about to move (because whatever they take, the opponent can always bring the total taken in that round to 4, preserving the multiple-of-4 invariant). Therefore, you win if and only if `n` is not a multiple of 4.

## C# Solution

```csharp
public class Solution
{
    public bool CanWinNim(int n)
    {
        return n % 4 != 0;
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
