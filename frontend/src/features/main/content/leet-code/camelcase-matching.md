# 1023. Camelcase Matching

**Difficulty:** Medium
**Category:** String, Trie, Two Pointers

## Problem

Given an array of strings `queries` and a string `pattern`, return a boolean array where each entry is `true` if the corresponding query can be transformed into `pattern` by inserting lowercase letters into `pattern` at any positions (including no insertions).

### Example

```
Input: queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], pattern = "FB"
Output: [true,false,true,true,false]
```

## Approach

For each query, walk it with a pointer into `pattern`. Whenever the current query character matches the next unmatched pattern character, advance the pattern pointer. Any query character that doesn't match must be a lowercase letter that was "inserted" — if it's uppercase instead, the query can't be reshaped into `pattern` since only lowercase insertions are allowed. The query matches only if the entire pattern was consumed by the end.

## C# Solution

```csharp
public class Solution
{
    public IList<bool> CamelMatch(string[] queries, string pattern)
    {
        var result = new List<bool>();

        foreach (var query in queries)
        {
            result.Add(Matches(query, pattern));
        }

        return result;
    }

    private bool Matches(string query, string pattern)
    {
        int p = 0;

        foreach (var c in query)
        {
            if (p < pattern.Length && pattern[p] == c)
            {
                p++;
            }
            else if (char.IsUpper(c))
            {
                return false;
            }
        }

        return p == pattern.Length;
    }
}
```

## Complexity

- **Time:** `O(total query length)`.
- **Space:** `O(1)` extra beyond the output list.
