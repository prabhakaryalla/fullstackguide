# 3137. Minimum Number of Operations to Make Word K-Periodic

**Difficulty:** Medium
**Category:** Hash Table, String, Counting

## Problem

You are given a string `word` whose length is a multiple of `k`. In one operation you may pick two indices `i` and `j` (both multiples of `k`) and replace the length-`k` substring at `i` with the length-`k` substring at `j`. Return the minimum number of operations needed to make `word` "k-periodic" (formed by repeating some length-`k` block).

## Approach

Split `word` into `word.Length / k` blocks of length `k`. Count how many times each distinct block occurs. The block with the highest frequency is the best candidate to repeat everywhere (it requires the fewest replacements, since every occurrence of the winning block needs zero operations). The answer is simply the total number of blocks minus the count of the most frequent block.

## C# Solution

```csharp
public class Solution {
    public int MinimumOperationsToMakeKPeriodic(string word, int k) {
        var count = new Dictionary<string, int>();
        int maxFreq = 0;

        for (int i = 0; i < word.Length; i += k) {
            string sub = word.Substring(i, k);
            count[sub] = count.GetValueOrDefault(sub) + 1;
        }

        foreach (int freq in count.Values)
            maxFreq = Math.Max(maxFreq, freq);

        return word.Length / k - maxFreq;
    }
}
```

## Complexity

- Time: O(n) — scanning the string once, splitting into O(n/k) blocks of length k.
- Space: O(n) — storing distinct blocks in the frequency map.
