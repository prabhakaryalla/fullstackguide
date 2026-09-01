# 3582. Generate Tag for Video Caption

**Difficulty:** Easy
**Category:** String, Simulation

## Problem
You are given a string `caption`. Generate a tag as follows:
1. Combine all words in `caption` into a single **camelCase** string prefixed with `'#'` — the first letter of every word except the first is capitalized, and all other characters in each word are lowercase.
2. Remove every character that is not an English letter, except the leading `'#'`.
3. Truncate the result to at most 100 characters (the `'#'` counts toward the limit).

Return the resulting tag.

**Example 1:** `"Leetcode daily streak achieved"` → `"#leetcodeDailyStreakAchieved"`
**Example 2:** `"can I Go There"` → `"#canIGoThere"`
**Example 3:** a 101-character single word → truncated to 100 characters total (99 letters plus `'#'`)

**Constraints:**
- `1 <= caption.length <= 150`
- `caption` consists only of English letters and `' '`.

## Approach
Split `caption` on spaces (ignoring any resulting empty tokens from repeated spaces, if present). For the first word, lowercase every character; for every subsequent word, uppercase its first character and lowercase the rest. Concatenate all processed words, prepend `'#'`, and finally truncate the result to at most 100 characters. Since the input only ever contains letters and spaces, the "remove non-letters" step is automatically satisfied once spaces are stripped by the split.

## C# Solution

```csharp
public class Solution {
    public string GenerateTag(string caption) {
        var words = caption.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        var sb = new System.Text.StringBuilder();
        sb.Append('#');

        for (int w = 0; w < words.Length; w++) {
            string word = words[w];
            for (int i = 0; i < word.Length; i++) {
                char c = char.ToLowerInvariant(word[i]);
                if (w > 0 && i == 0) c = char.ToUpperInvariant(c);
                sb.Append(c);
            }
        }

        string result = sb.ToString();
        return result.Length > 100 ? result.Substring(0, 100) : result;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of `caption`.
- **Space:** O(n) for the resulting string builder.
