# 3110. Score of a String

**Difficulty:** Easy
**Category:** String, Math

## Problem

Given a string `s`, its "score" is the sum of the absolute differences between the ASCII values of every pair of adjacent characters. Return the score of `s`.

### Example

```
Input: s = "hello"
Output: 13
```

## Approach

Walk through the string once, summing `|s[i] - s[i-1]|` for every adjacent pair.

## C# Solution

```csharp
public class Solution {
    public int ScoreOfString(string s) {
        int ans = 0;
        for (int i = 1; i < s.Length; i++)
            ans += Math.Abs(s[i] - s[i - 1]);
        return ans;
    }
}
```

## Complexity

- Time: O(n) — a single pass over the string.
- Space: O(1).
