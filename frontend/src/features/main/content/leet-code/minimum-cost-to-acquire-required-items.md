# 3789. Minimum Cost to Acquire Required Items

**Difficulty:** Medium
**Category:** Math, Greedy

## Problem

Given `cost1`, `cost2`, `costBoth`, `need1`, `need2`: an item of type 1 costs `cost1` and satisfies 1 unit of requirement 1; type 2 costs `cost2` and satisfies requirement 2; type 3 costs `costBoth` and satisfies 1 unit of both requirements. Collect enough items so total contribution to requirement 1 is `>= need1` and to requirement 2 is `>= need2`. Return the minimum total cost.

### Example

Input: `cost1 = 3, cost2 = 2, costBoth = 1, need1 = 3, need2 = 2`
Output: `3`

Buying three type-3 items costs `3` and covers both requirements.

## Approach

Use `min(need1, need2)` "dual-purpose" units, each costing `min(costBoth, cost1+cost2)`. Cover the remaining excess of whichever requirement is larger using the cheaper of `costBoth` or the single-purpose item cost.

## C# Solution

```csharp
public class Solution 
{
    public long MinimumCost(int cost1, int cost2, int costBoth, int need1, int need2) 
    {
        long shared = Math.Min(need1, need2);
        long cost = shared * Math.Min(costBoth, (long)cost1 + cost2);

        long rem1 = need1 - shared;
        long rem2 = need2 - shared;
        cost += rem1 * Math.Min(costBoth, cost1);
        cost += rem2 * Math.Min(costBoth, cost2);
        return cost;
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
