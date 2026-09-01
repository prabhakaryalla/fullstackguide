# 966. Vowel Spellchecker

**Difficulty:** Medium
**Category:** Array, Hash Table, String

## Problem

Given a `wordlist` and a list of `queries`, correct each query using these rules, in priority order: exact match, then case-insensitive match, then case-insensitive match after replacing every vowel with a wildcard. If no rule matches, return an empty string for that query.

### Example

```
Input: wordlist = ["KiTe","kite","hare","Hare"], queries = ["kite","Kite","KiTe","Hare","HARE","Hear","hear"]
Output: ["kite","KiTe","KiTe","Hare","hare","","" ]
```

## Approach

Build three lookups from `wordlist`: an exact-match set, a map from lowercase word to the first word with that lowercase form, and a map from a "de-voweled" lowercase key (vowels replaced with `'*'`) to the first matching word. For each query, check the three lookups in priority order.

## C# Solution

```csharp
public class Solution
{
    public string[] Spellchecker(string[] wordlist, string[] queries)
    {
        var exactSet = new HashSet<string>(wordlist);
        var lowerMap = new Dictionary<string, string>();
        var vowelMap = new Dictionary<string, string>();

        foreach (var w in wordlist)
        {
            string lw = w.ToLower();
            if (!lowerMap.ContainsKey(lw)) lowerMap[lw] = w;

            string vw = DevowelKey(lw);
            if (!vowelMap.ContainsKey(vw)) vowelMap[vw] = w;
        }

        var result = new string[queries.Length];

        for (int i = 0; i < queries.Length; i++)
        {
            string q = queries[i];

            if (exactSet.Contains(q)) { result[i] = q; continue; }

            string lq = q.ToLower();
            if (lowerMap.TryGetValue(lq, out var match1)) { result[i] = match1; continue; }

            string vq = DevowelKey(lq);
            result[i] = vowelMap.TryGetValue(vq, out var match2) ? match2 : "";
        }

        return result;
    }

    private string DevowelKey(string s)
    {
        var chars = s.ToCharArray();
        for (int i = 0; i < chars.Length; i++)
        {
            if ("aeiou".IndexOf(chars[i]) >= 0) chars[i] = '*';
        }
        return new string(chars);
    }
}
```

## Complexity

- **Time:** `O((|wordlist| + |queries|) * L)`.
- **Space:** `O(|wordlist| * L)`.
