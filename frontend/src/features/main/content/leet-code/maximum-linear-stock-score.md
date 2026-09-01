# 2898. Maximum Linear Stock Score

**Difficulty:** Medium
**Category:** Array, Hash Table
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a 1-indexed integer array `prices`, where `prices[i]` is the price of a stock on the `i`-th day. A "linear" selection of days `d1 < d2 < ... < dm` is one where `prices[di] - di` is the same constant for every selected day. The score of a selection is the sum of the selected prices. Return the maximum possible score of a linear selection.

### Example

`prices = [1,5,3,7,8]` → answer `20` (days `1,3,5` have `prices[d]-d` equal to `0,0,3`... choosing days `2,4,5` with `prices[d]-d = 3,3,3` gives sum `5+7+8=20`).

## Approach

Group the 1-indexed days by the constant `prices[d] - d`. Any two days in the same group can be part of the same linear selection (their difference is identical by construction), and any selection with a consistent constant is entirely contained within one group. So the answer is the maximum sum of `prices` values across all groups.

## C# Solution

```csharp
public class Solution 
{
    public long MaxScore(int[] prices) 
    {
        var groupSums = new Dictionary<long, long>();
        for (int i = 0; i < prices.Length; i++)
        {
            long day = i + 1;
            long key = prices[i] - day;
            groupSums[key] = groupSums.TryGetValue(key, out long sum) ? sum + prices[i] : prices[i];
        }

        long best = 0;
        foreach (long sum in groupSums.Values)
        {
            if (sum > best)
            {
                best = sum;
            }
        }
        return best;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
