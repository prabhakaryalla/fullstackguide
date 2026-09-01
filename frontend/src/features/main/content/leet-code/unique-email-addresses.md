# 929. Unique Email Addresses

**Difficulty:** Easy
**Category:** Array, Hash Table, String

## Problem

Given an array of email addresses, normalize each by removing dots in the local name and truncating the local name at the first `'+'`, then return the number of distinct normalized addresses.

### Example

```
Input: emails = ["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"]
Output: 2
```

## Approach

Split each address on `'@'`. In the local part, cut everything from the first `'+'` onward, then remove all `'.'` characters. Add the normalized `local@domain` string to a set and return its size.

## C# Solution

```csharp
public class Solution
{
    public int NumUniqueEmails(string[] emails)
    {
        var unique = new HashSet<string>();

        foreach (var email in emails)
        {
            var parts = email.Split('@');
            var local = parts[0].Split('+')[0].Replace(".", "");
            unique.Add(local + "@" + parts[1]);
        }

        return unique.Count;
    }
}
```

## Complexity

- **Time:** `O(n * L)` where `L` is average address length.
- **Space:** `O(n * L)`.
