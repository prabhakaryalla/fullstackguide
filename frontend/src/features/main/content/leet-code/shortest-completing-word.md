# 748. Shortest Completing Word

**Difficulty:** Easy
**Category:** Array, Hash Table, String

## Problem

Given a `licensePlate` string and an array of `words`, return the shortest word that contains all the letters in `licensePlate` (case-insensitive, ignoring numbers and spaces), with at least the required frequency for each letter. If multiple words tie for shortest, return the first one in the array.

### Example

```
Input: licensePlate = "1s3 PSt", words = ["step","steps","stripe","stepple"]
Output: "steps"
```

## Approach

Count the required frequency of each letter from `licensePlate` (ignoring non-letter characters, case-insensitive). For each candidate word, count its own letter frequencies and check whether it meets or exceeds every required letter's count. Among all qualifying words, keep the shortest one encountered (checking words in their given order naturally preserves "first" on ties).

## C# Solution

```csharp
public class Solution
{
    public string ShortestCompletingWord(string licensePlate, string[] words)
    {
        var required = new int[26];
        foreach (var c in licensePlate)
        {
            if (char.IsLetter(c))
                required[char.ToLower(c) - 'a']++;
        }

        string result = null;

        foreach (var word in words)
        {
            var counts = new int[26];
            foreach (var c in word)
                counts[char.ToLower(c) - 'a']++;

            bool valid = true;
            for (int i = 0; i < 26; i++)
            {
                if (counts[i] < required[i]) { valid = false; break; }
            }

            if (valid && (result == null || word.Length < result.Length))
                result = word;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n * L)`, where `L` is the average word length.
- **Space:** `O(1)` — bounded by the 26-letter alphabet.
