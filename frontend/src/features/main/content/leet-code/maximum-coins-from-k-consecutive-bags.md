# 3413. Maximum Coins From K Consecutive Bags

**Difficulty:** Medium
**Category:** Array, Binary Search, Prefix Sum

## Problem

There are an infinite number of bags on a number line, each numbered by a (potentially very large) integer position. You are given a 2D array `coins` where `coins[i] = [l, r, c]` means every bag from position `l` to `r` (inclusive) contains `c` coins. The given segments do not overlap. All bags not covered by any segment contain `0` coins.

You are also given an integer `k`. Choose `k` **consecutive** bag positions to maximize the total number of coins collected.

### Example

`coins = [[8,10,1],[1,3,2],[5,6,4]]`, `k = 4`

Sorted by start: `[1,3,2]`, `[5,6,4]`, `[8,10,1]`. Choosing the window `[5,8]` collects `[5,6,4]` fully (2 bags × 4 = 8) plus bag 8 from the third segment (1 coin) = `9`. Choosing `[1,4]` only collects 6 coins. The best window gives `9` coins.

## Approach

The optimal window's start position must align with either the start `l` of some segment or with `r - k + 1` for some segment (so the window ends exactly at that segment's end) — any other alignment can be shifted to one of these without losing coins. 

For each candidate start `s`, compute the sum of coins covered by `[s, s+k-1]` using binary search over the sorted segments to find the first segment whose end is `>= s` and the last segment whose start is `<= s+k-1`. Combine the full middle segments (via prefix sums) with the partial overlap of the first and last segments touched.

## C# Solution

```csharp
public class Solution 
{
    public long MaximumCoins(int[][] coins, int k) 
    {
        Array.Sort(coins, (a, b) => a[0].CompareTo(b[0]));
        int n = coins.Length;

        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) 
        {
            long len = coins[i][1] - coins[i][0] + 1L;
            prefix[i + 1] = prefix[i] + len * coins[i][2];
        }

        long best = 0;
        foreach (var seg in coins) 
        {
            best = Math.Max(best, WindowSum(coins, prefix, seg[0], k));
            best = Math.Max(best, WindowSum(coins, prefix, (long)seg[1] - k + 1, k));
        }
        return best;
    }

    private long WindowSum(int[][] coins, long[] prefix, long start, int k) 
    {
        long end = start + k - 1;
        int n = coins.Length;

        int lo = LowerBoundByEnd(coins, start);
        if (lo >= n || coins[lo][0] > end) 
        {
            return 0;
        }

        int hi = UpperBoundByStart(coins, end) - 1;
        if (hi < lo) 
        {
            return 0;
        }

        long sum = 0;
        if (hi > lo) 
        {
            sum += prefix[hi] - prefix[lo + 1];
        }

        sum += OverlapAmount(coins[lo], start, end);
        if (hi != lo) 
        {
            sum += OverlapAmount(coins[hi], start, end);
        }
        return sum;
    }

    private long OverlapAmount(int[] segment, long start, long end) 
    {
        long overlapStart = Math.Max(segment[0], start);
        long overlapEnd = Math.Min(segment[1], end);
        if (overlapEnd < overlapStart) 
        {
            return 0;
        }
        return (overlapEnd - overlapStart + 1) * segment[2];
    }

    private int LowerBoundByEnd(int[][] coins, long start) 
    {
        int lo = 0, hi = coins.Length;
        while (lo < hi) 
        {
            int mid = (lo + hi) / 2;
            if (coins[mid][1] >= start) 
            {
                hi = mid;
            } 
            else 
            {
                lo = mid + 1;
            }
        }
        return lo;
    }

    private int UpperBoundByStart(int[][] coins, long end) 
    {
        int lo = 0, hi = coins.Length;
        while (lo < hi) 
        {
            int mid = (lo + hi) / 2;
            if (coins[mid][0] > end) 
            {
                hi = mid;
            } 
            else 
            {
                lo = mid + 1;
            }
        }
        return lo;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
