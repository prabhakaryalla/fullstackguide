# 1033. Moving Stones Until Consecutive

**Difficulty:** Easy
**Category:** Math, Brainteaser

## Problem

Three stones sit on a number line at positions `a`, `b`, and `c`. In one move, pick up an endpoint stone and place it on any unoccupied position such that it's no longer an endpoint. Return `[minimumMoves, maximumMoves]` needed to make the three stones consecutive.

### Example

```
Input: a = 1, b = 2, c = 5
Output: [1,2]
```

## Approach

Sort the positions as `x < y < z`. The maximum moves simply fill every empty gap on both sides individually: `(z - y - 1) + (y - x - 1)`. For the minimum, if the stones are already consecutive (`z - x == 2`), zero moves are needed. If either gap is already `1` or `2` (`y - x <= 2` or `z - y <= 2`), a single move can close the remaining gap. Otherwise, two moves are always enough (move each outer stone next to the middle one).

## C# Solution

```csharp
public class Solution
{
    public int[] NumMovesStones(int a, int b, int c)
    {
        int[] pos = { a, b, c };
        Array.Sort(pos);
        int x = pos[0], y = pos[1], z = pos[2];

        int maxMoves = (z - y - 1) + (y - x - 1);

        int minMoves;
        if (z - x == 2) minMoves = 0;
        else if (y - x <= 2 || z - y <= 2) minMoves = 1;
        else minMoves = 2;

        return new[] { minMoves, maxMoves };
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
