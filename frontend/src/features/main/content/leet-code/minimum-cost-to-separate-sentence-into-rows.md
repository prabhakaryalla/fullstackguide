# 2052. Minimum Cost to Separate Sentence Into Rows

**Difficulty:** Medium
**Category:** String, Dynamic Programming
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a string `sentence` of space-separated words and an integer `k`. Split the words into consecutive rows (preserving order) so that the total number of characters in each row, including single spaces between words in that row, is at most `k`. The cost of a row is `(k - rowLength)^2`, except the last row, which always costs 0. Return the minimum possible total cost.

### Example

`sentence = "i love leetcode", k = 12` → one valid split is row `"i love"` (length 6, cost `(12-6)^2=36`) and row `"leetcode"` (last row, cost 0), total 36. A better split may reduce this further; the true minimum for this input is 2.

## Approach

Split the sentence into `words`. Let `dp[i]` be the minimum cost to arrange the first `i` words assuming every row (including the row ending at word `i`) incurs its squared-cost penalty. Compute `dp[i]` by trying every possible last row ending at word `i` (extending backwards while the row still fits in `k` characters) and taking the best `dp[j-1] + (k - rowLength)^2`. Because the true last row of the whole sentence is free, walk backwards from the final word merging it into a growing last row while it still fits within `k`, and the answer is the minimum `dp` value over that range of possible starting points for the (cost-free) final row.

## C# Solution

```csharp
public class Solution 
{
    public int MinimumCost(string sentence, int k) 
    {
        var words = sentence.Split(' ');
        int n = words.Length;
        if (sentence.Length <= k)
            return 0;

        int[] dp = new int[n + 1];

        for (int i = 1; i <= n; i++)
        {
            int len = words[i - 1].Length;
            dp[i] = dp[i - 1] + (k - len) * (k - len);
            for (int j = i - 1; j > 0; j--)
            {
                len += words[j - 1].Length + 1;
                if (len > k)
                    break;
                dp[i] = Math.Min(dp[i], dp[j - 1] + (k - len) * (k - len));
            }
        }

        int lastRowLen = words[n - 1].Length;
        int idx = n - 2;
        while (idx > 0 && lastRowLen + words[idx].Length + 1 <= k)
        {
            lastRowLen += words[idx].Length + 1;
            idx--;
        }

        int best = int.MaxValue;
        for (int i = idx + 1; i <= n; i++)
            best = Math.Min(best, dp[i]);

        return best;
    }
}
```

## Complexity

- **Time:** O(n^2)
- **Space:** O(n)
