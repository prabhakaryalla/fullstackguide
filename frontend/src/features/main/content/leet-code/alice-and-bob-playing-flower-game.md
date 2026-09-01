# 3021. Alice and Bob Playing Flower Game

**Difficulty:** Medium
**Category:** Math

## Problem

Alice and Bob play a turn-based game with two lines of flowers, of sizes `x` and `y` respectively. Alice always goes first; each turn a player picks one line with at least one flower left and removes exactly one flower from it, and the player who removes the very last flower overall wins. Given integers `n` and `m`, count how many pairs `(x, y)` with `1 <= x <= n` and `1 <= y <= m` result in Alice winning.

## Approach

With optimal play, the total number of moves in the game is always `x + y` (every flower must eventually be removed one at a time, and there is no other choice that changes this), so the winner is determined purely by the **parity** of `x + y`: Alice wins exactly when `x + y` is odd, i.e., when one of `x`, `y` is even and the other is odd.

Count how many values in `[1, n]` are even (`n / 2`) versus odd (`(n + 1) / 2`), and likewise for `[1, m]`. Alice wins for pairs where (`x` even, `y` odd) or (`x` odd, `y` even), so sum those two products.

## C# Solution

```csharp
public class Solution {
    public long FlowerGame(int n, int m) {
        long xEven = n / 2;
        long yEven = m / 2;
        long xOdd = (n + 1) / 2;
        long yOdd = (m + 1) / 2;
        return xEven * yOdd + yEven * xOdd;
    }
}
```

## Complexity

- Time: O(1).
- Space: O(1).
