# 1908. Game of Nim

**Difficulty:** Medium
**Category:** Math, Bit Manipulation, Brainteaser, Game Theory
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Two players alternately remove any positive number of stones from a single chosen pile among `piles`, with Alice moving first; the player unable to move (all piles empty) loses. Both play optimally. Return `true` if Alice wins.

### Example

```
Input: piles = [1,1]
Output: false
Explanation: XOR of pile sizes is 1 XOR 1 = 0, so the first player (Alice) loses.
```

### Constraints

- `1 <= piles.length <= 7`
- `1 <= piles[i] <= 16`

## Approach

This is the classic game of Nim. The first player wins if and only if the XOR (Nim-sum) of all pile sizes is non-zero; if the XOR is zero, the position is already balanced and the second player can always restore balance after any move by the first player, guaranteeing the first player eventually loses.

## C# Solution

```csharp
public class Solution
{
    public bool NimGame(int[] piles)
    {
        int xorSum = 0;
        foreach (int pile in piles)
        {
            xorSum ^= pile;
        }

        return xorSum != 0;
    }
}
```

## Complexity

- **Time:** `O(n)` — one pass over the piles to compute the XOR.
- **Space:** `O(1)`.
