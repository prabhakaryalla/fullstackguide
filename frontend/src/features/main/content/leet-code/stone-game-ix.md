# 2029. Stone Game IX

**Difficulty:** Medium
**Category:** Array, Math, Greedy, Counting, Game Theory

## Problem

Alice and Bob play a game with an integer array `stones`. Alice moves first. On each turn, a player removes any stone from the array and adds its value to a running total. A player loses immediately if, after their move, the running total is divisible by 3 (unless it is the very first move of the game overall). If all stones are removed and no one has lost, the game ends in a draw. Return `true` if Alice wins, assuming both players play optimally.

### Example

`stones = [2,1]` → Alice must take a stone. Whichever she takes, Bob can force Alice into a losing position, so the result depends on the exact residues; for this input Alice wins.

## Approach

Only the residues of the stone values modulo 3 matter. Let `count[0]`, `count[1]`, `count[2]` be how many stones have residue 0, 1, 2 respectively. Stones with residue 0 never change whose "turn parity" is at risk, they just get inserted between forced moves. Working through the case analysis:
- If `count[0]` is even, Alice wins if and only if both `count[1] > 0` and `count[2] > 0` (she needs both residue classes available to keep forcing Bob into a multiple of 3).
- If `count[0]` is odd, the parity flips, and Alice wins if and only if `abs(count[1] - count[2]) > 2`.

## C# Solution

```csharp
public class Solution 
{
    public bool StoneGameIX(int[] stones) 
    {
        int[] count = new int[3];
        foreach (int stone in stones)
            count[stone % 3]++;

        if (count[0] % 2 == 0)
            return count[1] > 0 && count[2] > 0;
        return Math.Abs(count[1] - count[2]) > 2;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
