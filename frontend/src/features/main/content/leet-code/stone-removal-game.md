# 3360. Stone Removal Game

**Difficulty:** Easy
**Category:** Math, Simulation, Game Theory

## Problem
Alice and Bob take turns removing stones from a pile of `n` stones, with Alice moving first. On the first turn, 10 stones are removed; each subsequent turn removes exactly one fewer stone than the previous turn (10, 9, 8, ...). Play stops once the number of stones to remove would exceed the stones remaining, or the amount to remove reaches 0. Return the number of stones remaining once play stops.

### Example

Input: `n = 25`

Output: `6`

Explanation: Turn 1 removes 10 (15 left), turn 2 removes 9 (6 left). Turn 3 would need to remove 8, but only 6 stones remain, so play stops with 6 stones left.

## Approach
Directly simulate: starting with `remove = 10`, while `remove > 0` and there are at least `remove` stones left, subtract `remove` from `n` and decrement `remove` by 1. Return the final value of `n`.

## C# Solution

```csharp
public class Solution 
{
    public int StoneGameResult(int n) 
    {
        int remove = 10;
        while (remove > 0 && n >= remove) 
        {
            n -= remove;
            remove--;
        }
        return n;
    }
}
```

## Complexity

- **Time:** O(1) — at most 10 iterations.
- **Space:** O(1)
