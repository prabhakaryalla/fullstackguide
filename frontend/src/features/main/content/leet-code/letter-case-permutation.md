# 784. Letter Case Permutation

**Difficulty:** Medium
**Category:** Bit Manipulation, String, Backtracking

## Problem

Given a string `s`, return all possible strings obtained by transforming every letter into either its lowercase or uppercase form (digits stay unchanged), in any order.

### Example

```
Input: s = "a1b2"
Output: ["a1b2","a1B2","A1b2","A1B2"]
```

## Approach

Use backtracking: process characters left to right. When encountering a digit, keep it unchanged and move to the next character. When encountering a letter, branch into two recursive calls — one with it forced to lowercase and one forced to uppercase — building up every combination.

## C# Solution

```csharp
public class Solution
{
    public IList<string> LetterCasePermutation(string s)
    {
        var result = new List<string>();
        Backtrack(s.ToCharArray(), 0, result);
        return result;
    }

    private void Backtrack(char[] chars, int index, List<string> result)
    {
        if (index == chars.Length)
        {
            result.Add(new string(chars));
            return;
        }

        if (char.IsDigit(chars[index]))
        {
            Backtrack(chars, index + 1, result);
            return;
        }

        chars[index] = char.ToLower(chars[index]);
        Backtrack(chars, index + 1, result);

        chars[index] = char.ToUpper(chars[index]);
        Backtrack(chars, index + 1, result);
    }
}
```

## Complexity

- **Time:** `O(2^L * n)`, where `L` is the number of letters.
- **Space:** `O(2^L * n)` for the output.
