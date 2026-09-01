# 1884. Egg Drop With 2 Eggs and N Floors

**Difficulty:** Medium
**Category:** Math, Dynamic Programming

## Problem

Given `2` identical eggs and a building with `n` floors, determine `f`, the highest floor from which an egg dropped will not break (an egg dropped from a floor at or below `f` never breaks; above `f` it always breaks). Return the minimum number of moves needed to determine `f` with certainty in the worst case.

### Example

```
Input: n = 2
Output: 2
```

## Approach

With `2` eggs and `m` allowed moves, the maximum number of floors distinguishable is `m(m+1)/2` (a classic result: the first egg's drop schedule can afford to "waste" one fewer floor gap each subsequent trial, since a break leaves only the second egg to do a linear scan of the remaining gap). Simulate increasing `m` starting at `1`, each time covering `m` additional floors, until the cumulative floors covered reaches at least `n`.

## C# Solution

```csharp
public class Solution
{
    public int TwoEggDrop(int n)
    {
        int moves = 0;
        int floorsCovered = 0;

        while (floorsCovered < n)
        {
            moves++;
            floorsCovered += moves;
        }

        return moves;
    }
}
```

## Complexity

- **Time:** `O(sqrt(n))`.
- **Space:** `O(1)`.
