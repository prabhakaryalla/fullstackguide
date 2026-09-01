# 3253. Construct String with Minimum Cost (Easy)

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, String

## Problem
This is a simpler-constraints variant of "Construct String with Minimum Cost": given a target string and a list of candidate words each with an associated cost, determine the minimum total cost to construct the target string by concatenating chosen words (each usable any number of times), or -1 if impossible.

## Approach
Use dynamic programming where `dp[i]` is the minimum cost to construct the prefix `target[0..i)`. For each position `i` from 1 to the target's length, and for each candidate word, check whether the word's length fits within the remaining prefix and whether the target's substring ending at `i` (of that word's length) exactly matches the candidate word; if so and the earlier prefix `dp[i - word.length]` is reachable, update `dp[i]` with the better of its current value or `dp[i - word.length] + wordCost`. Since constraints are smaller here, a direct nested loop over all words at every position (with substring comparison) is efficient enough.

## C# Solution
```csharp
public class Solution {
    public int MinimumCost(string target, string[] words, int[] costs) {
        int n = target.Length;
        int[] dp = new int[n + 1];
        Array.Fill(dp, int.MaxValue);
        dp[0] = 0;

        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < words.Length; j++) {
                int wl = words[j].Length;
                if (i >= wl &&
                    dp[i - wl] != int.MaxValue &&
                    string.CompareOrdinal(target, i - wl, words[j], 0, wl) == 0) {
                    dp[i] = Math.Min(dp[i], dp[i - wl] + costs[j]);
                }
            }
        }

        return dp[n] == int.MaxValue ? -1 : dp[n];
    }
}
```

## Complexity
- Time: O(|target| * |words| * |words[i]|)
- Space: O(|target|)
