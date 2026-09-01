# 1576. Replace All ?'s to Avoid Consecutive Repeating Characters

**Difficulty:** Easy
**Category:** String

## Problem

Given a string `s` containing lowercase letters and `'?'` characters, replace every `'?'` with a lowercase letter such that no two adjacent characters in the final string are equal. Return any valid resulting string.

### Example

```
Input: s = "a?a?"
Output: "abac"
```

## Approach

Scan the string once. For each `'?'`, pick any letter from `'a'`, `'b'`, `'c'` that differs from both the previous character and the next character (checking against `'?'` neighbors is unnecessary since those will be filled in later, but checking the immediate left neighbor already placed and the original right neighbor if it's a fixed letter is sufficient — trying the three candidate letters in order guarantees at least one avoids both a fixed neighbor and the just-placed left neighbor, since there are only 2 constraints and 3 choices).

## C# Solution

```csharp
public class Solution
{
    public string ModifyString(string s)
    {
        char[] chars = s.ToCharArray();
        int n = chars.Length;

        for (int i = 0; i < n; i++)
        {
            if (chars[i] != '?')
            {
                continue;
            }

            for (char c = 'a'; c <= 'c'; c++)
            {
                bool matchesLeft = i > 0 && chars[i - 1] == c;
                bool matchesRight = i < n - 1 && chars[i + 1] == c;

                if (!matchesLeft && !matchesRight)
                {
                    chars[i] = c;
                    break;
                }
            }
        }

        return new string(chars);
    }
}
```

## Complexity

- **Time:** `O(n)` — each `'?'` is resolved in constant time (at most 3 candidate letters checked).
- **Space:** `O(n)` for the character array.
