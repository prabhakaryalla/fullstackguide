# 3680. Generate Schedule

**Difficulty:** Medium
**Category:** Array, Math, Greedy

## Problem

You are given an integer `n` representing `n` teams. Generate a schedule such that:

- Each team plays every other team exactly twice: once at home and once away.
- There is exactly one match per day; the schedule is a list of consecutive days where `schedule[i]` is the match on day `i`.
- No team plays on consecutive days.

Return a 2D integer array `schedule`, where `schedule[i][0]` is the home team and `schedule[i][1]` is the away team on day `i`. If multiple valid schedules exist, return any one of them. If no schedule exists that meets the conditions, return an empty array.

### Example

```
Input: n = 3
Output: []
Explanation: 6 matches must be played but it's impossible to avoid consecutive-day play for some team.
```

### Constraints

- `2 <= n <= 50`

## Approach

There are `n * (n - 1)` ordered matches to schedule (one per (home, away) pair). Build the schedule day by day with a greedy heuristic: on each day, consider only pairs of teams that did **not** play on the previous day and still have a remaining match between them; among those candidates, prefer the pair whose two teams together have the most total remaining matches left, since leaving high-demand teams unscheduled tends to create dead ends later. Because a pure greedy choice can occasionally paint itself into a corner, retry with a randomized tie-break a bounded number of times; if no attempt completes the full schedule, the instance is infeasible (as is provably the case for `n = 3`, since 3 teams cannot avoid consecutive-day play when each must play 4 games in only 6 days), so return an empty array.

## C# Solution

```csharp
public class Solution
{
    public int[][] GenerateSchedule(int n)
    {
        int totalGames = n * (n - 1);
        Random random = new Random(12345);

        for (int attempt = 0; attempt < 200; attempt++)
        {
            int[][] result = TryBuildSchedule(n, totalGames, random);
            if (result != null)
            {
                return result;
            }
        }

        return Array.Empty<int[]>();
    }

    private int[][] TryBuildSchedule(int n, int totalGames, Random random)
    {
        int[,] remaining = new int[n, n];
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (i != j) remaining[i, j] = 1;
            }
        }

        int[] lastPlayedDay = new int[n];
        Array.Fill(lastPlayedDay, -2);
        int[][] schedule = new int[totalGames][];

        for (int day = 0; day < totalGames; day++)
        {
            List<(int i, int j)> candidates = new List<(int, int)>();
            for (int i = 0; i < n; i++)
            {
                if (lastPlayedDay[i] == day - 1) continue;
                for (int j = 0; j < n; j++)
                {
                    if (i == j || remaining[i, j] == 0) continue;
                    if (lastPlayedDay[j] == day - 1) continue;
                    candidates.Add((i, j));
                }
            }

            if (candidates.Count == 0)
            {
                return null;
            }

            Shuffle(candidates, random);

            (int i, int j) best = candidates[0];
            int bestScore = -1;
            foreach (var (i, j) in candidates)
            {
                int score = RemainingGamesFor(remaining, n, i) + RemainingGamesFor(remaining, n, j);
                if (score > bestScore)
                {
                    bestScore = score;
                    best = (i, j);
                }
            }

            schedule[day] = new int[] { best.i, best.j };
            remaining[best.i, best.j]--;
            lastPlayedDay[best.i] = day;
            lastPlayedDay[best.j] = day;
        }

        return schedule;
    }

    private int RemainingGamesFor(int[,] remaining, int n, int team)
    {
        int total = 0;
        for (int k = 0; k < n; k++)
        {
            total += remaining[team, k] + remaining[k, team];
        }
        return total;
    }

    private void Shuffle(List<(int, int)> list, Random random)
    {
        for (int i = list.Count - 1; i > 0; i--)
        {
            int j = random.Next(i + 1);
            (list[i], list[j]) = (list[j], list[i]);
        }
    }
}
```

## Complexity

- **Time:** `O(attempts * n^3)` in the worst case, bounded by the small `n <= 50`.
- **Space:** `O(n^2)` for the remaining-games matrix.
