# 468. Validate IP Address

**Difficulty:** Medium
**Category:** String

## Problem

Given a string `queryIP`, return `"IPv4"` if it is a valid IPv4 address, `"IPv6"` if it is a valid IPv6 address, or `"Neither"` if it is neither.

### Example

```
Input: queryIP = "172.16.254.1"
Output: "IPv4"
```

### Constraints

- `queryIP` consists only of English letters, digits, and the characters `'.'` and `':'`.

## Approach

Check the two formats independently. For IPv4, split on `.` and require exactly 4 parts, each a numeric string of 1-3 digits, without leading zeros (unless the part is exactly `"0"`), and within `0`-`255`. For IPv6, split on `:` and require exactly 8 parts, each 1-4 hexadecimal digit characters.

## C# Solution

```csharp
public class Solution
{
    public string ValidIPAddress(string queryIP)
    {
        if (IsIPv4(queryIP)) return "IPv4";
        if (IsIPv6(queryIP)) return "IPv6";
        return "Neither";
    }

    private bool IsIPv4(string ip)
    {
        var parts = ip.Split('.');
        if (parts.Length != 4) return false;

        foreach (var part in parts)
        {
            if (part.Length == 0 || part.Length > 3) return false;
            if (part.Length > 1 && part[0] == '0') return false;
            if (!part.All(char.IsDigit)) return false;

            if (!int.TryParse(part, out var value) || value < 0 || value > 255) return false;
        }

        return true;
    }

    private bool IsIPv6(string ip)
    {
        var parts = ip.Split(':');
        if (parts.Length != 8) return false;

        foreach (var part in parts)
        {
            if (part.Length == 0 || part.Length > 4) return false;

            foreach (var c in part)
            {
                bool isHexDigit = char.IsDigit(c) || (c >= 'a' && c <= 'f') || (c >= 'A' && c <= 'F');
                if (!isHexDigit) return false;
            }
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the split parts.
