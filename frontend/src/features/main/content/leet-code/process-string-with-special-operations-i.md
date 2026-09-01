# 3612. Process String with Special Operations I

**Difficulty:** Medium
**Category:** String, Simulation

## Problem
You are given a string `s` consisting of lowercase English letters and the special characters `*`, `#`, and `%`.

Build a new string `result` by processing `s` according to the following rules, from left to right:
- If the character is a lowercase English letter, append it to `result`.
- A `*` removes the last character from `result`, if one exists.
- A `#` duplicates the current `result` and appends the duplicate to itself.
- A `%` reverses the current `result`.

Return the final string `result` after processing all characters of `s`.

### Example
Input: `s = "a#b%*"`
Output: `"ba"`
Explanation: `"a"` → `"aa"` (duplicate) → `"aab"` (append 'b') → `"baa"` (reverse) → `"ba"` (remove last).

Constraints:
- `1 <= s.length <= 20`
- `s` consists only of lowercase English letters and the characters `*`, `#`, `%`.

## Approach
Since `s.length <= 20`, the result string can grow at most to length `2^20`, which is small enough to simulate directly with a `StringBuilder`. Walk through `s` once, applying each rule literally: append letters, remove the last character for `*`, duplicate the whole builder for `#`, and reverse it for `%`.

## C# Solution

```csharp
public class Solution {
    public string ProcessStr(string s) {
        var sb = new System.Text.StringBuilder();
        foreach (char c in s) {
            if (char.IsLower(c)) {
                sb.Append(c);
            } else if (c == '*') {
                if (sb.Length > 0) {
                    sb.Length--;
                }
            } else if (c == '#') {
                string current = sb.ToString();
                sb.Append(current);
            } else if (c == '%') {
                char[] arr = sb.ToString().ToCharArray();
                System.Array.Reverse(arr);
                sb.Clear();
                sb.Append(arr);
            }
        }
        return sb.ToString();
    }
}
```

## Complexity

- **Time:** O(2^n), where n is the length of s, since the result can double in size for each `#`.
- **Space:** O(2^n)
