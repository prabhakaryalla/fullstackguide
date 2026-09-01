# 3451. Find Invalid IP Addresses

**Difficulty:** Medium
**Category:** String, Array

## Problem
Given a list of strings representing candidate IP addresses, return the list of strings that are NOT valid IPv4 addresses. A valid IPv4 address consists of exactly four decimal numbers separated by dots, where each number is between 0 and 255 (inclusive), contains no leading zeros (unless the number itself is exactly "0"), and consists only of digits.

## Approach
For each candidate string, split on `.` and verify there are exactly four parts. For each part, check: it's non-empty, contains only digit characters, has no leading zero unless the part is exactly "0", has length at most 3, and parses to an integer in the range [0, 255]. Collect and return all strings that fail any of these checks.

## C# Solution

```csharp
public class Solution 
{
    public System.Collections.Generic.IList<string> FindInvalidIpAddresses(string[] candidates) 
    {
        var result = new System.Collections.Generic.List<string>();

        foreach (var ip in candidates)
        {
            if (!IsValidIPv4(ip))
            {
                result.Add(ip);
            }
        }

        return result;
    }

    private bool IsValidIPv4(string ip)
    {
        var parts = ip.Split('.');
        if (parts.Length != 4) return false;

        foreach (var part in parts)
        {
            if (part.Length == 0 || part.Length > 3) return false;

            foreach (char c in part)
            {
                if (c < '0' || c > '9') return false;
            }

            if (part.Length > 1 && part[0] == '0') return false;

            int value = int.Parse(part);
            if (value < 0 || value > 255) return false;
        }

        return true;
    }
}
```

## Complexity

- **Time:** O(n * L) where n is the number of candidates and L is the average string length
- **Space:** O(n) for the result list
