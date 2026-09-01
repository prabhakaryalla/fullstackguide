# 1688. Count of Matches in Tournament

**Difficulty:** Easy
**Category:** Math, Simulation

## Problem

Given `n` teams in a single-elimination-style tournament (each round, pairs play one match and advance; if a round has an odd number of teams, one advances automatically as a bye), return the total number of matches played until a winner is decided.

### Example

```
Input: n = 7
Output: 6
```

## Approach

Every match eliminates exactly one team, and the tournament ends when exactly one team remains, so the total number of matches always equals `n - 1` regardless of the byes.

## C# Solution

```csharp
public class Solution
{
    public int NumberOfMatches(int n)
    {
        return n - 1;
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
