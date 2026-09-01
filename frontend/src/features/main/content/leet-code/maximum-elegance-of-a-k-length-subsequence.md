# 2813. Maximum Elegance of a K-Length Subsequence

**Difficulty:** Hard
**Category:** Array, Greedy, Sorting, Heap (Priority Queue)

## Problem

You are given a 0-indexed 2D array `items` of length `n` where `items[i] = [profitᵢ, categoryᵢ]` denotes the profit and category of the `iᵗʰ` item, and an integer `k`.

The elegance of a subsequence of `k` items is defined as `total_profit + distinct_categories²`.

Return the maximum elegance you can achieve by selecting exactly `k` items from `items`.

### Example

```
Input: items = [[3,2],[5,1],[10,1]], k = 2
Output: 17
Explanation: Select items 0 and 1. Profit = 3 + 5 = 8, categories = 2, elegance = 8 + 4 = 12.
Or select items 1 and 2. Profit = 5 + 10 = 15, categories = 2, elegance = 15 + 4 = 19... wait, both have category 1!
Actually: select items 0 and 2. Profit = 13, distinct categories = 2, elegance = 13 + 4 = 17.
```

## Approach

Greedy approach with careful bookkeeping:

1. Sort items by profit in descending order
2. Greedily select the first k items (maximizes profit initially)
3. Track categories and maintain a list of duplicate-category items
4. Try replacing duplicate items with items of new categories
5. Calculate elegance at each step and track the maximum

The key insight is that initially we want maximum profit, but as we add distinct categories, the quadratic bonus can offset lower profits.

## C# Solution

```csharp
public class Solution
{
    public long FindMaximumElegance(int[][] items, int k)
    {
        Array.Sort(items, (a, b) => b[0].CompareTo(a[0]));
        
        long totalProfit = 0;
        var categories = new HashSet<int>();
        var duplicates = new Stack<int>();
        long maxElegance = 0;
        
        for (int i = 0; i < items.Length; i++)
        {
            int profit = items[i][0];
            int category = items[i][1];
            
            if (i < k)
            {
                totalProfit += profit;
                if (categories.Contains(category))
                {
                    duplicates.Push(profit);
                }
                else
                {
                    categories.Add(category);
                }
            }
            else
            {
                if (categories.Contains(category) || duplicates.Count == 0)
                {
                    continue;
                }
                
                totalProfit -= duplicates.Pop();
                totalProfit += profit;
                categories.Add(category);
            }
            
            long elegance = totalProfit + (long)categories.Count * categories.Count;
            maxElegance = Math.Max(maxElegance, elegance);
        }
        
        return maxElegance;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(k) for tracking categories and duplicates
