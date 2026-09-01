# 831. Masking Personal Information

**Difficulty:** Medium
**Category:** String
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a personal information string `s` that is either an email address or a phone number, mask it: for an email, lowercase it and replace all but the first and last characters of the name with `"*****"`; for a phone number, keep only the digits, mask all but the last 4 as `"***-***-XXXX"`, and prefix any extra country-code digits as `"+***-...-"` with one `*` per extra digit.

### Example

```
Input: s = "LeetCode@LeetCode.com"
Output: "l*****e@leetcode.com"
```

## Approach

Check whether `s` contains an `'@'` to distinguish an email from a phone number. For an email, lowercase both the name and domain parts, keep the name's first and last character, and replace everything between with a fixed 5-asterisk mask. For a phone number, extract only the digit characters; the last 4 digits are always shown, the preceding local digits (up to 10 total) are masked as `"***-***-"`, and any digits beyond the first 10 are treated as a country code, shown as `"+"` followed by one asterisk per extra digit and a dash.

## C# Solution

```csharp
public class Solution
{
    public string MaskPII(string s)
    {
        int atIndex = s.IndexOf('@');

        if (atIndex != -1)
        {
            var name = s.Substring(0, atIndex).ToLower();
            var domain = s.Substring(atIndex + 1).ToLower();

            return name[0] + "*****" + name[^1] + "@" + domain;
        }

        var digits = new StringBuilder();
        foreach (var c in s)
        {
            if (char.IsDigit(c)) digits.Append(c);
        }

        int extraCount = digits.Length - 10;
        string countryCode = extraCount > 0 ? "+" + new string('*', extraCount) + "-" : "";

        return countryCode + "***-***-" + digits.ToString(digits.Length - 4, 4);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the extracted digits.
