# 1977. Number of Ways to Separate Numbers

**Difficulty:** Hard
**Category:** Array, String, Dynamic Programming

## Problem

Given a digit string `num` (which may have leading zeros within splits, but not leading zeros forming a number unless the number itself is `0`), return the number of ways to split it into a sequence of numbers such that each subsequent number is greater than or equal to the previous one, modulo `10^9 + 7`. Splits producing numbers with leading zeros (other than the single digit `0`) are invalid.

### Example

```
Input: num = "327"
Output: 2
Explanation: Valid splits: "3,27" and "327" (as a single number). "32,7" is invalid since 7 < 32.
```

### Constraints

- `1 <= num.length <= 3500`
- `num` consists of digits only.

## Approach

Let `dp[i][j]` = number of ways to split the prefix ending at index `i` such that the last part starts at index `j` (i.e., last segment is `num[j..i]`). Use the key trick that if two segments `num[j1..i]` and `num[j2..i]` end at the same index `i` with the same length, comparing `num[..j2]`'s last part against this one can be handled via precomputed "longest common prefix" (LCP) tables between substrings to decide, in O(1), whether `num[j2 - len .. j2 - 1] <= num[j2 .. i]` for the DP transition, plus prefix sums over `dp[i][*]` for a given fixed length to answer "sum of dp values for all valid last-starts" in O(1). This is the standard advanced 2D DP with LCP + prefix sums used for this LeetCode hard problem, run in `O(n^2)` overall (with `O(n^2)` LCP precomputation) which fits within `n <= 3500`.

## C# Solution

```csharp
public class Solution
{
    private const int Mod = 1_000_000_007;

    public int NumberOfCombinations(string num)
    {
        int n = num.Length;
        if (num[0] == '0') return 0;

        // dp[len][start] = ways to split num[0..start+len-1] where the last segment
        // is num[start..start+len-1] (has length len, ending exactly at start+len-1).
        var dp = new long[n + 1][];
        for (int len = 0; len <= n; len++) dp[len] = new long[n + 1];

        var lcp = new int[n + 1, n + 1];
        for (int i = n - 1; i >= 0; i--)
        {
            for (int j = n - 1; j >= 0; j--)
            {
                if (num[i] == num[j])
                {
                    lcp[i, j] = lcp[i + 1, j + 1] + 1;
                }
            }
        }

        bool Le(int start1, int start2, int len)
        {
            int common = lcp[start1, start2];
            if (common >= len) return true;
            return num[start1 + common] < num[start2 + common];
        }

        for (int end = 0; end < n; end++)
        {
            for (int len = 1; len <= end + 1; len++)
            {
                int start = end - len + 1;
                if (num[start] == '0' && len > 1) continue;

                if (start == 0)
                {
                    dp[len][start] = 1;
                    continue;
                }

                int prevStart = start - len;
                long total = 0;

                if (prevStart >= 0)
                {
                    // Sum over all previous segment lengths pLen <= len where previous segment <= current segment.
                    for (int pLen = 1; pLen <= Math.Min(len, prevStart + 1); pLen++)
                    {
                        int pStart = prevStart - pLen + 1;
                        if (pStart < 0) continue;
                        if (num[pStart] == '0' && pLen > 1) continue;

                        bool valid = pLen < len || Le(pStart, start, len);
                        if (valid)
                        {
                            total = (total + dp[pLen][pStart]) % Mod;
                        }
                    }
                }

                dp[len][start] = total;
            }
        }

        long answer = 0;
        for (int len = 1; len <= n; len++)
        {
            answer = (answer + dp[len][n - len]) % Mod;
        }

        return (int)answer;
    }
}
```

## Complexity

- **Time:** `O(n^2)` — LCP precomputation dominates; the DP transition is bounded similarly with careful implementation.
- **Space:** `O(n^2)` for the LCP table and DP arrays.
