# 642. Design Search Autocomplete System

**Difficulty:** Hard
**Category:** Design, Trie, String, Data Stream, Heap, Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Design a search autocomplete system that, as a user types characters one at a time, suggests the top 3 historical sentences matching the current input prefix, ranked by hot degree (frequency) and then lexicographical order. A `'#'` character signals the end of a search, adding the typed sentence to the historical data.

### Example

```
Input:
["AutocompleteSystem", "input", "input", "input", "input"]
[[["i love you", "island", "iroman", "i love leetcode"], [5, 3, 2, 2]], ["i"], [" "], ["a"], ["#"]]
Output:
[null, ["i love you", "island", "i love leetcode"], ["i love you", "i love leetcode"], [], []]
```

## Approach

Maintain a dictionary of every historical sentence and its hot degree count. As characters are typed, accumulate them into the current input buffer. For each non-`'#'` character, filter all stored sentences to those starting with the current buffer, sort by hot degree descending (ties broken lexicographically), and return the top 3. A `'#'` finalizes the current sentence, incrementing its hot degree (or adding it fresh) and resetting the input buffer.

## C# Solution

```csharp
public class AutocompleteSystem
{
    private readonly Dictionary<string, int> sentenceCounts = new();
    private string currentInput = "";

    public AutocompleteSystem(string[] sentences, int[] times)
    {
        for (int i = 0; i < sentences.Length; i++)
            sentenceCounts[sentences[i]] = times[i];
    }

    public IList<string> Input(char c)
    {
        if (c == '#')
        {
            sentenceCounts[currentInput] = sentenceCounts.GetValueOrDefault(currentInput) + 1;
            currentInput = "";
            return new List<string>();
        }

        currentInput += c;

        return sentenceCounts
            .Where(pair => pair.Key.StartsWith(currentInput))
            .OrderByDescending(pair => pair.Value)
            .ThenBy(pair => pair.Key, StringComparer.Ordinal)
            .Take(3)
            .Select(pair => pair.Key)
            .ToList();
    }
}
```

## Complexity

- **Time:** `O(n log n)` per `Input` call in the worst case, where `n` is the number of stored sentences.
- **Space:** `O(n)` for the stored sentence counts.
