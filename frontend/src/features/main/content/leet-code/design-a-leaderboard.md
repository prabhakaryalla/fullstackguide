# 1244. Design A Leaderboard

**Difficulty:** Medium
**Category:** Design, Hash Table, Sorting, Heap
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Design a `Leaderboard` class supporting `AddScore(playerId, score)` (add `score` to that player's total, starting at `0`), `Top(K)` (return the sum of the top `K` scores), and `Reset(playerId)` (reset that player's score to `0`, effectively removing them).

## Approach

Keep a dictionary mapping player id to running total score. `AddScore` and `Reset` are then simple dictionary updates. `Top(K)` sorts the current scores descending and sums the first `K` — since leaderboard queries are typically far less frequent than score updates, doing the sort lazily on demand keeps the update path cheap.

## C# Solution

```csharp
public class Leaderboard
{
    private readonly Dictionary<int, int> scores = new();

    public void AddScore(int playerId, int score)
    {
        scores[playerId] = scores.GetValueOrDefault(playerId) + score;
    }

    public int Top(int K)
    {
        return scores.Values.OrderByDescending(s => s).Take(K).Sum();
    }

    public void Reset(int playerId)
    {
        scores.Remove(playerId);
    }
}
```

## Complexity

- **Time:** `O(1)` for `AddScore`/`Reset`; `O(n log n)` for `Top`, where `n` is the number of players.
- **Space:** `O(n)`.
