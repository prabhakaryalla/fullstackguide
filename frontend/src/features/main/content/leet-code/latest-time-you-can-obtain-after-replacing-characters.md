# 3114. Latest Time You Can Obtain After Replacing Characters

**Difficulty:** Easy
**Category:** String, Enumeration

## Problem

You are given a string `s` in `"hh:mm"` 12-hour format, where some characters may be `'?'`. Replace every `'?'` with a digit so that the resulting time is valid and as late as possible. Return the resulting string.

## Approach

Greedily maximize each position independently, from most significant to least, respecting validity constraints (hours from `01` to `12` in this variant, or `00`-`11` depending on exact format; minutes `00`-`59`): for the tens-of-hour digit, pick `'1'` if the units-of-hour digit could still allow a valid `1x` hour (i.e., it's `'?'` or less than `'2'`), otherwise `'0'`. For the units-of-hour digit, pick `'9'` unless the tens digit is `'1'` (capping the hour), in which case pick `'1'`. Minutes have no such cross-digit constraint: the tens-of-minute digit can always be `'5'` and the units-of-minute digit can always be `'9'`.

## C# Solution

```csharp
public class Solution {
    public string FindLatestTime(string s) {
        char[] ans = s.ToCharArray();

        if (s[0] == '?')
            ans[0] = (s[1] == '?' || s[1] < '2') ? '1' : '0';
        if (s[1] == '?')
            ans[1] = ans[0] == '1' ? '1' : '9';
        if (s[3] == '?')
            ans[3] = '5';
        if (s[4] == '?')
            ans[4] = '9';

        return new string(ans);
    }
}
```

## Complexity

- Time: O(1) — a fixed number of character checks.
- Space: O(1).
