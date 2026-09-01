# 316. Remove Duplicate Letters

**Difficulty:** Medium
**Category:** Stack, Greedy, String, Monotonic Stack

## Problem

Given a string `s`, remove duplicate letters so that every letter appears once and only once, and the result is the smallest in lexicographical order among all possible results (recurring letters must be in the smallest possible order).

### Example

```
Input: s = "cbacdcbc"
Output: "acdb"
```

### Constraints

- `1 <= s.length <= 10^4`
- `s` consists of lowercase English letters.

## Approach

Use a monotonic stack: process characters left to right, skipping ones already in the result. While the current character is smaller than the stack's top and the top character still appears later in the string, pop the top off (it can be re-added later). Push the current character if it isn't already included.

## C# Solution

```csharp
public class Solution
{
    public string RemoveDuplicateLetters(string s)
    {
        var lastIndex = new int[26];
        for (int i = 0; i < s.Length; i++)
            lastIndex[s[i] - 'a'] = i;

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

        var result = stack.ToArray();
        Array.Reverse(result);
        return new string(result);
    }
}
```

## Complexity

- **Time:** `O(n)` — each character is pushed and popped at most once.
- **Space:** `O(1)` — bounded by the 26-letter alphabet.
