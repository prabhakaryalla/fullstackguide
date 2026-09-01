# 535. Encode and Decode TinyURL

**Difficulty:** Medium
**Category:** Hash Table, String, Design, Hash Function

## Problem

Design a system that encodes a long URL into a short one and decodes the short URL back to the original long URL. Implement the `Codec` class with `Encode(longUrl)` and `Decode(shortUrl)`.

### Example

```
Input: longUrl = "https://leetcode.com/problems/design-tinyurl"
Output: an equivalent long URL after Decode(Encode(longUrl))
```

### Constraints

- `1 <= url.length <= 10^4`

## Approach

Maintain a dictionary mapping randomly generated short codes to their original long URLs. To encode, repeatedly generate a random alphanumeric code until one is found that isn't already in use, store the mapping, and return a short URL built from that code. To decode, extract the code from the short URL and look up the corresponding long URL directly.

## C# Solution

```csharp
public class Codec
{
    private readonly Dictionary<string, string> urlByCode = new();
    private readonly Random random = new();
    private const string Chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    public string Encode(string longUrl)
    {
        string code;
        do
        {
            code = GenerateCode();
        }
        while (urlByCode.ContainsKey(code));

        urlByCode[code] = longUrl;
        return "http://tinyurl.com/" + code;
    }

    public string Decode(string shortUrl)
    {
        var code = shortUrl.Substring(shortUrl.LastIndexOf('/') + 1);
        return urlByCode[code];
    }

    private string GenerateCode()
    {
        var chars = new char[6];
        for (int i = 0; i < chars.Length; i++)
            chars[i] = Chars[random.Next(Chars.Length)];

        return new string(chars);
    }
}
```

## Complexity

- **Time:** `O(1)` average for both `Encode` and `Decode`.
- **Space:** `O(n)` for the stored mappings.
