# 1948. Delete Duplicate Folders in System

**Difficulty:** Hard
**Category:** Array, Hash Table, String, Trie, Hash Function
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given `paths`, a list of folder paths (each an array of folder names from root to leaf), delete all folders (and their subfolders) that are duplicates: two folders (with all their descendants) are duplicates if their subtrees (structure and names of descendants) are identical, even if the folders themselves have different names. Return the remaining paths after all such deletions, in any order.

### Example

```
Input: paths = [["a"],["c"],["d"],["a","b"],["c","b"],["d","a"]]
Output: [["d"],["d","a"]]
Explanation: Folders "a" and "c" both have only a single child "b" and are marked duplicate along with their "b" subfolders; "d" survives because its only child is "a" (name differs from the deleted "a"/"c" duplicates and "d" itself is unique).
```

### Constraints

- `1 <= paths.length <= 2 * 10^4`
- `1 <= paths[i].length <= 500`
- `1 <= paths[i][j].length <= 10`
- Path arrays represent a valid folder hierarchy (no folder has two children with the same name).

## Approach

Build a trie from all paths. Perform a post-order traversal, serializing each node's subtree into a canonical string based on its children's names and their own serializations (sorted by child name for determinism). Use a dictionary mapping serialization to count of occurrences; any node whose serialization occurs more than once (and has at least one child, since only non-empty folders are ever marked duplicate) is marked for deletion. Finally, reconstruct the surviving paths by traversing the trie from the root, skipping any subtree rooted at a marked node.

## C# Solution

```csharp
public class Solution
{
    private class Node
    {
        public Dictionary<string, Node> Children = new();
    }

    public IList<IList<string>> DeleteDuplicateFolder(IList<IList<string>> paths)
    {
        var root = new Node();

        foreach (var path in paths)
        {
            var node = root;
            foreach (var folder in path)
            {
                if (!node.Children.TryGetValue(folder, out var child))
                {
                    child = new Node();
                    node.Children[folder] = child;
                }
                node = child;
            }
        }

        var serializationCount = new Dictionary<string, int>();
        Serialize(root, serializationCount);

        var result = new List<IList<string>>();
        var currentPath = new List<string>();
        CollectPaths(root, currentPath, result, serializationCount);

        return result;
    }

    private string Serialize(Node node, Dictionary<string, int> count)
    {
        if (node.Children.Count == 0) return "";

        var parts = new List<string>();
        foreach (var kvp in node.Children.OrderBy(k => k.Key, StringComparer.Ordinal))
        {
            string childSerial = Serialize(kvp.Value, count);
            parts.Add(kvp.Key + "(" + childSerial + ")");
        }

        string serial = string.Concat(parts);
        count[serial] = count.GetValueOrDefault(serial, 0) + 1;
        return serial;
    }

    private void CollectPaths(Node node, List<string> currentPath, List<IList<string>> result, Dictionary<string, int> count)
    {
        foreach (var kvp in node.Children)
        {
            string childSerial = Serialize(kvp.Value, new Dictionary<string, int>());
            bool isDuplicate = childSerial != "" && count.TryGetValue(childSerial, out int c) && c > 1;

            if (isDuplicate) continue;

            currentPath.Add(kvp.Key);
            result.Add(new List<string>(currentPath));
            CollectPaths(kvp.Value, currentPath, result, count);
            currentPath.RemoveAt(currentPath.Count - 1);
        }
    }
}
```

## Complexity

- **Time:** `O(total path length ^ 2)` in the worst case due to serialization string concatenation, roughly `O(N log N)` typical.
- **Space:** `O(N)` for the trie and serialization dictionary, where `N` is the total number of folder entries.
