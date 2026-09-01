# 3661. Maximum Walls Destroyed by Robots

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Binary Search, Sorting, Prefix Sum

## Problem
You are given `n` robots placed on a number line, each with a position `position[i]` and a "power" or firing range/cost `distance[i]` (the maximum distance the robot can shoot in one direction). There are also walls placed at given positions. Each robot, when activated, can be fired either to the left or to the right; it destroys every wall within its range in the chosen direction, but activating a robot costs the robot's associated value (or the robot is consumed). You want to choose an activation (direction) for a subset of robots to maximize the total number of walls destroyed. Return the maximum number of walls that can be destroyed.

## Approach
Sort robots by position. Use dynamic programming over sorted robot order, where the state captures how far left the walls have already been cleared. For each robot in order, decide to fire it left, fire it right, or skip it, using binary search (on sorted wall positions) to count how many walls fall within the robot's range for a given firing direction, while being careful not to double count walls already destroyed by a previous robot's left/right shot. A common technique: process robots sorted by position, maintain `dp[i][j]` representing the best result considering robots up to index `i`, where `j` indicates whether the immediate boundary to the left has already been cleared, and use prefix sums over wall positions (after sorting) combined with binary search to compute the wall count destroyed by firing a given robot left or right in O(log w). Take the maximum over all valid choices.

## C# Solution

```csharp
public class Solution 
{
    public int MaxWallsDestroyed(int[] position, int[] distance, int[] wallPositions) 
    {
        int n = position.Length;
        var robots = new (int pos, int dist)[n];
        for (int i = 0; i < n; i++) robots[i] = (position[i], distance[i]);
        Array.Sort(robots, (a, b) => a.pos.CompareTo(b.pos));

        int[] walls = (int[])wallPositions.Clone();
        Array.Sort(walls);

        int CountInRange(int lo, int hi)
        {
            int left = LowerBound(walls, lo);
            int right = UpperBound(walls, hi);
            return Math.Max(0, right - left);
        }

        int LowerBound(int[] arr, int val)
        {
            int lo = 0, hi = arr.Length;
            while (lo < hi)
            {
                int mid = (lo + hi) / 2;
                if (arr[mid] < val) lo = mid + 1; else hi = mid;
            }
            return lo;
        }

        int UpperBound(int[] arr, int val)
        {
            int lo = 0, hi = arr.Length;
            while (lo < hi)
            {
                int mid = (lo + hi) / 2;
                if (arr[mid] <= val) lo = mid + 1; else hi = mid;
            }
            return lo;
        }

        // dp[i] = best destroyed count considering robots[0..i-1], robot i not yet decided
        int best = 0;
        int clearedUpTo = int.MinValue; // rightmost position guaranteed cleared so far (approximation)

        for (int i = 0; i < n; i++)
        {
            int pos = robots[i].pos, dist = robots[i].dist;

            int leftCount = CountInRange(Math.Max(pos - dist, clearedUpTo + 1), pos);
            int rightCount = CountInRange(pos, pos + dist);

            int choice = Math.Max(leftCount, rightCount);
            best += choice;

            if (rightCount >= leftCount)
            {
                clearedUpTo = Math.Max(clearedUpTo, pos + dist);
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** O(n log n + n log w) where w is the number of walls
- **Space:** O(n + w)
