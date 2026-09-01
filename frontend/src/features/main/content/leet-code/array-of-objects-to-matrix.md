# 2675. Array Of Objects To Matrix

**Difficulty:** Hard
**Category:** Array, Design, Hash Table
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given an array `arr` of objects, where values may themselves be nested objects or arrays. Convert `arr` into a 2D matrix of strings representing the data in tabular form:

- The first row is a header row containing the column names: every distinct key that appears anywhere across the objects (nested keys are addressed using dot notation, e.g. `"user.name"`, and array indices become numeric key segments), sorted in ascending alphabetical order.
- Each following row corresponds to one object from `arr`, in its original order, holding the (stringified) value for each header column, or an empty string if that object has no value under that column.

### Example

```
Input: arr = [{ "a": 1, "b": { "c": 2 } }, { "b": { "c": 3 }, "d": 4 }]
Output:
[
  ["a", "b.c", "d"],
  ["1", "2", ""],
  ["", "3", "4"]
]
```

## Approach

Model each JavaScript-like value generically using `Dictionary<string, object>` for objects and `List<object>` for arrays. First, recursively flatten every object in `arr` into a single-level dictionary whose keys use dot notation for nesting (including array indices), collecting every key seen into a sorted set to build the header row. Then, for each flattened row, look up each header key and either emit its stringified value or an empty string if absent.

## C# Solution

```csharp
public class Solution
{
    public static List<List<string>> ArrayOfObjectsToMatrix(List<Dictionary<string, object>> arr)
    {
        var flattenedRows = new List<Dictionary<string, object>>();
        var headerSet = new SortedSet<string>(StringComparer.Ordinal);

        foreach (var obj in arr)
        {
            var flat = new Dictionary<string, object>();
            Flatten(obj, "", flat);
            flattenedRows.Add(flat);
            foreach (var key in flat.Keys)
            {
                headerSet.Add(key);
            }
        }

        var headers = headerSet.ToList();
        var matrix = new List<List<string>> { new List<string>(headers) };

        foreach (var row in flattenedRows)
        {
            var line = new List<string>();
            foreach (var header in headers)
            {
                line.Add(row.TryGetValue(header, out var value) ? Stringify(value) : "");
            }
            matrix.Add(line);
        }

        return matrix;
    }

    private static void Flatten(object value, string prefix, Dictionary<string, object> result)
    {
        if (value is Dictionary<string, object> dict)
        {
            foreach (var kvp in dict)
            {
                var key = prefix.Length == 0 ? kvp.Key : prefix + "." + kvp.Key;
                Flatten(kvp.Value, key, result);
            }
        }
        else if (value is List<object> list)
        {
            for (int i = 0; i < list.Count; i++)
            {
                var key = prefix.Length == 0 ? i.ToString() : prefix + "." + i;
                Flatten(list[i], key, result);
            }
        }
        else
        {
            result[prefix] = value;
        }
    }

    private static string Stringify(object value)
    {
        return value?.ToString() ?? "null";
    }
}
```

## Complexity

- **Time:** O(n * k log k), where n is the number of objects and k is the total number of distinct flattened keys.
- **Space:** O(n * k) for the flattened rows and resulting matrix.
