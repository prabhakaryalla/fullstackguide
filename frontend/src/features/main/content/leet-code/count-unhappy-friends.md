# 1583. Count Unhappy Friends

**Difficulty:** Medium
**Category:** Array, Simulation

## Problem

Given `n` friends paired up (`pairs`) and each friend's preference order ranking every other friend, a friend `x` (paired with `y`) is unhappy if there exists another friend `u` (paired with `v`) such that `x` prefers `u` over `y`, and `u` prefers `x` over `v`. Return the number of unhappy friends.

### Example

```
Input: n = 4, preferences = [[1,2,3],[3,2,0],[3,1,0],[0,1,2]], pairs = [[0,1],[2,3]]
Output: 2
```

## Approach

Precompute an `order[x][y]` rank matrix from `preferences`, where a smaller rank means a higher preference. Record each friend's current partner. For every friend `x`, iterate over every other friend `u` that `x` prefers strictly more than their own current partner `y` (i.e., `order[x][u] < order[x][y]`); check whether `u`, in turn, prefers `x` over their own current partner `v`. If so, `x` is unhappy — count it and move to the next friend.

## C# Solution

```csharp
public class Solution
{
    public int UnhappyFriends(int n, int[][] preferences, int[][] pairs)
    {
        int[,] order = new int[n, n];
        for (int i = 0; i < n; i++)
        {
            for (int rank = 0; rank < preferences[i].Length; rank++)
            {
                order[i, preferences[i][rank]] = rank;
            }
        }

        int[] partner = new int[n];
        foreach (int[] pair in pairs)
        {
            partner[pair[0]] = pair[1];
            partner[pair[1]] = pair[0];
        }

        int unhappyCount = 0;

        for (int x = 0; x < n; x++)
        {
            int y = partner[x];
            bool isUnhappy = false;

            foreach (int u in preferences[x])
            {
                if (order[x, u] >= order[x, y])
                {
                    break;
                }

                int v = partner[u];
                if (order[u, x] < order[u, v])
                {
                    isUnhappy = true;
                    break;
                }
            }

            if (isUnhappy)
            {
                unhappyCount++;
            }
        }

        return unhappyCount;
    }
}
```

## Complexity

- **Time:** `O(n^2)` — building the rank matrix and checking every friend's preference list.
- **Space:** `O(n^2)` for the rank matrix.
