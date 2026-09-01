# 1774. Closest Dessert Cost

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Backtracking

## Problem

Given `baseCosts` (ice cream base flavors, exactly one chosen) and `toppingCosts` (each topping may be used `0`, `1`, or `2` times), return the dessert cost closest to `target`; if multiple costs are equally close, return the cheaper one.

### Example

```
Input: baseCosts = [1,7], toppingCosts = [3,4], target = 10
Output: 10
```

## Approach

Since there are at most 10 toppings each with 3 choices (`3^10 ≈ 59000`), for every base cost run a small backtracking search over all topping-count combinations, updating the closest (and cheapest on ties) total cost found so far.

## C# Solution

```csharp
public class Solution
{
    private int best;
    private int bestDiff;
    private int target;

    public int ClosestCost(int[] baseCosts, int[] toppingCosts, int target)
    {
        this.target = target;
        best = baseCosts[0];
        bestDiff = Math.Abs(best - target);

        foreach (int baseCost in baseCosts)
            Dfs(toppingCosts, 0, baseCost);

        return best;
    }

    private void Dfs(int[] toppingCosts, int idx, int currentCost)
    {
        int diff = Math.Abs(currentCost - target);
        if (diff < bestDiff || (diff == bestDiff && currentCost < best))
        {
            bestDiff = diff;
            best = currentCost;
        }

        if (idx == toppingCosts.Length) return;

        for (int count = 0; count <= 2; count++)
            Dfs(toppingCosts, idx + 1, currentCost + count * toppingCosts[idx]);
    }
}
```

## Complexity

- **Time:** `O(baseCosts * 3^toppings)`.
- **Space:** `O(toppings)` for the recursion stack.
