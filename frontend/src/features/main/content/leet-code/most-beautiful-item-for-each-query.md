# 2070. Most Beautiful Item for Each Query

**Difficulty:** Medium
**Category:** Array, Binary Search, Sorting

## Problem

You are given a 2D array `items`, where `items[i] = [price, beauty]`, and an integer array `queries`. For each `queries[j]`, find the maximum beauty of any item whose price is **at most** `queries[j]`; if no such item exists, the answer is `0`. Return an array of answers, one per query.

## Approach

Sort `items` by price. Build a running prefix-maximum of beauty values over the sorted items, so `prefixMaxBeauty[i]` holds the best beauty achievable using any item among the first `i + 1` (by price). For each query, binary search for the rightmost item whose price is `<= query`; if found, the answer is the prefix-maximum beauty up to that index, otherwise `0`.

## C# Solution

```csharp
public class Solution
{
    public int[] MaximumBeauty(int[][] items, int[] queries)
    {
        Array.Sort(items, (a, b) => a[0].CompareTo(b[0]));

        int n = items.Length;
        var prices = new int[n];
        var prefixMaxBeauty = new int[n];

        for (int i = 0; i < n; i++)
        {
            prices[i] = items[i][0];
            prefixMaxBeauty[i] = i == 0
                ? items[i][1]
                : Math.Max(prefixMaxBeauty[i - 1], items[i][1]);
        }

        var result = new int[queries.Length];
        for (int q = 0; q < queries.Length; q++)
        {
            int idx = UpperBound(prices, queries[q]) - 1;
            result[q] = idx >= 0 ? prefixMaxBeauty[idx] : 0;
        }

        return result;
    }

    private int UpperBound(int[] prices, int value)
    {
        int lo = 0, hi = prices.Length;
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (prices[mid] <= value) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
```

## Complexity

- **Time:** `O((n + q) log n)`.
- **Space:** `O(n)` for the sorted prices and prefix-max array.
