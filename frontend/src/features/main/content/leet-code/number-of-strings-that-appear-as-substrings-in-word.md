# 1967. Number of Strings That Appear as Substrings in Word

**Difficulty:** Easy
**Category:** Array, String

## Problem

Given an array of strings `patterns` and a string `word`, return the number of strings in `patterns` that occur as a substring of `word`.

### Example

```
Input: patterns = ["a","abc","bc","d"], word = "abc"
Output: 3
Explanation: "a", "abc", and "bc" are all substrings of "abc"; "d" is not.
```

### Constraints

- `1 <= patterns.length <= 100`
- `1 <= patterns[i].length <= 100`
- `1 <= word.length <= 100`
- All strings consist of lowercase English letters only.

## Approach

Given the small constraints, simply check each pattern with the built-in substring-search (`Contains`) against `word` and count how many return `true`.

## C# Solution

```csharp
public class Solution
{
    public int NumOfStrings(string[] patterns, string word)
    {
        int count = 0;

        foreach (string pattern in patterns)
        {
            if (word.Contains(pattern))
            {
                count++;
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(p * (n * m))` where `p` is the number of patterns, `n` is `word.Length`, and `m` is average pattern length — bounded comfortably by the small constraints.
- **Space:** `O(1)` extra space.
