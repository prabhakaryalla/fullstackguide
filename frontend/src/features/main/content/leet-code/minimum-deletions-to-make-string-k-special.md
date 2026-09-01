# 3085. Minimum Deletions to Make String K-Special

**Difficulty:** Medium
**Category:** Hash Table, String, Counting, Greedy

## Problem

You are given a string `word` and an integer `k`. A string is "k-special" if, for every pair of distinct characters that appear in it, their frequencies differ by at most `k`. Return the minimum number of character deletions needed to make `word` k-special.

## Approach

Count the frequency of each of the 26 letters. Try every letter's frequency as the "baseline minimum" frequency `minFreq` the final string will keep. Given a chosen `minFreq`, any letter with frequency below `minFreq` must be deleted entirely (its frequency can't be raised, only lowered), and any letter with frequency above `minFreq + k` must have its excess above that cap deleted. Take the baseline that minimizes total deletions across all candidates.

## C# Solution

```csharp
public class Solution {
    public int MinimumDeletions(string word, int k) {
        int[] count = new int[26];
        foreach (char c in word)
            count[c - 'a']++;

        int ans = int.MaxValue;
        foreach (int minFreq in count) {
            int deletions = 0;
            foreach (int freq in count) {
                if (freq < minFreq)
                    deletions += freq;
                else
                    deletions += Math.Max(0, freq - (minFreq + k));
            }
            ans = Math.Min(ans, deletions);
        }

        return ans;
    }
}
```

## Complexity

- Time: O(n + 26^2) — counting letters plus trying each of the 26 possible baselines.
- Space: O(1) — the fixed 26-slot frequency array.
