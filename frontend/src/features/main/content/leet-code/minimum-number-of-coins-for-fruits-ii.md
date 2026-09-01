# 2969. Minimum Number of Coins for Fruits II

**Difficulty:** Hard
**Note:** This is a LeetCode premium (subscriber-only) problem.
**Category:** Array, Dynamic Programming, Greedy, Queue

## Problem

There are `n` fruits numbered `1` to `n` in a row, with `prices[i]` being the cost to buy fruit `i + 1` (0-indexed array). Buying fruit `i` (1-indexed) grants all fruits from `i + 1` to `2i` for free. You can still choose to buy an already-free fruit if that's cheaper overall. Return the minimum coins needed to acquire all fruits.

### Example

Input: `prices = [3,1,2]`
Output: `4`

## Approach

Let `dp[i]` be the minimum cost to acquire fruits `1..i`. The last fruit actually purchased to complete coverage up to `i` must be some `j` with `j <= i` and `2j >= i` (i.e., `j >= ceil(i / 2)`), contributing `dp[j - 1] + prices[j - 1]`. So `dp[i] = min` over that range of `j`.

Since both the window's left bound `ceil(i / 2)` and right bound `i` increase monotonically as `i` grows, this range-minimum can be maintained with a monotonic deque (classic sliding-window-minimum technique) in amortized O(1) per step: as `i` increases, push candidate `j = i` (popping any deque-tail candidates with a larger value), then pop any deque-head candidates that fell below the window's left bound, and read the minimum from the front.

## C# Solution

```csharp
public class Solution 
{
    public long MinimumCoins(int[] prices) 
    {
        int n = prices.Length;
        long[] dp = new long[n + 1];
        dp[0] = 0;
        
        int[] dq = new int[n + 1];
        int head = 0;
        int tail = 0;
        
        for (int i = 1; i <= n; i++) 
        {
            long value = dp[i - 1] + prices[i - 1];
            
            while (tail > head) 
            {
                int lastJ = dq[tail - 1];
                long lastValue = dp[lastJ - 1] + prices[lastJ - 1];
                if (lastValue >= value) 
                {
                    tail--;
                } 
                else 
                {
                    break;
                }
            }
            dq[tail++] = i;
            
            int lowerBound = (i + 1) / 2;
            while (dq[head] < lowerBound) 
            {
                head++;
            }
            
            int bestJ = dq[head];
            dp[i] = dp[bestJ - 1] + prices[bestJ - 1];
        }
        return dp[n];
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
