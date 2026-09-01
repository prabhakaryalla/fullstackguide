# 588. Design In-Memory File System

**Difficulty:** Hard
**Category:** Array, Hash Table, String, Design, Trie
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Design an in-memory file system supporting `Ls(path)` (list directory contents or a single file name), `Mkdir(path)` (create all missing directories along the path), `AddContentToFile(filePath, content)` (append content to a file, creating it if needed), and `ReadContentFromFile(filePath)` (return a file's full content).

### Example

```
Input:
["FileSystem", "ls", "mkdir", "addContentToFile", "ls", "readContentFromFile"]
[[], ["/"], ["/a/b/c"], ["/a/b/c/d", "hello"], ["/"], ["/a/b/c/d"]]
Output:
[null, [], null, null, ["a"], "hello"]
```

## Approach

Model the file system as a trie, where each path segment is a level of nested dictionaries mapping names to child nodes, and each node tracks whether it represents a file (with accumulated content) or a directory. Navigating to a path walks the trie segment by segment, creating missing intermediate directory nodes when needed (for `Mkdir` and file-writing operations) or throwing/failing when a required path doesn't exist (for reads). `Ls` on a file node returns just its own name; on a directory node, it returns all child names sorted alphabetically.

## C# Solution

```csharp
public class FileSystem
{
    private class Node
    {
        public Dictionary<string, Node> Children = new();
        public bool IsFile;
        public string Content = "";
    }

    private readonly Node root = new();

    public IList<string> Ls(string path)
    {
        var node = Navigate(path, out var lastName);

        if (node.IsFile)
            return new List<string> { lastName };

        var names = node.Children.Keys.ToList();
        names.Sort(StringComparer.Ordinal);
        return names;
    }

    public void Mkdir(string path)
    {
        Navigate(path, out _, createIntermediate: true);
    }

    public void AddContentToFile(string filePath, string content)
    {
        var node = GetOrCreateFile(filePath);
        node.Content += content;
    }

    public string ReadContentFromFile(string filePath)
    {
        var node = GetOrCreateFile(filePath, createIfMissing: false);
        return node.Content;
    }

    private Node GetOrCreateFile(string filePath, bool createIfMissing = true)
    {
        var parts = filePath.Split('/', StringSplitOptions.RemoveEmptyEntries);
        var current = root;

        for (int i = 0; i < parts.Length; i++)
        {
            if (!current.Children.TryGetValue(parts[i], out var next))
            {
                if (!createIfMissing) throw new InvalidOperationException("File not found");

                next = new Node();
                current.Children[parts[i]] = next;
            }

            current = next;
        }

        current.IsFile = true;
        return current;
    }

    private Node Navigate(string path, out string lastName, bool createIntermediate = false)
    {
        var parts = path.Split('/', StringSplitOptions.RemoveEmptyEntries);
        var current = root;
        lastName = parts.Length > 0 ? parts[^1] : "";

        foreach (var part in parts)
        {
            if (!current.Children.TryGetValue(part, out var next))
            {
                if (!createIntermediate) throw new InvalidOperationException("Path not found");

                next = new Node();
                current.Children[part] = next;
            }

            current = next;
        }

        return current;
    }
}
```

## Complexity

- **Time:** `O(path length)` per operation, plus `O(k log k)` for `Ls` when listing `k` directory entries.
- **Space:** `O(total file system size)`.
