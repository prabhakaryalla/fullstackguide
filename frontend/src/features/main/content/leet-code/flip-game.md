# 293. Flip Game

**Difficulty:** Easy
**Category:** Hash Table, String

## Problem

You are playing a Flip Game with a friend: given a string `currentState` that contains only `+` and `-`, a move consists of choosing two consecutive `"++"` and flipping them both to `"--"`. Return all possible states after exactly one valid move, in any order.

### Example

```
Input: currentState = "++++"
Output: ["--++","+--+","++--"]
```

## Approach

Scan the string for every position `i` where `currentState[i]` and `currentState[i+1]` are both `+`. For each such position, build a new string with that pair flipped to `--` and add it to the results. There is no need for recursion here since only a single move is requested.

## C# Solution

```csharp
public class Solution
{
    public IList<string> GeneratePossibleNextMoves(string currentState)
    {
        var result = new List<string>();

        for (int i = 0; i < currentState.Length - 1; i++)
        {
            if (currentState[i] == '+' && currentState[i + 1] == '+')
            {
                var chars = currentState.ToCharArray();
                chars[i] = '-';
                chars[i + 1] = '-';
                result.Add(new string(chars));
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n^2)` — up to `n` matches, each requiring `O(n)` to build the resulting string.
- **Space:** `O(n^2)` — for storing the resulting strings.
