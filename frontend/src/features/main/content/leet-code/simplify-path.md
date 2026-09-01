# 71. Simplify Path

**Difficulty:** Medium
**Category:** String, Stack

## Problem

Given a string `path`, representing an absolute Unix-style file path, convert it to its simplified canonical path.

### Example 1

```
Input: path = "/home/"
Output: "/home"
```

### Example 2

```
Input: path = "/home//foo/"
Output: "/home/foo"
```

### Example 3

```
Input: path = "/a/./b/../../c/"
Output: "/c"
```

### Constraints

- `1 <= path.length <= 3000`
- `path` consists of English letters, digits, `'.'`, `'/'` or `'_'`.
- `path` is a valid absolute Unix path.

## Approach

Split the path on `'/'` and process each segment with a stack: ignore empty segments and `"."` (current directory), pop the stack on `".."` (parent directory, if not already at root), and push any other segment (a real directory name). Join the remaining stack contents with `'/'` to form the canonical path.

## C# Solution

```csharp
public class Solution
{
    public string SimplifyPath(string path)
    {
        var stack = new Stack<string>();

        foreach (var segment in path.Split('/'))
        {
            if (segment == "" || segment == ".") continue;

            if (segment == "..")
            {
                if (stack.Count > 0) stack.Pop();
            }
            else
            {
                stack.Push(segment);
            }
        }

        return "/" + string.Join("/", stack.Reverse());
    }
}
```

## Complexity

- **Time:** `O(n)` — each character is processed a constant number of times.
- **Space:** `O(n)` — for the stack and split segments.
