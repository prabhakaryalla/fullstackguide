# 3385. Minimum Time to Break Locks II

**Difficulty:** Hard
**Category:** Graph, Hungarian Algorithm (Assignment Problem), Dynamic Programming
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Bob is stuck in a dungeon and must break `n` locks. The energy required to break the `i`-th lock is given in an array `strength`.

Bob's sword starts with 0 energy and a factor `x = 1`. Every minute, the sword's energy increases by the current factor `x`. To break a lock, the sword's energy must reach at least the lock's required strength; after breaking a lock, the energy resets to 0 and the factor `x` increases by exactly 1 (unlike the easier "Minimum Time to Break Locks I", where the increment `k` was an arbitrary given constant, here it is always 1, but `n` can be much larger).

Return the minimum total number of minutes required to break all `n` locks, given that Bob can choose the order in which he attacks the locks.

### Example
```
Input: strength = [3,4,1]
Output: 4
Explanation: Break the 1-energy lock at minute 1 (x becomes 2), the 3-energy lock
by minute 3 (2 more minutes, x becomes 3), and the 4-energy lock by minute 4
(1 more minute). Total time = 1 + 2 + 1 = 4.
```

## Approach
If a lock is broken at "turn" `t` (1-indexed, i.e. it is the `t`-th lock broken), the factor during that attempt is exactly `t`, so the time needed to break lock `j` at turn `t` is `ceil(strength[j] / t)`. The total time Bob spends is simply the sum of these per-turn durations, since breaks happen sequentially.

This is exactly a minimum-cost bipartite assignment problem: build an `n x n` cost matrix `cost[t][j] = ceil(strength[j] / (t + 1))` (turns vs. locks) and find the assignment of turns to locks that minimizes the total cost. With `n` up to the thousands, brute-force permutations (used in "Break Locks I") are too slow, so we use the Hungarian algorithm (successive shortest augmenting paths with vertex potentials), which solves the assignment problem in `O(n^3)`.

## C# Solution

```csharp
public class Solution 
{
    public int FindMinimumTime(int[] strength)
    {
        int n = strength.Length;
        var costs = new int[n][];
        for (int turn = 1; turn <= n; turn++)
        {
            costs[turn - 1] = new int[n];
            for (int j = 0; j < n; j++)
                costs[turn - 1][j] = (strength[j] + turn - 1) / turn;
        }
        return Hungarian(costs);
    }

    // Jonker-Volgenant style Hungarian algorithm for the assignment problem.
    // Returns the minimum total cost of assigning each row (turn) to a distinct column (lock).
    private int Hungarian(int[][] costs)
    {
        int n = costs.Length;
        const int Inf = int.MaxValue / 2;

        // lockAssignment[j] = the turn currently assigned to lock j; index n is a dummy sentinel.
        var lockAssignment = new int[n + 1];
        Array.Fill(lockAssignment, -1);
        var turnPotential = new int[n];
        var lockPotential = new int[n + 1];

        for (int row = 0; row < n; row++)
        {
            int curLock = n;
            lockAssignment[curLock] = row;
            var minReducedCost = new int[n + 1];
            Array.Fill(minReducedCost, Inf);
            var prevLock = new int[n + 1];
            Array.Fill(prevLock, -1);
            var visited = new bool[n + 1];

            while (lockAssignment[curLock] != -1)
            {
                visited[curLock] = true;
                int assignedRow = lockAssignment[curLock];
                int minDelta = Inf;
                int nextLock = -1;

                for (int lockIdx = 0; lockIdx < n; lockIdx++)
                {
                    if (visited[lockIdx])
                        continue;

                    int reducedCost = costs[assignedRow][lockIdx] - turnPotential[assignedRow] - lockPotential[lockIdx];
                    if (reducedCost < minReducedCost[lockIdx])
                    {
                        minReducedCost[lockIdx] = reducedCost;
                        prevLock[lockIdx] = curLock;
                    }
                    if (minReducedCost[lockIdx] < minDelta)
                    {
                        minDelta = minReducedCost[lockIdx];
                        nextLock = lockIdx;
                    }
                }

                for (int lockIdx = 0; lockIdx <= n; lockIdx++)
                {
                    if (visited[lockIdx])
                    {
                        turnPotential[lockAssignment[lockIdx]] += minDelta;
                        lockPotential[lockIdx] -= minDelta;
                    }
                    else
                    {
                        minReducedCost[lockIdx] -= minDelta;
                    }
                }

                curLock = nextLock;
            }

            while (curLock != n)
            {
                int lockIdx = prevLock[curLock];
                lockAssignment[curLock] = lockAssignment[lockIdx];
                curLock = lockIdx;
            }
        }

        return -lockPotential[n];
    }
}
```

## Complexity

- **Time:** O(n^3) for the Hungarian algorithm (n augmenting-path searches, each O(n^2)).
- **Space:** O(n^2) for the cost matrix.
