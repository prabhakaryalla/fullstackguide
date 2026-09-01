# 1935. Maximum Number of Words You Can Type

**Difficulty:** Easy
**Category:** Hash Table, String

## Problem

Given a string `text` (words separated by single spaces) and a string `brokenLetters` listing keyboard keys that no longer work, return the number of words in `text` that can be typed using only working keys (a word cannot be typed if it contains any broken letter).

### Example

```
Input: text = "hello world", brokenLetters = "ad"
Output: 1
Explanation: "hello" can be typed but "world" contains 'd', a broken letter.
```

### Constraints

- `1 <= text.length <= 10^4`
- `text` consists of lowercase English letters and spaces, with no leading/trailing/consecutive spaces.
- `1 <= brokenLetters.length <= 26`
- `brokenLetters` consists of distinct lowercase English letters.

## Approach

Build a boolean set of broken letters. Split `text` into words and count how many words contain none of the broken letters, checked with a simple scan per word.

## C# Solution

```csharp
public class Solution
{
    public int CanBeTypedWords(string text, string brokenLetters)
    {
        var broken = new HashSet<char>(brokenLetters);
        var words = text.Split(' ');
        int count = 0;

        foreach (var word in words)
        {
            bool canType = true;
            foreach (char c in word)
            {
                if (broken.Contains(c))
                {
                    canType = false;
                    break;
                }
            }
            if (canType) count++;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the text's characters.
- **Space:** `O(1)` beyond the broken-letters set (bounded by 26).
