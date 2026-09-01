# 804. Unique Morse Code Words

**Difficulty:** Easy
**Category:** Array, Hash Table, String

## Problem

Given an array of lowercase `words`, transform each word into its Morse code representation (concatenating each letter's fixed Morse code). Return the number of distinct transformations produced.

### Example

```
Input: words = ["gin","zen","gig","msg"]
Output: 2
```

## Approach

Use the fixed lookup table mapping each letter `a-z` to its Morse code string. Build the transformation for every word by concatenating the Morse codes of its letters, and insert each result into a hash set; the set's final size is the number of unique transformations.

## C# Solution

```csharp
public class Solution
{
    public int UniqueMorseRepresentations(string[] words)
    {
        string[] morse = {
            ".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--",
            "-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."
        };

        var transformations = new HashSet<string>();

        foreach (var word in words)
        {
            var sb = new StringBuilder();
            foreach (var c in word)
                sb.Append(morse[c - 'a']);

            transformations.Add(sb.ToString());
        }

        return transformations.Count;
    }
}
```

## Complexity

- **Time:** `O(n * L)`, where `L` is the average word length.
- **Space:** `O(n * L)` for the set of transformations.
