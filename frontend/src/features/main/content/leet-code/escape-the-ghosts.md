# 789. Escape The Ghosts

**Difficulty:** Medium
**Category:** Array, Math

## Problem

You start at `(0, 0)` and want to reach `target`, moving one unit in any direction per turn. Several `ghosts` also move one unit per turn optimally trying to catch you. Return `true` if you can reach the target before any ghost catches you (a ghost catching you at the same time you reach the target also counts as being caught).

### Example

```
Input: ghosts = [[1,0],[0,3]], target = [0,1]
Output: true
```

## Approach

Since movement is by Manhattan distance and both you and the ghosts move optimally, you can safely reach the target only if your Manhattan distance to the target is strictly less than every ghost's Manhattan distance to the target — a ghost can always intercept you at the target (or earlier) if it can reach the target in equal or fewer moves than you.

## C# Solution

```csharp
public class Solution
{
    public bool EscapeGhosts(int[][] ghosts, int[] target)
    {
        int myDistance = Math.Abs(target[0]) + Math.Abs(target[1]);

        foreach (var ghost in ghosts)
        {
            int ghostDistance = Math.Abs(ghost[0] - target[0]) + Math.Abs(ghost[1] - target[1]);
            if (ghostDistance <= myDistance) return false;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(g)`, where `g` is the number of ghosts.
- **Space:** `O(1)` extra.
