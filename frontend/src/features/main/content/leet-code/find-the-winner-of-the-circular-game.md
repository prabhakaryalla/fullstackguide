# 1823. Find the Winner of the Circular Game

**Difficulty:** Medium
**Category:** Array, Math, Recursion, Simulation, Queue

## Problem

`n` friends numbered `1` to `n` sit in a circle and play a counting-out game: starting from friend `1` and counting clockwise, every `k`-th friend is eliminated, and counting resumes from the friend immediately after the eliminated one. The game continues until one friend remains. Return the number of the winner.

### Example

```
Input: n = 5, k = 2
Output: 3
```

## Approach

This is the classic Josephus problem. Track the 0-indexed position of the survivor for a game of size `1` (trivially position `0`), then repeatedly derive the survivor's position for a game of size `i` from the survivor's position for a game of size `i-1` via the recurrence `winner = (winner + k) % i`, increasing `i` from `2` up to `n`. Converting the final 0-indexed position back to 1-indexed gives the answer.

## C# Solution

```csharp
public class Solution
{
    public int FindTheWinner(int n, int k)
    {
        int winner = 0;

        for (int i = 2; i <= n; i++)
        {
            winner = (winner + k) % i;
        }

        return winner + 1;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
