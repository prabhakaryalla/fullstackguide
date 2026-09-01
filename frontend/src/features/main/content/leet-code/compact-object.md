# 2705. Compact Object

**Difficulty:** Medium
**Category:** Object, Recursion, Array

## Problem

Given an object or array `obj`, return a "compact" version of it: the same structure but with every key whose value is falsy removed. This rule applies recursively to the object itself and to any nested objects or arrays (an array is treated as an object whose keys are its indices `0` to `arr.length - 1`). Falsy values are `false`, `0`, `""`, `null`, `undefined`, and `NaN`. Note that an empty object `{}` or empty array `[]` is **not** itself considered falsy, so nested structures are still kept (after being compacted) even if compacting removes all of their entries.

### Example

```
compactObject([null, 0, false, 1]); // [1]
compactObject({ a: null, b: [false, 1] }); // { b: [1] }
```

## Approach

C# has no single unified "falsy" concept spanning every type the way JavaScript does, so the value tree is modeled generically using `Dictionary<string, object>` for objects and `List<object>` for arrays. Recursively rebuild the tree bottom-up: for each key/element, first compact its value, then decide whether to keep it using an explicit `IsFalsy` check covering `null`, `false`, numeric zero, and empty string — mirroring JavaScript's falsy rules for the value types that can appear in this JSON-like structure.

## C# Solution

```csharp
public class Solution
{
    public static object CompactObject(object obj)
    {
        if (obj is Dictionary<string, object> dict)
        {
            var result = new Dictionary<string, object>();
            foreach (var kvp in dict)
            {
                var compacted = CompactObject(kvp.Value);
                if (!IsFalsy(compacted))
                {
                    result[kvp.Key] = compacted;
                }
            }
            return result;
        }

        if (obj is List<object> list)
        {
            var result = new List<object>();
            foreach (var item in list)
            {
                var compacted = CompactObject(item);
                if (!IsFalsy(compacted))
                {
                    result.Add(compacted);
                }
            }
            return result;
        }

        return obj;
    }

    private static bool IsFalsy(object value)
    {
        if (value == null) return true;
        if (value is bool b) return !b;
        if (value is int i) return i == 0;
        if (value is double d) return d == 0;
        if (value is string s) return s.Length == 0;
        return false;
    }
}
```

## Complexity

- **Time:** O(n), where n is the total number of nodes (keys/elements) in the structure.
- **Space:** O(n) for the rebuilt, compacted structure.
