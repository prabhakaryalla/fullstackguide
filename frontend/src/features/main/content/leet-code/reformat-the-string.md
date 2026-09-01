# 1417. Reformat The String

**Difficulty:** Easy
**Category:** String

## Problem

Given an alphanumeric string `s`, rearrange its characters so that letters and digits alternate as much as possible. If more than one arrangement is possible, return any of them; if no valid rearrangement exists, return an empty string.

### Example

```
Input: s = "a0b1c2"
Output: "0a1b2c"
```

## Approach

Split the characters into a letters list and a digits list. A valid alternating arrangement only exists if the counts differ by at most one. Interleave the longer list (or either, if equal) with the shorter one, appending one character from each in turn.

## C# Solution

```csharp
public class Solution
{
    public string Reformat(string s)
    {
        var letters = new List<char>();
        var digits = new List<char>();

        foreach (var c in s)
        {
            if (char.IsDigit(c)) digits.Add(c);
            else letters.Add(c);
        }

        if (Math.Abs(letters.Count - digits.Count) > 1) return "";

        var first = letters.Count >= digits.Count ? letters : digits;
        var second = letters.Count >= digits.Count ? digits : letters;

        var sb = new StringBuilder();
        for (int i = 0; i < first.Count; i++)
        {
            sb.Append(first[i]);
            if (i < second.Count) sb.Append(second[i]);
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the letters/digits lists.
