# 2923. Find Champion I

**Difficulty:** Easy
**Category:** Array, Matrix

## Problem

There are `n` teams numbered from 0 to n-1. You are given a 2D boolean matrix `grid` of size n x n where `grid[i][j]` is `true` if team i is stronger than team j, otherwise `false`.

A team is a champion if it is stronger than all other teams. Return the champion team, or -1 if there is no champion.

### Example

```
Input: grid = [[false,true],[false,false]]
Output: 0
Explanation: Team 0 is stronger than team 1, so team 0 is the champion.
```

## Approach

A team i is a champion if row i contains all `true` values (except grid[i][i] which is the team comparing to itself). Count the number of teams that each team beats. The team that beats all others (n-1 teams) is the champion.

## C# Solution

```csharp
public class Solution
{
    public int FindChampion(int[][] grid)
    {
        int n = grid.Length;
        
        for (int i = 0; i < n; i++)
        {
            int wins = 0;
            for (int j = 0; j < n; j++)
            {
                if (i != j && grid[i][j])
                {
                    wins++;
                }
            }
            
            if (wins == n - 1)
            {
                return i;
            }
        }
        
        return -1;
    }
}
```

## Complexity

- **Time:** O(n²) to check all grid entries
- **Space:** O(1) using only constant extra space
