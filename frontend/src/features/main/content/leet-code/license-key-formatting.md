# 482. License Key Formatting

**Difficulty:** Easy
**Category:** String

## Problem

Given a license key string `s` containing alphanumeric characters and dashes, and an integer `k`, reformat it so that groups of `k` characters (separated by dashes) contain only uppercase alphanumeric characters, except possibly the first group which may be shorter but must still contain at least one character.

### Example

```
Input: s = "5F3Z-2e-9-w", k = 4
Output: "5F3Z-2E9W"
```

### Constraints

- `1 <= s.length <= 10^5`
- `s` consists of English letters, digits, and dashes `'-'`.
- `1 <= k <= 10^4`

## Approach

Strip all dashes and uppercase the remaining characters. The first group's length is whatever remains after evenly dividing the rest into groups of `k` (using `k` itself if the total length divides evenly). Emit that first group, then step through the rest in fixed chunks of `k`, inserting a dash before each subsequent group.

## C# Solution

```csharp
public class Solution
{
    public string LicenseKeyFormatting(string s, int k)
    {
        var cleaned = s.Replace("-", "").ToUpperInvariant();
        if (cleaned.Length == 0) return "";

        int firstGroupLength = cleaned.Length % k;
        if (firstGroupLength == 0) firstGroupLength = k;

        var sb = new StringBuilder();
        sb.Append(cleaned, 0, firstGroupLength);

        for (int i = firstGroupLength; i < cleaned.Length; i += k)
        {
            sb.Append('-');
            sb.Append(cleaned, i, k);
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the cleaned string and result.
