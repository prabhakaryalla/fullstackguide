# 819. Most Common Word

**Difficulty:** Easy
**Category:** Array, Hash Table, String, Counting

## Problem

Given a `paragraph` and an array of `banned` words, return the most frequent word in the paragraph that is not in the banned list. Words are case-insensitive and separated by non-letter characters.

### Example

```
Input: paragraph = "Bob hit a ball, the hit BALL flew far after it was hit.", banned = ["hit"]
Output: "ball"
```

## Approach

Extract words from the lowercased paragraph by scanning character by character, treating any non-letter character as a word boundary. For each extracted word not in the banned set, increment its count in a hash map and track whichever word currently has the highest count.

## C# Solution

```csharp
public class Solution
{
    public string MostCommonWord(string paragraph, string[] banned)
    {
        var bannedSet = new HashSet<string>(banned);
        var counts = new Dictionary<string, int>();

        var words = new List<string>();
        var current = new StringBuilder();

        foreach (var c in paragraph.ToLower())
        {
            if (char.IsLetter(c))
            {
                current.Append(c);
            }
            else if (current.Length > 0)
            {
                words.Add(current.ToString());
                current.Clear();
            }
        }

        if (current.Length > 0) words.Add(current.ToString());

        string best = "";
        int bestCount = 0;

        foreach (var word in words)
        {
            if (bannedSet.Contains(word)) continue;

            counts[word] = counts.GetValueOrDefault(word) + 1;

            if (counts[word] > bestCount)
            {
                bestCount = counts[word];
                best = word;
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the paragraph length.
- **Space:** `O(n)` for the extracted words and counts.
