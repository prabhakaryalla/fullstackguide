# 443. String Compression

**Difficulty:** Medium
**Category:** Two Pointers, String

## Problem

Given an array of characters `chars`, compress it in place: each group of consecutive repeating characters is replaced by the character followed by its count (if greater than 1), and return the new length of the array.

### Example

```
Input: chars = ["a","a","b","b","c","c","c"]
Output: 6, chars = ["a","2","b","2","c","3"]
```

### Constraints

- `1 <= chars.length <= 2000`
- `chars[i]` is a printable ASCII character.

## Approach

Use two pointers: a `read` pointer that scans through runs of identical consecutive characters (counting each run's length), and a `write` pointer that outputs the character followed by its count's digits (only if the count exceeds 1) directly back into the same array.

## C# Solution

```csharp
public class Solution
{
    public int Compress(char[] chars)
    {
        int write = 0, read = 0;

        while (read < chars.Length)
        {
            char current = chars[read];
            int count = 0;

            while (read < chars.Length && chars[read] == current)
            {
                read++;
                count++;
            }

            chars[write++] = current;

            if (count > 1)
            {
                foreach (var digit in count.ToString())
                    chars[write++] = digit;
            }
        }

        return write;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` extra — compression happens in place.
