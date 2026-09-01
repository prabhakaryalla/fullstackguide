# 1820. Maximum Number of Accepted Invitations

**Difficulty:** Medium
**Category:** Array, Greedy, Bipartite Matching, Depth-First Search

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `m x n` binary `grid` where `grid[i][j] == 1` means girl `i` is willing to accept an invitation from boy `j`, and each person can send/accept at most one invitation, return the maximum number of accepted invitations.

### Example

```
Input: grid = [[1,1,1],[1,0,1],[0,0,1]]
Output: 3
```

## Approach

This is maximum bipartite matching between girls and boys. Use Kuhn's algorithm: for each girl, attempt to find an augmenting path — try every boy she's willing to accept; if that boy is unmatched, or the boy's current match can be re-routed to a different acceptable boy (recursively), assign the boy to this girl. A fresh "visited boys" array is used per top-level augmenting attempt to avoid infinite loops. The total number of girls successfully matched is the answer.

## C# Solution

```csharp
public class Solution
{
    private int[][] _grid;
    private bool[] _visited;
    private int[] _matchedGirl;

    public int MaximumInvitations(int[][] grid)
    {
        _grid = grid;
        int m = grid.Length, n = grid[0].Length;
        _matchedGirl = new int[n];
        Array.Fill(_matchedGirl, -1);

        int result = 0;
        for (int girl = 0; girl < m; girl++)
        {
            _visited = new bool[n];
            if (TryMatch(girl, n)) result++;
        }

        return result;
    }

    private bool TryMatch(int girl, int n)
    {
        for (int boy = 0; boy < n; boy++)
        {
            if (_grid[girl][boy] == 1 && !_visited[boy])
            {
                _visited[boy] = true;
                if (_matchedGirl[boy] == -1 || TryMatch(_matchedGirl[boy], n))
                {
                    _matchedGirl[boy] = girl;
                    return true;
                }
            }
        }
        return false;
    }
}
```

## Complexity

- **Time:** `O(m * n * max(m, n))` in the worst case for the augmenting-path search over all girls.
- **Space:** `O(n)` for the matching and visited arrays.
