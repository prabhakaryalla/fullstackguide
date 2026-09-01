# 187. Repeated DNA Sequences

**Difficulty:** Medium
**Category:** Hash Table, String, Bit Manipulation, Sliding Window, Hash Function

## Problem

DNA sequences are made of the letters `'A'`, `'C'`, `'G'`, `'T'`. Given a string `s` representing a DNA sequence, return all 10-letter-long substrings that occur more than once.

### Example

```
s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT" -> ["AAAAACCCCC","CCCCCAAAAA"]
```

## Approach

Slide a window of length 10 across the string, tracking how many times each 10-character substring has been seen using a dictionary. The first time a substring's count reaches exactly 2, add it to the result (this naturally avoids adding the same repeated substring more than once even if it occurs 3+ times).

## C# Solution

```csharp
public class Solution
{
    public IList<string> FindRepeatedDnaSequences(string s)
    {
        var counts = new Dictionary<string, int>();
        var result = new List<string>();

        for (int i = 0; i + 10 <= s.Length; i++)
        {
            string sequence = s.Substring(i, 10);
            counts[sequence] = counts.GetValueOrDefault(sequence) + 1;

            if (counts[sequence] == 2)
            {
                result.Add(sequence);
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` — each 10-character window costs `O(1)` amortized with substring hashing.
- **Space:** `O(n)` — for the dictionary of seen sequences.
