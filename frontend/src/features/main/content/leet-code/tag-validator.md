# 591. Tag Validator

**Difficulty:** Hard
**Category:** Stack, String

## Problem

Given a string `code` representing a simplified markup snippet, return `true` if it is valid according to a set of rules involving matching tag pairs, `CDATA` sections, and a single top-level enclosing tag.

### Example

```
Input: code = "<DIV>This is the first line <![CDATA[<div>]]></DIV>"
Output: true
```

### Constraints

- `1 <= code.length <= 500`
- `code` consists of English letters, digits, `'<'`, `'>'`, `'/'`, `'!'`, `'['`, `']'`, and `'.'`.

## Approach

Scan the string left to right using a stack of open tag names. At each position, classify what follows `<` as a closing tag (`</name>`, popping and validating the matching open tag), a `CDATA` section (`<![CDATA[...]]>`, whose contents are skipped verbatim as plain text and require an enclosing open tag), or an opening tag (`<NAME>`, validated for length and uppercase-only characters before being pushed). Any character outside of tags is treated as plain text, which is only valid while inside some open tag. The whole string is valid only if the stack empties exactly at the end and the content is wrapped in a single top-level tag.

## C# Solution

```csharp
public class Solution
{
    public bool IsValid(string code)
    {
        if (code.Length == 0 || code[0] != '<') return false;

        var stack = new Stack<string>();
        int i = 0;
        int n = code.Length;

        while (i < n)
        {
            if (i > 0 && stack.Count == 0) return false;

            if (code[i] == '<')
            {
                if (i + 1 < n && code[i + 1] == '/')
                {
                    int closeIndex = code.IndexOf('>', i);
                    if (closeIndex == -1) return false;

                    var tagName = code.Substring(i + 2, closeIndex - i - 2);
                    if (stack.Count == 0 || stack.Pop() != tagName) return false;

                    i = closeIndex + 1;
                }
                else if (i + 1 < n && code[i + 1] == '!')
                {
                    if (stack.Count == 0) return false;
                    if (i + 9 > n || code.Substring(i, 9) != "<![CDATA[") return false;

                    int endIndex = code.IndexOf("]]>", i);
                    if (endIndex == -1) return false;

                    i = endIndex + 3;
                }
                else
                {
                    int closeIndex = code.IndexOf('>', i);
                    if (closeIndex == -1) return false;

                    var tagName = code.Substring(i + 1, closeIndex - i - 1);
                    if (tagName.Length < 1 || tagName.Length > 9) return false;
                    if (!tagName.All(c => c >= 'A' && c <= 'Z')) return false;

                    stack.Push(tagName);
                    i = closeIndex + 1;
                }
            }
            else
            {
                i++;
            }
        }

        return stack.Count == 0;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the stack.
