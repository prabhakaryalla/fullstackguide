# 265. Paint House II

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

There are `n` houses in a row, each of which can be painted with one of `k` colors. The cost of painting each house a certain color is given by an `n x k` cost matrix. Paint all houses so that no two adjacent houses share a color, minimizing total cost, and return that minimum cost.

### Example

```
Input: costs = [[1,5,3],[2,9,4]]
Output: 5
```

### Constraints

- `costs.length == n`
- `costs[i].length == k`

## Approach

Track, for the previous house, the minimum total cost and the second-minimum total cost (and which color achieved the minimum). For the current house's color `c`, the best total cost ending at `c` is `costs[i][c]` plus the previous minimum (if `c` wasn't the color that achieved that minimum) or the previous second-minimum (if it was). This avoids scanning all `k` previous colors for each current color, achieving `O(n*k)` instead of `O(n*k^2)`.

## C# Solution

```csharp
public class Solution
{
    public int MinCostII(int[][] costs)
    {
        if (costs.Length == 0) return 0;
        int k = costs[0].Length;

        int prevMinColor = -1;
        int prevMin = 0, prevSecondMin = 0;

        foreach (var houseCosts in costs)
        {
            int curMinColor = -1;
            int curMin = int.MaxValue, curSecondMin = int.MaxValue;

            for (int c = 0; c < k; c++)
            {
                int cost = houseCosts[c] + (c == prevMinColor ? prevSecondMin : prevMin);

                if (cost < curMin)
                {
                    curSecondMin = curMin;
                    curMin = cost;
                    curMinColor = c;
                }
                else if (cost < curSecondMin)
                {
                    curSecondMin = cost;
                }
            }

            prevMinColor = curMinColor;
            prevMin = curMin;
            prevSecondMin = curSecondMin;
        }

        return prevMin;
    }
}
```

## Complexity

- **Time:** `O(n * k)` — one pass over colors for each house.
- **Space:** `O(1)` — only a few running values are tracked.
