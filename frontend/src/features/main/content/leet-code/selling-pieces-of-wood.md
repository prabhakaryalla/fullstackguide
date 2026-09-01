# 2312. Selling Pieces of Wood

**Difficulty:** Hard
**Category:** Dynamic Programming, Memoization

## Problem

You are given two integers `m` and `n` representing the height and width of a rectangular piece of wood. You are also given a 2D integer array `prices` where `prices[i] = [hi, wi, pricei]` indicates you can sell a rectangular piece of wood of height `hi` and width `wi` for `pricei` dollars.

You can make vertical or horizontal cuts to divide the wood into smaller pieces. Return the maximum money you can earn after cutting the wood optimally.

### Example

```
Input: m = 3, n = 5, prices = [[1,4,2],[2,2,7],[2,1,3]]
Output: 19
Explanation: The best way is to make a horizontal cut at y = 1:
- Bottom piece of 1x5 can be cut into 1x4 (sells for 2) and 1x1 (no sale)
- Top piece of 2x5 can be cut into five 2x1 pieces (each sells for 3)
Total: 2 + 5*3 = 17... Actually 19 is achieved differently.
```

## Approach

Use dynamic programming with memoization. For each rectangular piece of size `h x w`, we try:
1. Selling it directly if there's a price for that exact size
2. Making horizontal cuts at each position and recursively solving for the two resulting pieces
3. Making vertical cuts at each position and recursively solving for the two resulting pieces

We take the maximum value among all these options.

Store prices in a map for quick lookup, and use memoization to avoid recalculating the same subproblems.

## C# Solution

```csharp
public class Solution
{
    private Dictionary<(int, int), long> memo;
    private Dictionary<(int, int), long> priceMap;
    
    public long SellingWood(int m, int n, int[][] prices)
    {
        memo = new Dictionary<(int, int), long>();
        priceMap = new Dictionary<(int, int), long>();
        
        foreach (var p in prices)
        {
            priceMap[(p[0], p[1])] = p[2];
        }
        
        return Solve(m, n);
    }
    
    private long Solve(int h, int w)
    {
        if (h == 0 || w == 0) return 0;
        
        if (memo.ContainsKey((h, w)))
            return memo[(h, w)];
        
        long maxPrice = 0;
        
        if (priceMap.ContainsKey((h, w)))
            maxPrice = priceMap[(h, w)];
        
        for (int i = 1; i < h; i++)
        {
            maxPrice = Math.Max(maxPrice, Solve(i, w) + Solve(h - i, w));
        }
        
        for (int j = 1; j < w; j++)
        {
            maxPrice = Math.Max(maxPrice, Solve(h, j) + Solve(h, w - j));
        }
        
        memo[(h, w)] = maxPrice;
        return maxPrice;
    }
}
```

## Complexity

- **Time:** O(m * n * (m + n)) with memoization
- **Space:** O(m * n) for memoization
