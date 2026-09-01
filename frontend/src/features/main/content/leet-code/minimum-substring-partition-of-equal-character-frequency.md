# 3144. Minimum Substring Partition of Equal Character Frequency

**Difficulty:** Medium
**Category:** String, Dynamic Programming, Counting, Hash Table

## Problem

Given a string `s`, partition it into the minimum number of contiguous substrings such that every substring is "balanced" — meaning every distinct letter that appears in it appears the **same number of times**. Return the minimum number of substrings needed.

## Approach

Use a DP where `dp[i]` is the minimum number of balanced substrings needed to partition `s[0..i]`. For each ending position `i`, scan backward over every possible starting position `j`, maintaining a running letter-frequency count for `s[j..i]`; whenever that substring is balanced (all non-zero frequencies equal), it's a candidate last piece, so update `dp[i] = min(dp[i], 1 + dp[j-1])` (or `1` if `j == 0`).

## C# Solution

```csharp
public class Solution {
    public int MinimumSubstringsInPartition(string s) {
        int n = s.Length;
        int[] dp = new int[n];
        Array.Fill(dp, n);

        for (int i = 0; i < n; i++) {
            int[] count = new int[26];
            for (int j = i; j >= 0; j--) {
                count[s[j] - 'a']++;
                if (IsBalanced(count))
                    dp[i] = j > 0 ? Math.Min(dp[i], 1 + dp[j - 1]) : 1;
            }
        }

        return dp[n - 1];
    }

    // Returns true if every non-zero frequency is the same.
    private bool IsBalanced(int[] count) {
        int minFreq = int.MaxValue, maxFreq = 0;
        foreach (int freq in count) {
            if (freq > 0) {
                minFreq = Math.Min(minFreq, freq);
                maxFreq = Math.Max(maxFreq, freq);
            }
        }
        return minFreq == maxFreq;
    }
}
```

## Complexity

- Time: O(n^2) — for each ending position, scanning backward over all starting positions.
- Space: O(n) — the `dp` array (plus a fixed 26-slot count per inner loop).
