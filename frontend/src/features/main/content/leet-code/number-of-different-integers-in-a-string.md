# 1805. Number of Different Integers in a String

**Difficulty:** Easy
**Category:** Hash Table, String

## Problem

Given a string `word` containing digits and lowercase letters, replace every maximal run of consecutive digits with a single number (interpreted with any leading zeros stripped) and return the count of distinct integers in the resulting string.

### Example

```
Input: word = "a1b01c001"
Output: 1
Explanation: The three digit runs "1", "01", and "001" all represent the integer 1.
```

## Approach

Scan the string once, and whenever a run of digits is found, strip its leading zeros (keeping at least one digit) and add the resulting substring to a `HashSet<string>`. Using the trimmed string (rather than parsing to `int`/`long`) safely handles arbitrarily long digit runs without overflow. The answer is the set's size.

## C# Solution

```csharp
public class Solution
{
    public int NumDifferentIntegers(string word)
    {
        var set = new HashSet<string>();
        int i = 0, n = word.Length;

        while (i < n)
        {
            if (!char.IsDigit(word[i])) { i++; continue; }

            int start = i;
            while (i < n && char.IsDigit(word[i])) i++;

            int trimStart = start;
            while (trimStart < i - 1 && word[trimStart] == '0') trimStart++;

            set.Add(word.Substring(trimStart, i - trimStart));
        }

        return set.Count;
    }
}
```

## Complexity

- **Time:** `O(n)` for the single pass (substring/hashing add amortized linear work).
- **Space:** `O(n)` for the set of distinct trimmed numbers.
