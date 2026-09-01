# 2631. Group By

**Difficulty:** Medium
**Category:** Array, Hash Table

## Problem
Implement a `groupBy(fn)` utility that groups the elements of an array into a map keyed by `fn(item)`, where each key maps to the list of items (in original order) that produced that key. Both the order in which keys first appear and the order of items within each group should match their order of appearance in the source array.

## Approach
Iterate through the array once. For each item, compute its key via the callback; if the key hasn't been seen yet, create a new list for it, then append the item to that key's list. A `Dictionary` naturally supports this single-pass grouping in O(n).

## C# Solution

```csharp
public static class GroupByExtensions
{
    public static Dictionary<string, List<T>> GroupByKey<T>(this T[] items, Func<T, string> fn)
    {
        var result = new Dictionary<string, List<T>>();

        foreach (var item in items)
        {
            string key = fn(item);
            if (!result.TryGetValue(key, out var group))
            {
                group = new List<T>();
                result[key] = group;
            }
            group.Add(item);
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(n).
- **Space:** O(n) for the grouped output.
