# 3776. Minimum Moves to Balance Circular Array

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting

## Problem

Given a circular array `balance` (at most one index has a negative value), in one move a person transfers 1 unit of balance to a left or right neighbor. Return the minimum number of moves so every person has non-negative balance, or `-1` if impossible.

### Example

Input: `balance = [5,1,-4]`
Output: `4`

## Approach

If no index is negative, the answer is `0`. If the total sum is negative, it is impossible. Otherwise, locate the negative index and greedily pull the required deficit from the closest neighbors first (by circular distance), since moving 1 unit across distance `d` costs `d` moves; each move's cost accumulates as `distance * unitsTaken`.

## C# Solution

```csharp
public class Solution 
{
    public long MinMoves(int[] balance) 
    {
        int n = balance.Length;
        long total = 0;
        int negIdx = -1;
        foreach (int v in balance) total += v;
        for (int i = 0; i < n; i++) if (balance[i] < 0) negIdx = i;

        if (negIdx == -1) return 0;
        if (total < 0) return -1;

        long deficit = -balance[negIdx];
        var others = new List<(int dist, long val)>();
        for (int i = 0; i < n; i++)
        {
            if (i == negIdx) continue;
            int diff = Math.Abs(i - negIdx);
            int dist = Math.Min(diff, n - diff);
            others.Add((dist, balance[i]));
        }
        others.Sort((a, b) => a.dist.CompareTo(b.dist));

        long moves = 0;
        foreach (var (dist, val) in others)
        {
            if (deficit <= 0) break;
            long take = Math.Min(val, deficit);
            moves += take * dist;
            deficit -= take;
        }
        return moves;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
