# 1880. Check if Word Equals Summation of Two Words

**Difficulty:** Easy
**Category:** String, Math

## Problem

Given three strings `firstWord`, `secondWord`, and `targetWord` made only of lowercase letters `'a'`-`'j'` (each letter maps to its numeric value `0`-`9`), interpret each string as a decimal number by concatenating its letters' numeric values, and return whether `firstWord + secondWord == targetWord` numerically.

### Example

```
Input: firstWord = "acb", secondWord = "cba", targetWord = "cdb"
Output: true
```

## Approach

Convert each word to its numeric value by iterating its characters and building up the number digit by digit (`value = value * 10 + (c - 'a')`). Compare the sum of the two source values to the target value.

## C# Solution

```csharp
public class Solution
{
    public bool IsSumEqual(string firstWord, string secondWord, string targetWord)
    {
        return ToNumber(firstWord) + ToNumber(secondWord) == ToNumber(targetWord);
    }

    private int ToNumber(string word)
    {
        int value = 0;
        foreach (char c in word)
        {
            value = value * 10 + (c - 'a');
        }
        return value;
    }
}
```

## Complexity

- **Time:** `O(n)` total across the three words.
- **Space:** `O(1)`.
