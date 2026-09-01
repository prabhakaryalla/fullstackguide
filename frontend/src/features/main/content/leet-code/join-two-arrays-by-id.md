# 2722. Join Two Arrays by ID

**Difficulty:** Medium
**Category:** Array, Hash Table

## Problem

Given two arrays `arr1` and `arr2`, where every element is an object containing a unique `id` property (plus other properties), produce a joined array such that:

- It contains exactly one object per distinct `id` present in either array.
- If an `id` exists in both arrays, the two objects are merged into one, with `arr2`'s properties overriding `arr1`'s for any keys present in both.
- The result is sorted in ascending order by `id`.

### Example

```
Input: arr1 = [{ id: 1, x: 1 }, { id: 2, x: 9 }], arr2 = [{ id: 3, x: 5 }]
Output: [{ id: 1, x: 1 }, { id: 2, x: 9 }, { id: 3, x: 5 }]

Input: arr1 = [{ id: 1, x: 2, y: 3 }], arr2 = [{ id: 1, x: 10, z: 1 }]
Output: [{ id: 1, x: 10, y: 3, z: 1 }]
```

## Approach

Represent each element generically as a `Dictionary<string, object>` keyed by its property names (with an `"id"` entry). Use a `SortedDictionary<int, Dictionary<string, object>>` keyed by `id` to keep entries ordered automatically: insert all of `arr1`'s entries first, then for each entry in `arr2`, either merge its properties into an existing entry (overwriting duplicate keys) or insert it as a new entry. Finally return the values in ascending key order.

## C# Solution

```csharp
public class Solution
{
    public static List<Dictionary<string, object>> Join(
        List<Dictionary<string, object>> arr1,
        List<Dictionary<string, object>> arr2)
    {
        var merged = new SortedDictionary<int, Dictionary<string, object>>();

        foreach (var obj in arr1)
        {
            merged[(int)obj["id"]] = new Dictionary<string, object>(obj);
        }

        foreach (var obj in arr2)
        {
            int id = (int)obj["id"];
            if (merged.TryGetValue(id, out var existing))
            {
                foreach (var kvp in obj)
                {
                    existing[kvp.Key] = kvp.Value;
                }
            }
            else
            {
                merged[id] = new Dictionary<string, object>(obj);
            }
        }

        return merged.Values.ToList();
    }
}
```

## Complexity

- **Time:** O((n + m) log(n + m)), where n and m are the lengths of `arr1` and `arr2`.
- **Space:** O(n + m) for the merged result.
