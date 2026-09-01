# 472. Concatenated Words

**Difficulty:** Hard
**Category:** Array, String, Dynamic Programming, Trie

## Problem

Given an array of unique strings `words`, return all the concatenated words in `words` — words that are entirely formed by concatenating at least two shorter words from the same array.

### Example

```
Input: words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
Output: ["catsdogcats","dogcatsdog","ratcatdogcat"]
```

### Constraints

- `1 <= words.length <= 10^4`
- `1 <= words[i].length <= 30`
- `words[i]` consists of only lowercase English letters.
- All strings of `words` are unique.

## Approach

Put all words into a set for `O(1)` lookups. For each word, run a word-break style dynamic program: `dp[i]` is `true` if the prefix of length `i` can be split into one or more dictionary words. To ensure at least two pieces are used, explicitly disallow the single split covering the whole word as one piece; a word qualifies if `dp[word.Length]` ends up `true`.

## C# Solution

```csharp
public class Solution
{
    public IList<string> FindAllConcatenatedWordsInADict(string[] words)
    {
        var wordSet = new HashSet<string>(words);
        var result = new List<string>();

        foreach (var word in words)
        {
            if (CanForm(word, wordSet))
                result.Add(word);
        }

        return result;
    }

    private bool CanForm(string word, HashSet<string> wordSet)
    {
        if (word.Length == 0) return false;

        var dp = new bool[word.Length + 1];
        dp[0] = true;

        for (int i = 1; i <= word.Length; i++)
        {
            for (int j = 0; j < i; j++)
            {
                if (!dp[j]) continue;
                if (j == 0 && i == word.Length) continue;

                var piece = word.Substring(j, i - j);
                if (wordSet.Contains(piece))
                {
                    dp[i] = true;
                    break;
                }
            }
        }

        return dp[word.Length];
    }
}
```

## Complexity

- **Time:** `O(sum(word.Length^2))` across all words.
- **Space:** `O(sum(word.Length))` for the DP arrays.
