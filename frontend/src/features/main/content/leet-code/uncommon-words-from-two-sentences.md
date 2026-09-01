# 884. Uncommon Words from Two Sentences

**Difficulty:** Easy
**Category:** Hash Table, String

## Problem

Given two sentences `s1` and `s2`, return all "uncommon" words — words that appear exactly once across the combination of both sentences.

### Example

```
Input: s1 = "this apple is sweet", s2 = "this apple is sour"
Output: ["sweet","sour"]
```

## Approach

Split both sentences into words and count the total occurrences of each word across both, using a single shared hash map. Any word with a total count of exactly `1` is uncommon.

## C# Solution

```csharp
public class Solution
{
    public string[] UncommonFromSentences(string s1, string s2)
    {
        var counts = new Dictionary<string, int>();

        foreach (var word in s1.Split(' '))
            counts[word] = counts.GetValueOrDefault(word) + 1;

        foreach (var word in s2.Split(' '))
            counts[word] = counts.GetValueOrDefault(word) + 1;

        return counts.Where(kvp => kvp.Value == 1).Select(kvp => kvp.Key).ToArray();
    }
}
```

## Complexity

- **Time:** `O(n + m)`.
- **Space:** `O(n + m)` for the counts map.
