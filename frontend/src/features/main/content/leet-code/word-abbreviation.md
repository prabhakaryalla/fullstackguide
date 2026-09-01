# 527. Word Abbreviation

**Difficulty:** Hard
**Category:** Array, Trie, String, Greedy
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array of distinct strings `words`, return an array of the smallest possible abbreviation for each word such that all abbreviations remain unique among each other (an abbreviation replaces a middle run of characters with its count, and is only used if it's shorter than the original word).

### Example

```
Input: words = ["like","god","internal","me","internet","interval","intension","face","intrusion"]
Output: ["l2e","god","internal","me","i6t","interval","inte4n","f2e","intr4n"]
```

### Constraints

- `1 <= words.length <= 400`
- `2 <= words[i].length <= 400`
- All words are distinct.

## Approach

Start every word with the shortest possible abbreviation (just its first character kept literal). Group words by their current abbreviation; any group with more than one word has a conflict, so for every word in a conflicting group, extend its kept prefix by one more character and recompute its abbreviation. Repeat this grouping-and-extending process until every abbreviation is unique across the whole list.

## C# Solution

```csharp
public class Solution
{
    public IList<string> WordsAbbreviation(IList<string> words)
    {
        int n = words.Count;
        var prefixLength = new int[n];
        Array.Fill(prefixLength, 1);

        var result = new string[n];
        for (int i = 0; i < n; i++)
            result[i] = Abbreviate(words[i], prefixLength[i]);

        while (true)
        {
            var groups = new Dictionary<string, List<int>>();
            for (int i = 0; i < n; i++)
            {
                if (!groups.TryGetValue(result[i], out var list))
                {
                    list = new List<int>();
                    groups[result[i]] = list;
                }
                list.Add(i);
            }

            bool changed = false;
            foreach (var group in groups.Values)
            {
                if (group.Count <= 1) continue;

                changed = true;
                foreach (var index in group)
                {
                    prefixLength[index]++;
                    result[index] = Abbreviate(words[index], prefixLength[index]);
                }
            }

            if (!changed) break;
        }

        return result;
    }

    private string Abbreviate(string word, int prefixLength)
    {
        int abbreviatedLength = word.Length - prefixLength;
        if (abbreviatedLength <= 1) return word;

        return word.Substring(0, prefixLength) + abbreviatedLength + word[^1];
    }
}
```

## Complexity

- **Time:** `O(n^2 * L)` in the worst case, where `L` is the average word length.
- **Space:** `O(n * L)` for the abbreviation strings.
