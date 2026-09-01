# 604. Design Compressed String Iterator

**Difficulty:** Easy
**Category:** Design, String
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a compressed string of the form `"char1count1char2count2..."`, design an iterator that decompresses it on the fly. Implement `Next()` (returns the next character, or a space if exhausted) and `HasNext()` (returns whether more characters remain).

### Example

```
Input: compressedString = "L1e2t1C1o1d1e1"
Calls to Next(): 'L', 'e', 'e', 't', 'C', 'o', 'd', 'e'
```

## Approach

Track the current position in the compressed string, along with the currently "active" character and how many more times it still needs to be returned. When the active count reaches zero, parse the next character and its following digit run from the compressed string to refill the active character and count. Each `Next()` call simply decrements the remaining count and returns the active character.

## C# Solution

```csharp
public class StringIterator
{
    private readonly string compressedString;
    private int position = 0;
    private char currentChar = ' ';
    private int currentCount = 0;

    public StringIterator(string compressedString)
    {
        this.compressedString = compressedString;
    }

    public char Next()
    {
        if (!HasNext()) return ' ';

        if (currentCount == 0)
        {
            currentChar = compressedString[position++];
            int start = position;
            while (position < compressedString.Length && char.IsDigit(compressedString[position]))
                position++;

            currentCount = int.Parse(compressedString.Substring(start, position - start));
        }

        currentCount--;
        return currentChar;
    }

    public bool HasNext()
    {
        return currentCount > 0 || position < compressedString.Length;
    }
}
```

## Complexity

- **Time:** `O(1)` amortized per call.
- **Space:** `O(n)` for the stored compressed string.
