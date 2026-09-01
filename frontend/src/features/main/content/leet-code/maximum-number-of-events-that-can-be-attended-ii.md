# 1751. Maximum Number of Events That Can Be Attended II

**Difficulty:** Hard
**Category:** Array, Binary Search, Dynamic Programming, Sorting

## Problem

Given `events` where `events[i] = [startDayi, endDayi, valuei]` and an integer `k`, you may attend at most `k` non-overlapping events. Return the maximum sum of values obtainable.

### Example

```
Input: events = [[1,2,4],[3,4,3],[2,3,1]], k = 2
Output: 7
```

## Approach

Sort events by start day. Define `dp[c][i]` as the best value achievable using at most `c` remaining event picks, starting the search from event `i`. For each event, either skip it (`dp[c][i+1]`) or take it and jump to the next event whose start day is after the current one's end day (found via binary search), adding its value plus `dp[c-1][next]`.

## C# Solution

```csharp
public class Solution
{
    public int MaxValue(int[][] events, int k)
    {
        Array.Sort(events, (a, b) => a[0] - b[0]);
        int n = events.Length;
        int[,] dp = new int[k + 1, n + 1];

        for (int i = n - 1; i >= 0; i--)
        {
            int lo = i + 1, hi = n;
            while (lo < hi)
            {
                int mid = lo + (hi - lo) / 2;
                if (events[mid][0] > events[i][1]) hi = mid;
                else lo = mid + 1;
            }
            int next = lo;

            for (int c = 1; c <= k; c++)
                dp[c, i] = Math.Max(dp[c, i + 1], events[i][2] + dp[c - 1, next]);
        }

        return dp[k, 0];
    }
}
```

## Complexity

- **Time:** `O(n log n + n * k)`.
- **Space:** `O(n * k)`.
