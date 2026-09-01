# 677. Map Sum Pairs

**Difficulty:** Medium
**Category:** Design, Trie, Hash Table, String

## Problem

Design a map that supports `Insert(key, val)` (inserting or overwriting a key-value pair) and `Sum(prefix)`, which returns the sum of all values whose keys start with the given prefix.

### Example

```
Input:
["MapSum", "insert", "sum", "insert", "sum"]
[[], ["apple", 3], ["ap"], ["app", 2], ["ap"]]
Output:
[null, null, 3, null, 5]
```

## Approach

Store key-value pairs directly in a dictionary (inserting the same key again simply overwrites its value). For `Sum`, scan all stored keys and accumulate the values of those starting with the given prefix.

## C# Solution

```csharp
public class MapSum
{
    private readonly Dictionary<string, int> keyValues = new();

    public void Insert(string key, int val)
    {
        keyValues[key] = val;
    }

    public int Sum(string prefix)
    {
        int total = 0;
        foreach (var pair in keyValues)
        {
            if (pair.Key.StartsWith(prefix))
                total += pair.Value;
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(1)` per `Insert`, `O(n * L)` per `Sum`, where `L` is the average key length.
- **Space:** `O(n)` for the stored key-value pairs.
