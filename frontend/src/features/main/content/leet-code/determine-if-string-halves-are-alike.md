# 1704. Determine if String Halves Are Alike

**Difficulty:** Easy
**Category:** String, Counting

## Problem

You are given a string `s` of even length. Split it into two halves of equal length. The two halves are alike if they contain the same number of vowels (`a, e, i, o, u`, case-insensitive). Return `true` if the halves are alike.

### Example

```
Input: s = "book"
Output: true
```

## Approach

Count vowels in the first half and the second half separately and compare the two counts.

## C# Solution

```csharp
public class Solution
{
    public bool HalvesAreAlike(string s)
    {
        const string vowels = "aeiouAEIOU";
        int n = s.Length;
        int firstCount = 0, secondCount = 0;

        for (int i = 0; i < n / 2; i++)
            if (vowels.IndexOf(s[i]) >= 0) firstCount++;

        for (int i = n / 2; i < n; i++)
            if (vowels.IndexOf(s[i]) >= 0) secondCount++;

        return firstCount == secondCount;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
