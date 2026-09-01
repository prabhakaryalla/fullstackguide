# 3213. Construct String with Minimum Cost

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, String

## Problem
Given a target string and a list of candidate `words` each with an associated cost, determine the minimum total cost to construct the target string by concatenating chosen words (each word may be used any number of times) exactly matching the target character by character. Return -1 if it's impossible.

## Approach
Use dynamic programming where `dp[i]` represents the minimum cost to construct the prefix `target[0..i)`. Group the candidate words by their starting character for efficient lookups, and for each starting character keep only the minimum cost among words that share both that starting character and identical text (deduplicating repeated words). For each position `i` in the target, look up all candidate words starting with `target[i]`, and for each candidate word that matches the target starting at position `i` (verified via direct substring comparison), update `dp[i + wordLength]` with the better of its current value or `dp[i] + wordCost`. The final answer is `dp[n]`, or -1 if it remains unreachable (still at the initial "infinity" sentinel).

## C# Solution
```csharp
public class Solution {
    public int MinimumCost(string target, string[] words, int[] costs) {
        const int kMax = 1_000_000_000;
        int n = target.Length;
        int[] dp = new int[n + 1];
        Array.Fill(dp, kMax);
        dp[0] = 0;

        Dictionary<string, int>[] minCost = new Dictionary<string, int>[26];
        for (int i = 0; i < 26; i++)
            minCost[i] = new Dictionary<string, int>();

        for (int i = 0; i < words.Length; i++) {
            int index = words[i][0] - 'a';
            string word = words[i];
            int cur = minCost[index].GetValueOrDefault(word, kMax);
            minCost[index][word] = Math.Min(cur, costs[i]);
        }

        for (int i = 0; i < n; i++) {
            if (dp[i] == kMax)
                continue;
            foreach (var kv in minCost[target[i] - 'a']) {
                string word = kv.Key;
                int cost = kv.Value;
                int j = i + word.Length;
                if (j <= n && cost + dp[i] < dp[j] &&
                    string.CompareOrdinal(target, i, word, 0, word.Length) == 0)
                    dp[j] = cost + dp[i];
            }
        }

        return dp[n] == kMax ? -1 : dp[n];
    }
}
```

## Complexity
- Time: O(n^2) in the worst case
- Space: O(sum of word lengths)
