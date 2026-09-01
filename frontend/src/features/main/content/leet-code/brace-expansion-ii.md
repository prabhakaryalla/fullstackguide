# 1096. Brace Expansion II

**Difficulty:** Hard
**Category:** String, Stack, Backtracking

## Problem

Given a string `expression` representing a nested brace-expansion grammar (braces can be nested, and adjacent groups are implicitly concatenated while comma-separated groups are alternatives), return the sorted list of unique strings it represents.

### Example

```
Input: expression = "{a,b}{c,{d,e}}"
Output: ["ac","ad","ae","bc","bd","be"]
```

## Approach

Parse the expression with a small recursive-descent grammar: an `expr` is one or more comma-separated `term`s (union of their results); a `term` is one or more `factor`s written next to each other (Cartesian product / concatenation of their results); a `factor` is either a single letter or a parenthesized `{expr}`. Represent each production's result as a `HashSet<string>` to naturally deduplicate, and finally sort the top-level result set lexicographically (ordinal comparison, since expressions use lowercase letters).

## C# Solution

```csharp
public class Solution
{
    private string s;
    private int pos;

    public IList<string> BraceExpansionII(string expression)
    {
        s = expression;
        pos = 0;
        var resultSet = ParseExpr();
        var sorted = resultSet.ToList();
        sorted.Sort(StringComparer.Ordinal);
        return sorted;
    }

    private HashSet<string> ParseExpr()
    {
        var result = new HashSet<string>(ParseTerm());

        while (pos < s.Length && s[pos] == ',')
        {
            pos++;
            result.UnionWith(ParseTerm());
        }

        return result;
    }

    private HashSet<string> ParseTerm()
    {
        var factors = new List<HashSet<string>>();

        while (pos < s.Length && s[pos] != ',' && s[pos] != '}')
        {
            factors.Add(ParseFactor());
        }

        var result = new HashSet<string> { "" };

        foreach (var factor in factors)
        {
            var next = new HashSet<string>();
            foreach (var prefix in result)
            {
                foreach (var suffix in factor)
                {
                    next.Add(prefix + suffix);
                }
            }
            result = next;
        }

        return result;
    }

    private HashSet<string> ParseFactor()
    {
        if (s[pos] == '{')
        {
            pos++;
            var result = ParseExpr();
            pos++;
            return result;
        }

        char c = s[pos];
        pos++;
        return new HashSet<string> { c.ToString() };
    }
}
```

## Complexity

- **Time:** `O(result count * average result length)` in the worst case, from combining and deduplicating sets.
- **Space:** `O(result count * average result length)`.
