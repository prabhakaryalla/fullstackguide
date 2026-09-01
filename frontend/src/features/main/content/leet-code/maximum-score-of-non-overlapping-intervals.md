# 3414. Maximum Score of Non-Overlapping Intervals

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Sorting, Binary Search

## Problem
You are given a 2D integer array `intervals`, where `intervals[i] = [li, ri, weighti]` represents an interval spanning `[li, ri]` with weight `weighti`. Select a set of exactly 4 non-overlapping intervals (two intervals overlap unless one ends strictly before the other begins) so that the sum of their weights is maximized. If multiple selections achieve the maximum score, return the one whose sorted array of original indices is lexicographically smallest.

## Approach
Sort the intervals by right endpoint. Use dynamic programming over `dp[i][k]`, the best result using the first `i` sorted intervals while choosing exactly `k` of them, where each state stores both the best score and the lexicographically smallest sorted index list achieving it. For interval `i`, binary search among the sorted right endpoints for the count of earlier intervals whose right endpoint is strictly less than the current interval's left endpoint — those are the only intervals compatible with taking interval `i`. The transition either skips interval `i` (`dp[i-1][k]`) or takes it (`dp[j][k-1] + weight`, appending `i`'s original index and re-sorting). Ties in score are broken by comparing the two candidate index lists lexicographically and keeping the smaller one. The final answer is `dp[n][4]`.

## C# Solution

```csharp
public class Solution 
{
    public int[] MaximumWeight(IList<IList<int>> intervals) 
    {
        int n = intervals.Count;
        var arr = new (int l, int r, int w, int idx)[n];
        for (int i = 0; i < n; i++)
        {
            arr[i] = (intervals[i][0], intervals[i][1], intervals[i][2], i);
        }
        Array.Sort(arr, (a, b) => a.r != b.r ? a.r.CompareTo(b.r) : a.l.CompareTo(b.l));

        var bestScore = new long[n + 1, 5];
        var bestIdx = new List<int>[n + 1, 5];
        for (int k = 0; k <= 4; k++)
        {
            bestScore[0, k] = k == 0 ? 0 : long.MinValue;
            bestIdx[0, k] = new List<int>();
        }

        for (int i = 1; i <= n; i++)
        {
            var cur = arr[i - 1];

            int lo = 0, hi = i - 1;
            while (lo < hi)
            {
                int mid = (lo + hi + 1) / 2;
                if (arr[mid - 1].r < cur.l) lo = mid; else hi = mid - 1;
            }
            int pos = lo;

            for (int k = 0; k <= 4; k++)
            {
                long skipScore = bestScore[i - 1, k];
                List<int> skipIdx = bestIdx[i - 1, k];

                long takeScore = long.MinValue;
                List<int> takeIdx = null;
                if (k >= 1 && bestScore[pos, k - 1] != long.MinValue)
                {
                    takeScore = bestScore[pos, k - 1] + cur.w;
                    takeIdx = new List<int>(bestIdx[pos, k - 1]) { cur.idx };
                    takeIdx.Sort();
                }

                if (takeScore > skipScore || (takeScore == skipScore && takeIdx != null && IsLexSmaller(takeIdx, skipIdx)))
                {
                    bestScore[i, k] = takeScore;
                    bestIdx[i, k] = takeIdx;
                }
                else
                {
                    bestScore[i, k] = skipScore;
                    bestIdx[i, k] = skipIdx;
                }
            }
        }

        var result = bestIdx[n, 4];
        return result != null ? result.ToArray() : Array.Empty<int>();
    }

    private bool IsLexSmaller(List<int> a, List<int> b)
    {
        if (b == null) return true;
        int len = Math.Min(a.Count, b.Count);
        for (int i = 0; i < len; i++)
        {
            if (a[i] != b[i]) return a[i] < b[i];
        }
        return a.Count < b.Count;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
