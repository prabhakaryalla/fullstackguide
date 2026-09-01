# 3562. Maximum Profit from Trading Stocks with Discounts

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Tree, Depth-First Search

## Problem
You are given an integer `n` representing the number of employees in a company, each with a unique ID from 1 to `n`; employee 1 is the CEO and is the direct or indirect boss of every employee. You are given two 1-indexed integer arrays `present` and `future`, each of length `n`, where `present[i]` is the price at which employee `i` can buy a stock today, and `future[i]` is the price at which they can sell it tomorrow.

The company hierarchy is given as a 2D array `hierarchy`, where `hierarchy[i] = [ui, vi]` means `ui` is the direct boss of `vi`. You also have an integer `budget`.

Discount policy: if an employee's direct boss purchases their own stock, the employee can buy their own stock at half price, `floor(present[v] / 2)`.

Return the maximum profit achievable without exceeding `budget`. Each stock may be bought at most once, and only the given `budget` may be spent (profit cannot be reinvested).

### Example

```
Input: n = 3, present = [5,2,3], future = [8,5,6], hierarchy = [[1,2],[2,3]], budget = 7
Output: 12
Explanation: Employee 1 buys at 5 (profit 3). Employee 2 gets discount floor(2/2)=1 (profit 4).
Employee 3 gets discount floor(3/2)=1 (profit 5). Total cost 5+1+1=7, total profit 3+4+5=12.
```

**Constraints:**
- `1 <= n <= 160`
- `1 <= present[i], future[i] <= 50`
- `1 <= budget <= 160`
- The hierarchy graph is a valid tree rooted at employee 1.

## Approach
This is a tree "knapsack" dynamic programming problem. For each node `u`, compute two arrays indexed by budget: `pb0[u]` (max profit in the subtree of `u` given `u`'s parent did **not** buy, so `u` pays full price if it buys) and `pb1[u]` (max profit given the parent **did** buy, so `u` pays the discounted price).

For each node, first merge the children's DP arrays using a standard bounded-knapsack combine (choosing how to split the available budget among children), computing `mergedBuy` (children evaluated assuming `u` buys, i.e. using each child's `pb1`) and `mergedNotBuy` (children evaluated assuming `u` doesn't buy, using each child's `pb0`). Then combine with `u`'s own choice to buy (at full or discounted price) or skip, taking the better of the two options for each budget value, and enforce monotonicity (using at most `b` budget is always at least as good as at most `b-1`).

## C# Solution

```csharp
public class Solution 
{
    private int[] present, future;
    private List<int>[] children;
    private int budget;

    public long MaximumProfit(int n, int[] present, int[] future, int[][] hierarchy, int budget) 
    {
        this.present = present;
        this.future = future;
        this.budget = budget;
        children = new List<int>[n + 1];
        for (int i = 1; i <= n; i++) children[i] = new List<int>();
        foreach (var h in hierarchy)
        {
            children[h[0]].Add(h[1]);
        }

        var (pb0, _) = Dfs(1);
        return pb0[budget];
    }

    private (long[] pb0, long[] pb1) Dfs(int u)
    {
        long[] mergedBuy = new long[budget + 1];
        long[] mergedNotBuy = new long[budget + 1];

        foreach (int c in children[u])
        {
            var (childPb0, childPb1) = Dfs(c);
            mergedBuy = Combine(mergedBuy, childPb1);
            mergedNotBuy = Combine(mergedNotBuy, childPb0);
        }

        long[] pb0 = new long[budget + 1];
        long[] pb1 = new long[budget + 1];

        int priceFull = present[u - 1];
        int priceDiscount = present[u - 1] / 2;

        for (int b = 0; b <= budget; b++)
        {
            long notBuyProfit = mergedNotBuy[b];

            long buyProfitFull = priceFull <= b
                ? future[u - 1] - priceFull + mergedBuy[b - priceFull]
                : long.MinValue;
            pb0[b] = Math.Max(notBuyProfit, buyProfitFull);

            long buyProfitDiscount = priceDiscount <= b
                ? future[u - 1] - priceDiscount + mergedBuy[b - priceDiscount]
                : long.MinValue;
            pb1[b] = Math.Max(notBuyProfit, buyProfitDiscount);
        }

        for (int b = 1; b <= budget; b++)
        {
            pb0[b] = Math.Max(pb0[b], pb0[b - 1]);
            pb1[b] = Math.Max(pb1[b], pb1[b - 1]);
        }

        return (pb0, pb1);
    }

    private long[] Combine(long[] a, long[] b)
    {
        long[] result = new long[budget + 1];
        for (int c = 0; c <= budget; c++)
        {
            long best = 0;
            for (int t = 0; t <= c; t++)
            {
                best = Math.Max(best, a[c - t] + b[t]);
            }
            result[c] = best;
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(n * budget^2), for the tree knapsack merges.
- **Space:** O(n * budget), for the DP arrays across the recursion.
