# 294. Flip Game II

**Difficulty:** Medium
**Category:** Hash Table, String, Backtracking, Memoization, Game Theory

## Problem

You are playing a Flip Game with a friend: given a string `currentState` of `+` and `-`, a move flips two consecutive `"++"` to `"--"`. The game ends when a player cannot make a move, and that player loses. Given the starting state, return `true` if the first player can guarantee a win.

### Example

```
Input: currentState = "++++"
Output: true
```

## Approach

The first player wins if there exists *any* move leading to a state where the opponent (now facing that resulting state) cannot win — i.e., the recursive call on the resulting state returns `false`. Try every valid flip, recursively evaluating whether the opponent loses from the resulting state; memoize results per state string since the same state can be reached via different move orders.

## C# Solution

```csharp
public class Solution
{
    private readonly Dictionary<string, bool> memo = new();

    public bool CanWin(string currentState)
    {
        if (memo.TryGetValue(currentState, out var cached)) return cached;

        for (int i = 0; i < currentState.Length - 1; i++)
        {
            if (currentState[i] != '+' || currentState[i + 1] != '+') continue;

            var next = currentState[..i] + "--" + currentState[(i + 2)..];
            if (!CanWin(next))
            {
                memo[currentState] = true;
                return true;
            }
        }

        memo[currentState] = false;
        return false;
    }
}
```

## Complexity

- **Time:** `O(n * 2^n)` worst case — exponential number of distinct states, each requiring `O(n)` to scan and build substrings, mitigated by memoization.
- **Space:** `O(n * 2^n)` — for the memoization cache.
