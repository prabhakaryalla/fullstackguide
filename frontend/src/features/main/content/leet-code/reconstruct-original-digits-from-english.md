# 423. Reconstruct Original Digits from English

**Difficulty:** Medium
**Category:** Hash Table, Math, String

## Problem

Given a string `s` containing an out-of-order English representation of digits `0`-`9`, return the digits in ascending order.

### Example

```
Input: s = "owoztneoer"
Output: "012"
```

### Constraints

- `1 <= s.length <= 10^5`
- `s` consists of lowercase English letters.
- `s` is guaranteed to be valid.

## Approach

Some letters appear in only one digit's English spelling, making them unambiguous counters: `z`→zero, `w`→two, `u`→four, `x`→six, `g`→eight. Once those digit counts are known, other letters become unambiguous after subtracting the contributions of already-counted digits: `h`→three (minus eight's `h`), `f`→five (minus four's `f`), `s`→seven (minus six's `s`), `o`→one (minus zero/two/four's `o`), and `i`→nine (minus five/six/eight's `i`).

## C# Solution

```csharp
public class Solution
{
    public string OriginalDigits(string s)
    {
        var counts = new int[26];
        foreach (var c in s) counts[c - 'a']++;

        var digitCounts = new int[10];

        digitCounts[0] = counts['z' - 'a'];
        digitCounts[2] = counts['w' - 'a'];
        digitCounts[4] = counts['u' - 'a'];
        digitCounts[6] = counts['x' - 'a'];
        digitCounts[8] = counts['g' - 'a'];

        digitCounts[3] = counts['h' - 'a'] - digitCounts[8];
        digitCounts[5] = counts['f' - 'a'] - digitCounts[4];
        digitCounts[7] = counts['s' - 'a'] - digitCounts[6];

        digitCounts[1] = counts['o' - 'a'] - digitCounts[0] - digitCounts[2] - digitCounts[4];
        digitCounts[9] = counts['i' - 'a'] - digitCounts[5] - digitCounts[6] - digitCounts[8];

        var sb = new StringBuilder();
        for (int digit = 0; digit <= 9; digit++)
            sb.Append(new string((char)('0' + digit), digitCounts[digit]));

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` — bounded by the fixed alphabet and digit counts.
