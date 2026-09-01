# 3481. Apply Substitutions

**Difficulty:** Medium
**Category:** Hash Table, String, Depth-First Search
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given a list `replacements` of `[key, value]` string pairs and a string `text`. Placeholders in `text` and in any `value` are written as `%key%`. Replace every placeholder recursively (a `value` may itself contain other placeholders) until no placeholders remain, and return the final string. It is guaranteed the substitutions contain no cycles.

### Example
Input: `replacements = [["A", "xyz"], ["B", "%A%b"]]`, `text = "%B%%A%"`
Output: `"xyzbxyz"`
Explanation: `%B%` expands to `%A%b` which expands to `"xyz" + "b" = "xyzb"`. Then `%A%` expands to `"xyz"`. Concatenating gives `"xyzb" + "xyz" = "xyzbxyz"`.

## Approach
Build a hash map from key to raw value. Write a recursive `Evaluate` function that scans a string left to right: literal characters are copied directly, and whenever a `%` is found, the substring up to the next `%` is treated as a key, whose mapped value is recursively evaluated (to resolve any nested placeholders) and appended. Applying `Evaluate` to `text` yields the answer.

## C# Solution

```csharp
public class Solution {
    public string ApplySubstitutions(IList<IList<string>> replacements, string text) {
        var replaceMap = new Dictionary<string, string>();
        foreach (var replacement in replacements)
            replaceMap[replacement[0]] = replacement[1];
        return Evaluate(text, replaceMap);
    }

    private string Evaluate(string text, Dictionary<string, string> replaceMap) {
        var sb = new StringBuilder();
        int i = 0;
        while (i < text.Length) {
            if (text[i] == '%') {
                int j = text.IndexOf('%', i + 1);
                string key = text.Substring(i + 1, j - i - 1);
                sb.Append(Evaluate(replaceMap[key], replaceMap));
                i = j + 1;
            } else {
                sb.Append(text[i]);
                i++;
            }
        }
        return sb.ToString();
    }
}
```

## Complexity

- **Time:** O(|text|^2) in the worst case, due to recursive re-evaluation of nested placeholders
- **Space:** O(|replacements| + |text|)
