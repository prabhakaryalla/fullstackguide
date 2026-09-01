# 267. Palindrome Permutation II

**Difficulty:** Medium
**Category:** Hash Table, String, Backtracking

## Problem

Given a string `s`, return all distinct palindromic permutations of it, in any order. If no palindromic permutation exists, return an empty list.

### Example

```
Input: s = "aabb"
Output: ["abba","baab"]
```

## Approach

Count character frequencies. A palindrome is possible only if at most one character has an odd count. Build the first half of the palindrome using one copy of each character with `count / 2` occurrences (the odd-count character, if any, becomes the middle character), then backtrack over all distinct permutations of that half, mirroring each to form the full palindrome.

## C# Solution

```csharp
public class Solution
{
    public IList<string> GeneratePalindromes(string s)
    {
        var counts = new Dictionary<char, int>();
        foreach (var c in s) counts[c] = counts.GetValueOrDefault(c) + 1;

        char middle = '\0';
        int oddCount = 0;
        var half = new List<char>();

        foreach (var kvp in counts)
        {
            if (kvp.Value % 2 != 0)
            {
                oddCount++;
                middle = kvp.Key;
            }
            for (int i = 0; i < kvp.Value / 2; i++) half.Add(kvp.Key);
        }

        if (oddCount > 1) return new List<string>();

        var result = new List<string>();
        var used = new bool[half.Count];
        Backtrack(half, used, new char[half.Count], 0, middle, result);
        return result;
    }

    private void Backtrack(List<char> half, bool[] used, char[] path, int index, char middle, List<string> result)
    {
        if (index == half.Count)
        {
            var firstHalf = new string(path);
            var reversed = new string(path.Reverse().ToArray());
            result.Add(firstHalf + (middle == '\0' ? "" : middle.ToString()) + reversed);
            return;
        }

        var seen = new HashSet<char>();
        for (int i = 0; i < half.Count; i++)
        {
            if (used[i] || !seen.Add(half[i])) continue;

            used[i] = true;
            path[index] = half[i];
            Backtrack(half, used, path, index + 1, middle, result);
            used[i] = false;
        }
    }
}
```

## Complexity

- **Time:** `O((n/2)! )` worst case — bounded by the number of distinct permutations of the half-string.
- **Space:** `O(n)` — recursion depth and path storage, plus output storage.
