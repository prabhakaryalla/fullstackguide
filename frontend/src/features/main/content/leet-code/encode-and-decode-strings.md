# 271. Encode and Decode Strings

**Difficulty:** Medium
**Category:** Array, String, Design

## Problem

Design an algorithm to encode a list of strings into a single string, and decode that string back into the original list of strings. The encoding must handle strings containing any character, including delimiters used internally.

### Example

```
Encode(["neet","code","love","you"]) -> "4#neet4#code4#love3#you"
Decode("4#neet4#code4#love3#you") -> ["neet","code","love","you"]
```

## Approach

Use a length-prefixed encoding: for each string, write its length, a delimiter character (e.g. `#`) that cannot be a digit, then the string itself. Because the length is always known and unambiguous, decoding simply reads digits until the delimiter to determine how many characters to consume next, regardless of the string's actual content.

## C# Solution

```csharp
public class Codec
{
    public string Encode(IList<string> strs)
    {
        var sb = new StringBuilder();
        foreach (var s in strs)
        {
            sb.Append(s.Length).Append('#').Append(s);
        }
        return sb.ToString();
    }

    public IList<string> Decode(string s)
    {
        var result = new List<string>();
        int i = 0;

        while (i < s.Length)
        {
            int j = i;
            while (s[j] != '#') j++;

            int length = int.Parse(s[i..j]);
            int start = j + 1;
            result.Add(s.Substring(start, length));
            i = start + length;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` — where `n` is the total length of all strings, for both encode and decode.
- **Space:** `O(n)` — for the encoded string / decoded list.
