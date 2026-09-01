# 1271. Hexspeak

**Difficulty:** Easy
**Category:** Math, String
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a decimal string `num`, convert it to an uppercase hexadecimal string, then replace every `'0'` with `'O'` and every `'1'` with `'I'`. If the resulting string consists only of the characters `'A'`-`'F'`, `'I'`, and `'O'` (a valid "Hexspeak" word), return it; otherwise return `"ERROR"`.

### Example

```
Input: num = "257"
Output: "IOI"
```

## Approach

Parse `num` and convert it to base-16 using the built-in conversion, upper-casing the digits. Walk the resulting string, substituting `'0'` with `'O'` and `'1'` with `'I'` as required. Then validate the transformed string contains only the allowed Hexspeak characters; if any other character remains (`'2'`-`'9'`), the number can't form valid Hexspeak.

## C# Solution

```csharp
public class Solution
{
    public string ToHexspeak(string num)
    {
        long value = long.Parse(num);
        string hex = Convert.ToString(value, 16).ToUpperInvariant();

        var sb = new StringBuilder();
        foreach (char c in hex)
        {
            if (c == '0') sb.Append('O');
            else if (c == '1') sb.Append('I');
            else sb.Append(c);
        }

        string result = sb.ToString();
        foreach (char c in result)
        {
            if (!(c == 'O' || c == 'I' || (c >= 'A' && c <= 'F')))
                return "ERROR";
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(log(num))`.
- **Space:** `O(log(num))` for the intermediate string.
