# 984. String Without AAA or BBB

**Difficulty:** Medium
**Category:** String, Greedy

## Problem

Given counts `a` and `b`, construct any string using exactly `a` `'a'` characters and `b` `'b'` characters such that it contains no `"aaa"` or `"bbb"` substring.

### Example

```
Input: a = 1, b = 2
Output: "abb"
```

## Approach

Greedily append the character with more remaining count, except when the last two characters already used are the same character twice in a row — in that case, force the other character to break the run (as long as it's still available).

## C# Solution

```csharp
public class Solution
{
    public string StrWithout3a3b(int a, int b)
    {
        var sb = new StringBuilder();

        while (a > 0 || b > 0)
        {
            int len = sb.Length;
            bool writeA;

            if (len >= 2 && sb[len - 1] == 'a' && sb[len - 2] == 'a') writeA = false;
            else if (len >= 2 && sb[len - 1] == 'b' && sb[len - 2] == 'b') writeA = true;
            else writeA = a >= b;

            if (writeA && a > 0) { sb.Append('a'); a--; }
            else { sb.Append('b'); b--; }
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(a + b)`.
- **Space:** `O(a + b)` for the result.
