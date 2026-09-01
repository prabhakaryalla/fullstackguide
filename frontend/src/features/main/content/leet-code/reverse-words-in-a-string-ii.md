# 186. Reverse Words in a String II

**Difficulty:** Medium
**Category:** Two Pointers, String

## Problem

Given a character array `s`, reverse the order of the words in place (the in-place variant of Reverse Words in a String — no extra buffer for the whole string is allowed).

### Example

```
s = ['t','h','e',' ','s','k','y'] -> ['s','k','y',' ','t','h','e']
```

## Approach

Two-step in-place reversal: first reverse the entire character array, which puts the words in the right order but with each word's own letters backward. Then scan through and reverse each individual word's letters back to normal (word boundaries are found by scanning for spaces).

## C# Solution

```csharp
public class Solution
{
    public void ReverseWords(char[] s)
    {
        Reverse(s, 0, s.Length - 1);

        int start = 0;
        for (int i = 0; i <= s.Length; i++)
        {
            if (i == s.Length || s[i] == ' ')
            {
                Reverse(s, start, i - 1);
                start = i + 1;
            }
        }
    }

    private void Reverse(char[] s, int left, int right)
    {
        while (left < right)
        {
            (s[left], s[right]) = (s[right], s[left]);
            left++;
            right--;
        }
    }
}
```

## Complexity

- **Time:** `O(n)` — the array is reversed a constant number of times overall.
- **Space:** `O(1)` — in-place.
