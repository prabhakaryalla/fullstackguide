# 320. Generalized Abbreviation

**Difficulty:** Medium
**Category:** Backtracking, Bit Manipulation, String
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

A generalized abbreviation of a word replaces any non-overlapping substrings with their lengths, keeping the rest of the characters intact. Given a string `word`, return all possible generalized abbreviations of it.

### Example

```
Input: word = "word"
Output: ["4","3d","2r1","2rd","1o2","1o1d","1or1","1ord","w3","w2d","w1r1","w1rd","wo2","wo1d","wor1","word"]
```

### Constraints

- `1 <= word.length <= 15`
- `word` consists of only lowercase English letters.

## Approach

Use backtracking, deciding for each character whether to abbreviate it (fold it into a running count) or keep it literally (flushing any pending count as a number first, then appending the character). At the end of the string, flush any remaining pending count to complete the abbreviation.

## C# Solution

```csharp
public class Solution
{
    public IList<string> GenerateAbbreviations(string word)
    {
        var result = new List<string>();
        Backtrack(word, 0, 0, new StringBuilder(), result);
        return result;
    }

    private void Backtrack(string word, int index, int count, StringBuilder current, List<string> result)
    {
        if (index == word.Length)
        {
            var finalStr = current.ToString() + (count > 0 ? count.ToString() : "");
            result.Add(finalStr);
            return;
        }

        Backtrack(word, index + 1, count + 1, current, result);

        int lengthBefore = current.Length;
        if (count > 0) current.Append(count);
        current.Append(word[index]);
        Backtrack(word, index + 1, 0, current, result);
        current.Length = lengthBefore;
    }
}
```

## Complexity

- **Time:** `O(n * 2^n)` — each of the `2^n` abbreviation patterns takes `O(n)` to build.
- **Space:** `O(n)` for the recursion stack and current buffer.
