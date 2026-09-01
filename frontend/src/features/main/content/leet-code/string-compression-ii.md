# 1531. String Compression II

**Difficulty:** Hard
**Category:** String, Dynamic Programming

## Problem

Run-length encoding compresses a string by replacing runs of identical characters with the character followed by the run's length (if greater than 1). Given a string `s` and an integer `k`, you may delete up to `k` characters from `s` before compressing it. Return the minimum possible length of the run-length-encoded result.

### Example

```
Input: s = "aaabcccd", k = 2
Output: 4
Explanation: Delete "b" and one "d" to get "aaaccc" which compresses to "a3c3" (length 4).
```

## Approach

Use memoized recursion `Dp(i, k)`: the minimum compressed length for `s[i:]` given `k` remaining deletions. Two choices at each step: delete `s[i]` outright (`Dp(i + 1, k - 1)`), or keep `s[i]` and extend a run of that same character forward, optionally deleting other characters that interrupt the run (as long as the deletion budget allows), adding the compressed-length contribution of that run plus the result of the remaining suffix.

## C# Solution

```csharp
public class Solution
{
    private string s = string.Empty;
    private int n;
    private int[,] memo = null!;

    public int GetLengthOfOptimalCompression(string s, int k)
    {
        this.s = s;
        n = s.Length;
        memo = new int[n + 1, k + 1];
        for (int i = 0; i <= n; i++)
        {
            for (int j = 0; j <= k; j++)
            {
                memo[i, j] = -1;
            }
        }

        return Dp(0, k);
    }

    private int Dp(int i, int k)
    {
        if (k < 0)
        {
            return int.MaxValue / 2;
        }

        if (i >= n)
        {
            return 0;
        }

        if (memo[i, k] != -1)
        {
            return memo[i, k];
        }

        int best = k > 0 ? Dp(i + 1, k - 1) : int.MaxValue / 2;

        int count = 0;
        int deletions = 0;

        for (int j = i; j < n && deletions <= k; j++)
        {
            if (s[j] == s[i])
            {
                count++;
            }
            else
            {
                deletions++;
            }

            if (deletions <= k)
            {
                best = Math.Min(best, EncodedLength(count) + Dp(j + 1, k - deletions));
            }
        }

        memo[i, k] = best;
        return best;
    }

    private int EncodedLength(int count)
    {
        if (count == 1)
        {
            return 1;
        }
        if (count < 10)
        {
            return 2;
        }
        if (count < 100)
        {
            return 3;
        }
        return 4;
    }
}
```

## Complexity

- **Time:** `O(n^2 * k)` — `n * k` distinct states, each doing up to `O(n)` work to extend a run.
- **Space:** `O(n * k)` for the memoization table.
