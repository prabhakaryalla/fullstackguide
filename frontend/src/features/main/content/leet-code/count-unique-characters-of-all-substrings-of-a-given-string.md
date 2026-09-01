# 828. Count Unique Characters of All Substrings of a Given String

**Difficulty:** Hard
**Category:** Hash Table, String, Dynamic Programming

## Problem

Define `countUniqueChars(s)` as the number of characters in `s` that appear exactly once. Given a string `s`, return the sum of `countUniqueChars(t)` over every substring `t` of `s`.

### Example

```
Input: s = "ABA"
Output: 8
```

## Approach

Rather than enumerating substrings directly, compute each character occurrence's total contribution across all substrings. Track, for each letter, the position of its most recent and second-most-recent prior occurrence. When processing the occurrence at index `i`, its contribution to substrings ending exactly before the *next* occurrence of the same letter is `(i - lastSeen) * (lastSeen - secondLastSeen)` — the number of ways to choose a left boundary between the previous two occurrences, times the number of ways to choose a right boundary between the previous occurrence and this one. After the main scan, add each letter's final contribution stretching from its last occurrence to the end of the string using the same formula.

## C# Solution

```csharp
public class Solution
{
    public int UniqueLetterString(string s)
    {
        int n = s.Length;
        var lastSeen = new int[26];
        var secondLastSeen = new int[26];
        Array.Fill(lastSeen, -1);
        Array.Fill(secondLastSeen, -1);

        long total = 0;

        for (int i = 0; i < n; i++)
        {
            int c = s[i] - 'A';

            total += (long)(i - lastSeen[c]) * (lastSeen[c] - secondLastSeen[c]);

            secondLastSeen[c] = lastSeen[c];
            lastSeen[c] = i;
        }

        for (int c = 0; c < 26; c++)
        {
            total += (long)(n - lastSeen[c]) * (lastSeen[c] - secondLastSeen[c]);
        }

        return (int)total;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` — bounded by the 26-letter alphabet.
