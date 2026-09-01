# 165. Compare Version Numbers

**Difficulty:** Medium
**Category:** Two Pointers, String

## Problem

Version numbers are dot-separated sequences of non-negative integers (e.g. `"1.2.10"`), where leading zeros in a segment don't affect its value and a missing segment counts as `0`. Given two version strings `version1` and `version2`, compare them and return `-1`, `0`, or `1` depending on whether `version1` is less than, equal to, or greater than `version2`.

### Example

```
version1 = "1.01", version2 = "1.001" -> 0 (equal: "01" and "001" both mean 1)
version1 = "1.0", version2 = "1.0.0" -> 0 (missing segments count as 0)
version1 = "0.1", version2 = "1.1" -> -1
```

## Approach

Split both versions on `'.'` and compare segment by segment as integers (not as strings, since leading zeros must be ignored). If one version runs out of segments before the other, treat its missing segments as `0` rather than stopping the comparison early.

## C# Solution

```csharp
public class Solution
{
    public int CompareVersion(string version1, string version2)
    {
        var v1 = version1.Split('.');
        var v2 = version2.Split('.');
        int maxLen = Math.Max(v1.Length, v2.Length);

        for (int i = 0; i < maxLen; i++)
        {
            int num1 = i < v1.Length ? int.Parse(v1[i]) : 0;
            int num2 = i < v2.Length ? int.Parse(v2[i]) : 0;

            if (num1 != num2) return num1 < num2 ? -1 : 1;
        }

        return 0;
    }
}
```

## Complexity

- **Time:** `O(n + m)` — where `n` and `m` are the lengths of the two version strings.
- **Space:** `O(n + m)` — for the split segment arrays.
