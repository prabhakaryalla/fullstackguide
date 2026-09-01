# 544. Output Contest Matches

**Difficulty:** Medium
**Category:** Array, Math, Simulation, Stack, Recursion
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given `n` teams numbered `1` to `n` in a single-elimination tournament seeded so that the strongest teams are placed farthest apart, return a string representing the full bracket, where each round pairs team `i` with team `n + 1 - i`.

### Example

```
Input: n = 4
Output: "((1,4),(2,3))"
```

### Constraints

- `n` is a power of 2 in the range `[2, 2^12]`.

## Approach

Simulate the tournament round by round: start with each team represented as its own string label. In each round, pair up the `i`th remaining team with the mirrored team from the opposite end of the current list (`teams[i]` with `teams[length - 1 - i]`), wrapping each pair in parentheses to form the next round's labels. Repeat until only one label remains, representing the fully nested bracket.

## C# Solution

```csharp
public class Solution
{
    public string FindContestMatch(int n)
    {
        var teams = new string[n];
        for (int i = 0; i < n; i++)
            teams[i] = (i + 1).ToString();

        while (teams.Length > 1)
        {
            var nextRound = new string[teams.Length / 2];
            for (int i = 0; i < nextRound.Length; i++)
                nextRound[i] = $"({teams[i]},{teams[teams.Length - 1 - i]})";

            teams = nextRound;
        }

        return teams[0];
    }
}
```

## Complexity

- **Time:** `O(n log n)` — `log n` rounds, each doing `O(n)` work at that round's remaining team count.
- **Space:** `O(n)` for the intermediate round arrays.
