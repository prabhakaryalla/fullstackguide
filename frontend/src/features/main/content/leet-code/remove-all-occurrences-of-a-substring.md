# 1910. Remove All Occurrences of a Substring

**Difficulty:** Medium
**Category:** String, String Matching

## Problem

Given two strings `s` and `part`, repeatedly find the leftmost occurrence of `part` in `s` and remove it, until `s` no longer contains `part`. Return the final string.

### Example

```
Input: s = "daabcbaabcbc", part = "abc"
Output: "dab"
Explanation: "daabcbaabcbc" -> "dabaabcbc" -> "dababc" -> "dab".
```

### Constraints

- `1 <= s.length <= 1000`
- `1 <= part.length <= 1000`
- `s` and `part` consist of lowercase English letters only.

## Approach

Use a stack of characters to simulate the process in a single pass. Push characters of `s` one at a time; after each push, if the top of the stack ends with `part` (checked by comparing the last `part.Length` characters), pop those characters off. Because removals only ever depend on a suffix of what has been built so far, this stack simulation produces the same result as repeatedly scanning for and removing `part`, in linear time overall.

## C# Solution

```csharp
public class Solution
{
    public string RemoveOccurrences(string s, string part)
    {
        var stack = new List<char>();
        int m = part.Length;

        foreach (char c in s)
        {
            stack.Add(c);
            if (stack.Count >= m && MatchesSuffix(stack, part))
            {
                stack.RemoveRange(stack.Count - m, m);
            }
        }

        return new string(stack.ToArray());
    }

    private bool MatchesSuffix(List<char> stack, string part)
    {
        int offset = stack.Count - part.Length;
        for (int i = 0; i < part.Length; i++)
        {
            if (stack[offset + i] != part[i]) return false;
        }
        return true;
    }
}
```

## Complexity

- **Time:** `O(n * m)` worst case — each of the `n` characters may trigger an `O(m)` suffix check/removal.
- **Space:** `O(n)` for the stack.
