# 1233. Remove Sub-Folders from the Filesystem

**Difficulty:** Medium
**Category:** Array, String, Trie, Sorting

## Problem

Given a list of absolute folder paths, remove all folders that are sub-folders of another folder in the list, and return the remaining top-level folders in any order.

### Example

```
Input: folder = ["/a","/a/b","/c/d","/c/d/e","/c/f"]
Output: ["/a","/c/d","/c/f"]
```

## Approach

Sort the paths lexicographically. Because a sub-folder's path always starts with its parent folder's full path followed by `/`, once paths are sorted, any parent folder will appear immediately before all of its descendants. Keep a running list of confirmed top-level folders; for each new path, only add it if it does not start with the last kept folder followed by `/` — otherwise it's a sub-folder and can be skipped.

## C# Solution

```csharp
public class Solution
{
    public IList<string> RemoveSubfolders(string[] folder)
    {
        Array.Sort(folder, StringComparer.Ordinal);
        var result = new List<string>();

        foreach (var path in folder)
        {
            if (result.Count == 0 || !path.StartsWith(result[^1] + "/"))
                result.Add(path);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort, where `n` is the number of folders.
- **Space:** `O(n)` for the result.
