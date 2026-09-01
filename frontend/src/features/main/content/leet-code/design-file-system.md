# 1166. Design File System

**Difficulty:** Medium
**Category:** Hash Table, String, Design, Trie

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Design a simplified in-memory file system that supports `CreatePath(path, value)`, which creates a new path (only if its parent already exists and the path itself doesn't) and associates it with `value`, and `Get(path)`, which returns the value associated with a path or `-1` if it doesn't exist.

### Example

```
Input:
["FileSystem","createPath","get"]
[[],["/a",1],["/a"]]
Output:
[null,true,1]
```

## Approach

Store every created path directly as a key in a hash map pointing to its value. To create a path, verify the path doesn't already exist and that its parent directory (everything before the last `/`) is either the root or already exists in the map, then insert it.

## C# Solution

```csharp
public class FileSystem
{
    private readonly Dictionary<string, int> paths = new();

    public bool CreatePath(string path, int value)
    {
        if (path == "/" || paths.ContainsKey(path)) return false;

        int lastSlash = path.LastIndexOf('/');
        string parent = lastSlash == 0 ? "/" : path.Substring(0, lastSlash);

        if (parent != "/" && !paths.ContainsKey(parent)) return false;

        paths[path] = value;
        return true;
    }

    public int Get(string path)
    {
        return paths.TryGetValue(path, out int value) ? value : -1;
    }
}
```

## Complexity

- **Time:** `O(path.Length)` per call.
- **Space:** `O(total path characters stored)`.
