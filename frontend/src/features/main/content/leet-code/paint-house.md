# 256. Paint House

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

There are `n` houses in a row, each of which can be painted red, blue, or green. The cost of painting each house a certain color is given by an `n x 3` cost matrix. Paint all houses so that no two adjacent houses have the same color, minimizing total cost, and return that minimum cost.

### Example

```
Input: costs = [[17,2,17],[16,16,5],[14,3,19]]
Output: 10
```

### Constraints

- `costs.length == n`
- `costs[i].length == 3`

## Approach

This is a straightforward dynamic programming problem: the minimum cost of painting house `i` with color `c` is `costs[i][c]` plus the minimum of the costs of painting house `i-1` with either of the other two colors. Carry forward just the previous house's three running totals and update them in place, avoiding a full 2D table.

## C# Solution

```csharp
public class Solution
{
    public int MinCost(int[][] costs)
    {
        if (costs.Length == 0) return 0;

        int red = costs[0][0], blue = costs[0][1], green = costs[0][2];

        for (int i = 1; i < costs.Length; i++)
        {
            int newRed = costs[i][0] + Math.Min(blue, green);
            int newBlue = costs[i][1] + Math.Min(red, green);
            int newGreen = costs[i][2] + Math.Min(red, blue);

            red = newRed;
            blue = newBlue;
            green = newGreen;
        }

        return Math.Min(red, Math.Min(blue, green));
    }
}
```

## Complexity

- **Time:** `O(n)` — one pass over the houses.
- **Space:** `O(1)` — only three running totals are kept.
