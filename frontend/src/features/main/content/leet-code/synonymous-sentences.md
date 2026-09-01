# 1258. Synonymous Sentences

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Backtracking, Union Find, Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a list of synonym pairs and a `text` sentence, generate every possible sentence obtainable by replacing words in `text` with any of their synonyms (a word's synonym group can include several transitively-linked words), returned sorted lexicographically.

### Example

```
Input: synonyms = [["happy","joy"],["sad","sorrow"],["joy","cheerful"]], text = "I am happy today but was sad yesterday"
Output: ["I am cheerful today but was sad yesterday","I am cheerful today but was sorrow yesterday","I am happy today but was sad yesterday","I am happy today but was sorrow yesterday","I am joy today but was sad yesterday","I am joy today but was sorrow yesterday"]
```

## Approach

Use Union-Find to group all mutually-synonymous words into connected components. For each word in `text`, determine its list of interchangeable options — either its entire synonym group (sorted) or just itself if it has no synonyms. Then build every sentence combination as a cartesian product across the per-word option lists, and finally sort all generated sentences.

## C# Solution

```csharp
public class Solution
{
    private readonly Dictionary<string, string> parent = new();

    public IList<string> GenerateSentences(IList<IList<string>> synonyms, string text)
    {
        foreach (var pair in synonyms)
            Union(pair[0], pair[1]);

        var groups = new Dictionary<string, SortedSet<string>>();
        foreach (var key in parent.Keys.ToList())
        {
            string root = Find(key);
            if (!groups.TryGetValue(root, out var set))
                groups[root] = set = new SortedSet<string>(StringComparer.Ordinal);
            set.Add(key);
        }

        var options = new List<List<string>>();
        foreach (var word in text.Split(' '))
        {
            options.Add(parent.ContainsKey(word)
                ? groups[Find(word)].ToList()
                : new List<string> { word });
        }

        var results = new List<string> { "" };
        foreach (var choices in options)
        {
            var next = new List<string>();
            foreach (var prefix in results)
                foreach (var choice in choices)
                    next.Add(prefix.Length == 0 ? choice : prefix + " " + choice);
            results = next;
        }

        results.Sort(StringComparer.Ordinal);
        return results;
    }

    private string Find(string x)
    {
        if (!parent.ContainsKey(x)) parent[x] = x;
        if (parent[x] != x) parent[x] = Find(parent[x]);
        return parent[x];
    }

    private void Union(string a, string b)
    {
        parent[Find(a)] = Find(b);
    }
}
```

## Complexity

- **Time:** `O(P)`, where `P` is the total number of generated sentences times the sentence length.
- **Space:** `O(P)` for the generated sentences.
