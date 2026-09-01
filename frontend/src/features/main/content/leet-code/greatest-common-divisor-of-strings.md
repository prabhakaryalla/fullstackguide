# 1071. Greatest Common Divisor of Strings

**Difficulty:** Easy
**Category:** String, Math

## Problem

Given two strings `str1` and `str2`, return the largest string `x` such that `x` divides both `str1` and `str2` (each can be formed by repeating `x` one or more times). Return an empty string if no such `x` exists.

### Example

```
Input: str1 = "ABCABC", str2 = "ABC"
Output: "ABC"
```

## Approach

If a common divisor string exists, `str1` and `str2` must both be built from repeats of the same base string, which forces `str1 + str2` to equal `str2 + str1` (a well-known necessary and sufficient condition for this kind of string periodicity). Once that check passes, the length of the greatest common divisor string is `gcd(str1.Length, str2.Length)`, and that prefix of either string is the answer.

## C# Solution

```csharp
public class Solution
{
    public string GcdOfStrings(string str1, string str2)
    {
        if (str1 + str2 != str2 + str1) return "";

        int gcdLength = Gcd(str1.Length, str2.Length);
        return str1.Substring(0, gcdLength);
    }

    private int Gcd(int a, int b) => b == 0 ? a : Gcd(b, a % b);
}
```

## Complexity

- **Time:** `O(n + m)` for the concatenation check.
- **Space:** `O(n + m)` for the concatenated strings.
