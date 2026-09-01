# 1081. Smallest Subsequence of Distinct Characters

**Difficulty:** Medium
**Category:** String, Stack, Greedy, Monotonic Stack

## Problem

Given a string `s`, return the lexicographically smallest subsequence of `s` that contains every distinct character of `s` exactly once.

### Example

```
Input: s = "cbacdcbc"
Output: "acdb"
```

## Approach

Precompute the last occurrence index of every character so it's known whether a character will reappear later. Build the answer with a monotonic stack: for each character, skip it if it's already on the stack; otherwise, while the stack's top character is greater than the current one **and** that top character still appears again later in the string, pop it (it can be picked up again, so removing it now yields a smaller result), then push the current character.

## C# Solution

```csharp
public class Solution
{
    public string SmallestSubsequence(string s)
    {
        var lastIndex = new int[26];
        for (int i = 0; i < s.Length; i++) lastIndex[s[i] - 'a'] = i;

        var inStack = new bool[26];
        var stack = new Stack<char>();

        for (int i = 0; i < s.Length; i++)
        {
            char c = s[i];
            if (inStack[c - 'a']) continue;

            while (stack.Count > 0 && stack.Peek() > c && lastIndex[stack.Peek() - 'a'] > i)
            {
                inStack[stack.Pop() - 'a'] = false;
            }

            stack.Push(c);
            inStack[c - 'a'] = true;
        }

        var chars = stack.ToArray();
        Array.Reverse(chars);
        return new string(chars);
    }
}
```

## Complexity

- **Time:** `O(n)` — each character is pushed and popped at most once.
- **Space:** `O(1)` extra beyond the output — bounded by the 26-letter alphabet.
