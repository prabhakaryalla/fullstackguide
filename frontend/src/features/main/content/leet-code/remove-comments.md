# 722. Remove Comments

**Difficulty:** Medium
**Category:** Array, String
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a C++ source file represented as an array of strings `source`, return the source code with all comments removed, where `//` starts a line comment and `/*...*/` marks a block comment (which may span multiple lines).

### Example

```
Input: source = ["/*Test program */", "int main()", "{ ", "  // variable declaration ", "int a, b, c;", "/* This is a test", "   multiline  ", "   comment for ", "   testing */", "a = b + c;", "}"]
Output: ["int main()","{ ","  ","int a, b, c;","a = b + c;","}"]
```

## Approach

Scan each line character by character while tracking whether currently inside a block comment. Outside a block comment, encountering `//` means the rest of the line is a comment (stop processing that line), while encountering `/*` enters block comment mode; inside block comment mode, only look for the closing `*/` to exit. Characters outside any comment are appended to a buffer that accumulates the current logical output line, which is only flushed to the result once a line ends while not still inside a block comment (since block comments can span multiple source lines).

## C# Solution

```csharp
public class Solution
{
    public IList<string> RemoveComments(string[] source)
    {
        var result = new List<string>();
        var currentLine = new StringBuilder();
        bool inBlockComment = false;

        foreach (var line in source)
        {
            int i = 0;
            int n = line.Length;

            while (i < n)
            {
                if (inBlockComment)
                {
                    if (i + 1 < n && line[i] == '*' && line[i + 1] == '/')
                    {
                        inBlockComment = false;
                        i += 2;
                    }
                    else
                    {
                        i++;
                    }
                }
                else
                {
                    if (i + 1 < n && line[i] == '/' && line[i + 1] == '/')
                    {
                        break;
                    }
                    else if (i + 1 < n && line[i] == '/' && line[i + 1] == '*')
                    {
                        inBlockComment = true;
                        i += 2;
                    }
                    else
                    {
                        currentLine.Append(line[i]);
                        i++;
                    }
                }
            }

            if (!inBlockComment && currentLine.Length > 0)
            {
                result.Add(currentLine.ToString());
                currentLine.Clear();
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(total characters)`.
- **Space:** `O(total characters)` for the result.
