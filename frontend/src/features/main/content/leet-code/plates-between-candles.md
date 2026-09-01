# 2055. Plates Between Candles

**Difficulty:** Medium
**Category:** Array, String, Prefix Sum, Binary Search

## Problem

You are given a string `s` consisting of `'*'` (a plate) and `'|'` (a candle), and a 2D array `queries` where `queries[i] = [left, right]`. For each query, count the number of plates that lie **between two candles** within the substring `s[left..right]` (inclusive) — a plate only counts if there is at least one candle somewhere to its left and one to its right, both within the query range.

## Approach

Precompute a prefix-sum array of plate counts. Also precompute, for every index, the position of the nearest candle at or after it (`nextCandle`) and the nearest candle at or before it (`prevCandle`), via one left-to-right and one right-to-left sweep.

For a query `[left, right]`: the leftmost relevant candle is `nextCandle[left]` and the rightmost relevant candle is `prevCandle[right]`. If `nextCandle[left] <= prevCandle[right]`, the answer is the number of plates strictly between those two candle positions, computed via the prefix-sum array; otherwise there's no valid candle pair, so the answer is `0`.

## C# Solution

```csharp
public class Solution
{
    public int[] PlatesBetweenCandles(string s, int[][] queries)
    {
        int n = s.Length;
        var prefixPlates = new int[n + 1];
        for (int i = 0; i < n; i++)
            prefixPlates[i + 1] = prefixPlates[i] + (s[i] == '*' ? 1 : 0);

        var nextCandle = new int[n];
        int last = -1;
        for (int i = n - 1; i >= 0; i--)
        {
            if (s[i] == '|') last = i;
            nextCandle[i] = last;
        }

        var prevCandle = new int[n];
        last = -1;
        for (int i = 0; i < n; i++)
        {
            if (s[i] == '|') last = i;
            prevCandle[i] = last;
        }

        var result = new int[queries.Length];
        for (int q = 0; q < queries.Length; q++)
        {
            int left = nextCandle[queries[q][0]];
            int right = prevCandle[queries[q][1]];

            result[q] = (left != -1 && right != -1 && left < right)
                ? prefixPlates[right] - prefixPlates[left + 1]
                : 0;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n + queries.Length)`.
- **Space:** `O(n)` for the prefix and candle-position arrays.
