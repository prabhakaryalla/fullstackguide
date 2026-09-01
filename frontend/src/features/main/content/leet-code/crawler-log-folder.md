# 1598. Crawler Log Folder

**Difficulty:** Easy
**Category:** Array, String, Stack

## Problem

Given a list of folder-navigation operations (`"../"` to go up one level, `"./"` to stay, or a folder name to go deeper), starting from the main folder, return the minimum number of operations needed to go back to the main folder after performing all the given operations.

### Example

```
Input: logs = ["d1/","d2/","../","d21/","./"]
Output: 2
```

## Approach

Track the current folder depth with a simple counter (no need to store actual folder names since only the final depth matters). For `"../"`, decrement the depth (never going below `0`); for `"./"`, do nothing; for any other operation, increment the depth. The final depth is exactly the number of `"../"` operations needed to return to the main folder.

## C# Solution

```csharp
public class Solution
{
    public int MinOperations(string[] logs)
    {
        int depth = 0;

        foreach (string log in logs)
        {
            if (log == "../")
            {
                depth = Math.Max(0, depth - 1);
            }
            else if (log != "./")
            {
                depth++;
            }
        }

        return depth;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the logs.
- **Space:** `O(1)`.
