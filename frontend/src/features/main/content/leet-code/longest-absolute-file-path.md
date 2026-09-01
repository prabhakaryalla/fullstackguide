# 388. Longest Absolute File Path

**Difficulty:** Medium
**Category:** Stack, String

## Problem

Given a string `input` representing a file system encoded with `\n` for line breaks and `\t` for indentation levels, return the length of the longest absolute path to a file in the represented file system. If there is no file, return `0`.

### Example

```
Input: input = "dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext"
Output: 20
Explanation: "dir/subdir2/file.ext", length 20.
```

### Constraints

- `1 <= input.length <= 10^4`
- `input` may contain lowercase English letters, digits, `'.'`, `'/'`, `'\n'`, and `'\t'`.

## Approach

Split the input by newlines and track the accumulated absolute path length at each indentation depth in a dictionary, keyed by depth. For each line, compute its depth from the number of leading tabs; if the line is a file (contains a `.`), compute its full path length using the length stored for its parent depth and update the maximum; otherwise, store the path length for this depth (parent's length plus this directory name plus a separator) for use by deeper lines.

## C# Solution

```csharp
public class Solution
{
    public int LengthLongestPath(string input)
    {
        var lengthAtDepth = new Dictionary<int, int> { [0] = 0 };
        int maxLength = 0;

        foreach (var line in input.Split('\n'))
        {
            var name = line.TrimStart('\t');
            int depth = line.Length - name.Length;

            if (name.Contains('.'))
            {
                int pathLength = lengthAtDepth[depth] + name.Length;
                maxLength = Math.Max(maxLength, pathLength);
            }
            else
            {
                lengthAtDepth[depth + 1] = lengthAtDepth[depth] + name.Length + 1;
            }
        }

        return maxLength;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over all characters.
- **Space:** `O(d)`, where `d` is the maximum directory depth.
