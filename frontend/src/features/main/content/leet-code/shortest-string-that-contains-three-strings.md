# 2800. Shortest String That Contains Three Strings

**Difficulty:** Medium
**Category:** String, Greedy, Enumeration

## Problem

Given three strings `a`, `b`, and `c`, find a string of minimum length that contains all three strings as substrings. If there are multiple such strings of the same minimum length, return the lexicographically smallest one.

### Example

Input: a = "abc", b = "bca", c = "aaa"
Output: "aaabca"
Explanation: "aaabca" contains "abc" (indices 2-4... actually via overlap), "bca", and "aaa" as substrings, and no shorter valid string exists.

## Approach

Merging two strings optimally means finding the largest overlap between the suffix of one and the prefix of the other (or recognizing one is already a substring of the other). Since there are only 3 strings, try all 6 permutations of `(a, b, c)`; for each permutation, greedily merge the first two, then merge the result with the third. Among all 6 candidate merged strings, pick the shortest one, breaking ties by choosing the lexicographically smallest.

## C# Solution

```csharp
public class Solution 
{
    public string MinimumString(string a, string b, string c) 
    {
        string best = null;

        foreach (var perm in Permutations(new[] { a, b, c })) 
        {
            string merged = Merge(Merge(perm[0], perm[1]), perm[2]);
            if (best == null || merged.Length < best.Length || 
                (merged.Length == best.Length && string.CompareOrdinal(merged, best) < 0)) 
            {
                best = merged;
            }
        }

        return best;
    }

    private string Merge(string a, string b) 
    {
        if (a.Contains(b)) return a;
        if (b.Contains(a)) return b;

        for (int i = 0; i < a.Length; i++) 
        {
            string suffix = a.Substring(i);
            if (b.StartsWith(suffix)) 
            {
                return a + b.Substring(suffix.Length);
            }
        }

        return a + b;
    }

    private IEnumerable<string[]> Permutations(string[] items) 
    {
        int[][] indexPerms = 
        {
            new[] { 0, 1, 2 }, new[] { 0, 2, 1 }, new[] { 1, 0, 2 },
            new[] { 1, 2, 0 }, new[] { 2, 0, 1 }, new[] { 2, 1, 0 }
        };

        foreach (var perm in indexPerms) 
        {
            yield return new[] { items[perm[0]], items[perm[1]], items[perm[2]] };
        }
    }
}
```

## Complexity

- **Time:** O(L^2) where L is the total length of a, b, c
- **Space:** O(L)
