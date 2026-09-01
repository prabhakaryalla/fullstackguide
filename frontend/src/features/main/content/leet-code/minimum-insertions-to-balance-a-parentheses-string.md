# 1541. Minimum Insertions to Balance a Parentheses String

**Difficulty:** Medium
**Category:** String, Stack, Greedy

## Problem

Given a parentheses string `s`, it is considered balanced if every `(` is followed, somewhere later, by exactly two consecutive `)` characters (i.e. `"))"`), and every `)` pair is matched to an earlier `(`. Return the minimum number of `(` or `)` insertions needed to make `s` balanced.

### Example

```
Input: s = "(()))"
Output: 1
```

## Approach

Scan left to right while tracking `open`, the number of unmatched `(` seen so far. For each `)` encountered, check whether it's immediately followed by another `)` to form a complete `"))"` pair (advancing two characters); if not, an insertion is needed to complete the pair (advancing just one character). Every complete `"))"` pair then consumes one unmatched `(` if available — if there is none, an insertion of a missing `(` is required. After the scan, any remaining unmatched `(` each still need a full `"))"`, contributing 2 insertions apiece.

## C# Solution

```csharp
public class Solution
{
    public int MinInsertions(string s)
    {
        int open = 0;
        int insertions = 0;
        int i = 0;
        int n = s.Length;

        while (i < n)
        {
            if (s[i] == '(')
            {
                open++;
                i++;
            }
            else
            {
                if (i + 1 < n && s[i + 1] == ')')
                {
                    i += 2;
                }
                else
                {
                    insertions++;
                    i++;
                }

                if (open > 0)
                {
                    open--;
                }
                else
                {
                    insertions++;
                }
            }
        }

        insertions += open * 2;
        return insertions;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the string.
- **Space:** `O(1)`.
