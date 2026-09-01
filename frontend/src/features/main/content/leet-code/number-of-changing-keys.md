# 3019. Number of Changing Keys

**Difficulty:** Easy
**Category:** String

## Problem

You are given a string `s` representing a sequence of keys typed on a keyboard. Typing the same key consecutively (ignoring case — pressing `a` then `A` doesn't count as a change) doesn't require moving to a new key. Return the number of times you had to change to a different key.

### Example

```
Input: s = "aAbBcC"
Output: 2
Explanation: Case is ignored, so "aA" is the same key, "bB" is the same key, "cC" is the same key,
but moving from the 'a' group to the 'b' group, and from the 'b' group to the 'c' group, are two changes.
```

## Approach

Walk through the string comparing each character (case-insensitively) to the previous one; count a change whenever they differ.

## C# Solution

```csharp
public class Solution {
    public int CountKeyChanges(string s) {
        int ans = 0;
        for (int i = 1; i < s.Length; i++)
            if (char.ToLower(s[i]) != char.ToLower(s[i - 1]))
                ans++;
        return ans;
    }
}
```

## Complexity

- Time: O(n) — a single pass through the string.
- Space: O(1).
