# 464. Can I Win

**Difficulty:** Medium
**Category:** Math, Dynamic Programming, Bit Manipulation, Memoization, Game Theory, Bitmask

## Problem

Two players alternately pick integers from `1` to `maxChoosableInteger` (each usable only once) and add them to a running total; the first player to make the total reach or exceed `desiredTotal` wins. Return `true` if the first player can force a win with optimal play.

### Example

```
Input: maxChoosableInteger = 10, desiredTotal = 11
Output: false
```

### Constraints

- `1 <= maxChoosableInteger <= 20`
- `0 <= desiredTotal <= 300`

## Approach

If the sum of all choosable integers is less than `desiredTotal`, no one can ever win. Otherwise, use a bitmask to represent which numbers have been used, and memoize game outcomes per mask (the remaining total is derivable from the mask, so it doesn't need to be part of the memo key). The current player wins if there exists an unused number that either reaches the target immediately or leaves the opponent in a losing state.

## C# Solution

```csharp
public class Solution
{
    private Dictionary<int, bool> memo;

    public bool CanIWin(int maxChoosableInteger, int desiredTotal)
    {
        int totalSum = maxChoosableInteger * (maxChoosableInteger + 1) / 2;
        if (totalSum < desiredTotal) return false;
        if (desiredTotal <= 0) return true;

        memo = new Dictionary<int, bool>();
        return Dfs(0, maxChoosableInteger, desiredTotal);
    }

    private bool Dfs(int usedMask, int maxChoosableInteger, int remainingTotal)
    {
        if (memo.TryGetValue(usedMask, out var cached)) return cached;

        for (int i = 1; i <= maxChoosableInteger; i++)
        {
            int bit = 1 << (i - 1);
            if ((usedMask & bit) != 0) continue;

            if (i >= remainingTotal || !Dfs(usedMask | bit, maxChoosableInteger, remainingTotal - i))
            {
                memo[usedMask] = true;
                return true;
            }
        }

        memo[usedMask] = false;
        return false;
    }
}
```

## Complexity

- **Time:** `O(2^n * n)`, where `n` is `maxChoosableInteger`.
- **Space:** `O(2^n)` for the memoization map.
