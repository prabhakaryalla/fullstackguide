# 1108. Defanging an IP Address

**Difficulty:** Easy
**Category:** String

## Problem

Given a valid IPv4 address, return a "defanged" version by replacing every `.` with `[.]`.

### Example

```
Input: address = "1.1.1.1"
Output: "1[.]1[.]1[.]1"
```

## Approach

A direct string replacement of every `.` with the literal `[.]` produces the defanged address.

## C# Solution

```csharp
public class Solution
{
    public string DefangIPaddr(string address)
    {
        return address.Replace(".", "[.]");
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the resulting string.
