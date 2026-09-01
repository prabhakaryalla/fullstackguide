# 937. Reorder Data in Log Files

**Difficulty:** Medium
**Category:** Array, String, Sorting

## Problem

Given an array of logs, each starting with an identifier followed by either words or digits, reorder them so that all letter-logs come first, sorted lexicographically by their content (ties broken by identifier), followed by all digit-logs in their original order.

### Example

```
Input: logs = ["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"]
Output: ["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]
```

## Approach

Split logs into letter-logs and digit-logs based on the first character after the identifier. Sort letter-logs by a composite key of (content, identifier) using ordinal string comparison, then append the digit-logs unchanged in their original relative order.

## C# Solution

```csharp
public class Solution
{
    public string[] ReorderLogFiles(string[] logs)
    {
        var letterLogs = new List<string>();
        var digitLogs = new List<string>();

        foreach (var log in logs)
        {
            int spaceIdx = log.IndexOf(' ');
            var body = log.Substring(spaceIdx + 1);
            if (char.IsDigit(body[0])) digitLogs.Add(log); else letterLogs.Add(log);
        }

        letterLogs.Sort((a, b) =>
        {
            int spaceA = a.IndexOf(' '), spaceB = b.IndexOf(' ');
            string idA = a.Substring(0, spaceA), idB = b.Substring(0, spaceB);
            string bodyA = a.Substring(spaceA + 1), bodyB = b.Substring(spaceB + 1);

            int cmp = string.Compare(bodyA, bodyB, StringComparison.Ordinal);
            return cmp != 0 ? cmp : string.Compare(idA, idB, StringComparison.Ordinal);
        });

        letterLogs.AddRange(digitLogs);
        return letterLogs.ToArray();
    }
}
```

## Complexity

- **Time:** `O(n log n * L)` where `L` is average log length.
- **Space:** `O(n)`.
