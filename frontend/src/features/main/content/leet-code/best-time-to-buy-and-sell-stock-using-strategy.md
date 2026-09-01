# 3652. Best Time to Buy and Sell Stock using Strategy

**Difficulty:** Medium
**Category:** Array, Prefix Sum, Sliding Window

## Problem
You are given an integer array `prices` representing stock prices on consecutive days, an integer array `strategy` of the same length representing a trading strategy (for example, `1` meaning buy, `-1` meaning sell, `0` meaning hold, or similar signed multipliers), and an integer `k` representing the length of a contiguous block of days on which you may replace the strategy with an alternative "buy first half, sell second half" pattern (buy for the first `k/2` days of the block and sell for the remaining `k/2` days). You want to choose at most one contiguous block of length `k` in which to apply this replacement so as to maximize the total profit, where profit is computed as the sum of `strategy[i] * prices[i]` over all days, with the modified strategy applied inside the chosen block (if any). Return the maximum total profit achievable.

## Approach
First compute the baseline profit using the original strategy: `baseProfit = sum(strategy[i] * prices[i])`. For each candidate block of length `k` starting at index `i`, compute the difference between applying the special buy/sell pattern in that block versus the original strategy in that block: `delta = specialProfit(block) - originalProfit(block)`. The special pattern contributes `-prices[j]` for the first half of the block and `+prices[j]` for the second half. Use a sliding window (prefix sums of `prices`, `strategy[i] * prices[i]`, and the special-block value) to compute `delta` for every window of length `k` in O(1) amortized time as the window slides, and track the maximum delta (clamped to at least 0, since you may choose not to apply any block). The answer is `baseProfit + max(0, maxDelta)`.

## C# Solution

```csharp
public class Solution 
{
    public long MaxProfit(int[] prices, int[] strategy, int k) 
    {
        int n = prices.Length;
        long baseProfit = 0;
        for (int i = 0; i < n; i++) baseProfit += (long)strategy[i] * prices[i];

        // prefix[i] = sum of prices[0..i-1]
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + prices[i];

        long bestDelta = 0;
        long windowOriginal = 0;
        int half = k / 2;

        for (int i = 0; i < n; i++)
        {
            windowOriginal += (long)strategy[i] * prices[i];
            if (i >= k)
            {
                int outIdx = i - k;
                windowOriginal -= (long)strategy[outIdx] * prices[outIdx];
            }

            if (i >= k - 1)
            {
                int start = i - k + 1;
                int mid = start + half;
                long firstHalfSum = prefix[mid] - prefix[start];
                long secondHalfSum = prefix[i + 1] - prefix[mid];
                long special = secondHalfSum - firstHalfSum;
                long delta = special - windowOriginal;
                bestDelta = Math.Max(bestDelta, delta);
            }
        }

        return baseProfit + bestDelta;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
