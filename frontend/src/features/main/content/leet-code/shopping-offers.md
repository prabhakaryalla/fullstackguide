# 638. Shopping Offers

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Backtracking

## Problem

Given the `price` of each item, a list of `special` offers (each a bundle of item quantities plus a bundle price), and the `needs` (quantity needed of each item), return the minimum cost to fulfill exactly the required needs, optionally using any combination of special offers (never buying more than needed of any item).

### Example

```
Input: price = [2,5], special = [[3,0,5],[1,2,10]], needs = [3,2]
Output: 14
```

### Constraints

- `1 <= price.length <= 6`
- `1 <= special.length <= 100`

## Approach

Use recursive backtracking over the remaining needs. At each call, compute the baseline cost of buying everything remaining at full individual price. Then try applying each special offer that doesn't overshoot any remaining need, recursing on the reduced needs and adding that offer's bundle price; keep the minimum cost found across the baseline and every applicable offer.

## C# Solution

```csharp
public class Solution
{
    public int ShoppingOffers(IList<int> price, IList<IList<int>> special, IList<int> needs)
    {
        return Dfs(price, special, new List<int>(needs));
    }

    private int Dfs(IList<int> price, IList<IList<int>> special, List<int> needs)
    {
        int minCost = DirectCost(price, needs);

        foreach (var offer in special)
        {
            var nextNeeds = new List<int>();
            bool valid = true;

            for (int i = 0; i < needs.Count; i++)
            {
                int remaining = needs[i] - offer[i];
                if (remaining < 0) { valid = false; break; }

                nextNeeds.Add(remaining);
            }

            if (!valid) continue;

            int cost = offer[^1] + Dfs(price, special, nextNeeds);
            minCost = Math.Min(minCost, cost);
        }

        return minCost;
    }

    private int DirectCost(IList<int> price, List<int> needs)
    {
        int cost = 0;
        for (int i = 0; i < needs.Count; i++)
            cost += price[i] * needs[i];

        return cost;
    }
}
```

## Complexity

- **Time:** Exponential in the worst case, bounded in practice by the small limits on item and offer counts.
- **Space:** `O(items)` for the recursion stack.
