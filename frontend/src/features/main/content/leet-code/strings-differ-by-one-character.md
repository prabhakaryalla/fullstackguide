# 1554. Strings Differ by One Character

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Rolling Hash, Hash Function

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a list of strings `dict` all of the same length, return `true` if there exist two different strings in the list that differ by exactly one character at the same position (all other characters identical).

### Example

```
Input: dict = ["abcd","acbd","aacd"]
Output: true
Explanation: "abcd" and "aacd" differ only at index 1.
```

## Approach

For every string and every position `i`, compute a "wildcard key" formed by that string with position `i` masked out (e.g. the string itself but with a placeholder at index `i`). If the same wildcard key (for the same position `i`) is produced by two different original strings, those two strings differ by exactly one character at position `i`. Use a hash set of `(position, maskedString)` keys to detect this in a single pass.

## C# Solution

```csharp
public class Solution
{
    public bool DifferByOne(string[] dict)
    {
        var seen = new HashSet<string>();

        foreach (string word in dict)
        {
            for (int i = 0; i < word.Length; i++)
            {
                string key = i + "#" + word.Substring(0, i) + word.Substring(i + 1);

                if (!seen.Add(key))
                {
                    return true;
                }
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(n * m^2)` where `n` is the number of words and `m` is the word length — building each masked key takes `O(m)`, done `m` times per word.
- **Space:** `O(n * m^2)` for the set of masked keys.
