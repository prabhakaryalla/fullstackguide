# 2924. Find Champion II

**Difficulty:** Medium
**Category:** Graph

## Problem

There are `n` teams numbered from 0 to n-1. You are given an integer `n` and a 2D integer array `edges` where `edges[i] = [ui, vi]` indicates that team ui is stronger than team vi.

A team is a champion if no other team is stronger than it. Return the champion team, or -1 if there is no unique champion or multiple champions exist.

### Example

```
Input: n = 3, edges = [[0,1],[1,2]]
Output: 0
Explanation: Team 0 beats team 1, team 1 beats team 2. Team 0 is the champion as no team beats it.
```

## Approach

The champion is a team with in-degree 0 (no team beats it). Count the in-degree of each team by iterating through edges. If exactly one team has in-degree 0, it's the champion. Otherwise, return -1.

## C# Solution

```csharp
public class Solution
{
    public int FindChampion(int n, int[][] edges)
    {
        int[] inDegree = new int[n];
        
        foreach (var edge in edges)
        {
            inDegree[edge[1]]++;
        }
        
        int champion = -1;
        int count = 0;
        
        for (int i = 0; i < n; i++)
        {
            if (inDegree[i] == 0)
            {
                champion = i;
                count++;
            }
        }
        
        return count == 1 ? champion : -1;
    }
}
```

## Complexity

- **Time:** O(n + m) where m is the number of edges
- **Space:** O(n) for the in-degree array
