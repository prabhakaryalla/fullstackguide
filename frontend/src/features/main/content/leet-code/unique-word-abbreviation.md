# 288. Unique Word Abbreviation

**Difficulty:** Medium
**Category:** Hash Table, Design, String

## Problem

The abbreviation of a word is its first letter, the number of characters between the first and last letters, and its last letter (e.g. `"internationalization"` -> `"i18n"`). Given a dictionary of words, implement a class that, given a query word, determines whether the query's abbreviation is unique in the dictionary — meaning no *other* word in the dictionary shares that abbreviation.

### Example

```
ValidWordAbbr(["deer","door","cake","card"])
IsUnique("dear") -> false  (abbreviation "d2r" clashes with "deer"/"door")
IsUnique("cart") -> true
```

## Approach

Precompute a map from abbreviation to the set of distinct words that produce it. For a query word, compute its abbreviation and look it up: the abbreviation is "unique" if no word maps to it, or if the only word(s) mapping to it are identical to the query word itself.

## C# Solution

```csharp
public class ValidWordAbbr
{
    private readonly Dictionary<string, HashSet<string>> abbreviationMap = new();

    public ValidWordAbbr(string[] dictionary)
    {
        foreach (var word in dictionary)
        {
            var abbr = Abbreviate(word);
            if (!abbreviationMap.TryGetValue(abbr, out var words))
                abbreviationMap[abbr] = words = new HashSet<string>();
            words.Add(word);
        }
    }

    public bool IsUnique(string word)
    {
        var abbr = Abbreviate(word);
        if (!abbreviationMap.TryGetValue(abbr, out var words)) return true;
        return words.Count == 1 && words.Contains(word);
    }

    private string Abbreviate(string word)
    {
        if (word.Length <= 2) return word;
        return $"{word[0]}{word.Length - 2}{word[^1]}";
    }
}
```

## Complexity

- **Time:** `O(n)` for construction, where `n` is the total dictionary length; `O(1)` average per `IsUnique` query.
- **Space:** `O(n)` — for the abbreviation map.
