# 609. Find Duplicate File in System

**Difficulty:** Medium
**Category:** Array, Hash Table, String

## Problem

Given a list of directory information strings, each describing a directory path followed by files and their contents in the format `"file_name(file_content)"`, return groups of file paths that share identical content.

### Example

```
Input: paths = ["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)","root/c/d 4.txt(efgh)","root 4.txt(efgh)"]
Output: [["root/a/2.txt","root/c/d/4.txt","root/4.txt"],["root/a/1.txt","root/c/3.txt"]]
```

### Constraints

- `1 <= paths.length <= 2 * 10^4`

## Approach

Parse each directory entry by splitting on spaces to separate the directory from its file descriptors. For each file descriptor, extract the file name (before `'('`) and content (between the parentheses), then group full file paths (directory + file name) by their content in a hash map. Only report groups with more than one file, since those are the actual duplicates.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<string>> FindDuplicate(string[] paths)
    {
        var contentMap = new Dictionary<string, List<string>>();

        foreach (var pathEntry in paths)
        {
            var parts = pathEntry.Split(' ');
            var directory = parts[0];

            for (int i = 1; i < parts.Length; i++)
            {
                int start = parts[i].IndexOf('(');
                var fileName = parts[i].Substring(0, start);
                var content = parts[i].Substring(start + 1, parts[i].Length - start - 2);

                var fullPath = directory + "/" + fileName;

                if (!contentMap.TryGetValue(content, out var list))
                {
                    list = new List<string>();
                    contentMap[content] = list;
                }
                list.Add(fullPath);
            }
        }

        var result = new List<IList<string>>();
        foreach (var group in contentMap.Values)
            if (group.Count > 1)
                result.Add(group);

        return result;
    }
}
```

## Complexity

- **Time:** `O(total characters across all paths)`.
- **Space:** `O(total characters across all paths)`.
