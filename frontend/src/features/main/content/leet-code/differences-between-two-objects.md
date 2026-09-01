# 2700. Differences Between Two Objects

**Difficulty:** Medium
**Category:** Object, Recursion, Hash Table
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given two objects `obj1` and `obj2`, which may contain nested objects, return a new object `diff` containing every key whose value differs between `obj1` and `obj2` (comparing nested objects recursively). Each differing key maps to a two-element array `[value1, value2]` holding the corresponding value from `obj1` and `obj2` respectively; a missing key on one side is represented as `undefined`. Keys whose values are identical on both sides — including two deeply-equal nested objects — are excluded from the result.

### Example

```
diff({ a: 1, b: 2, c: 3 }, { a: 1, b: 4, d: 5 });
// { b: [2, 4], c: [3, undefined], d: [undefined, 5] }
```

## Approach

Represent each object generically as a `Dictionary<string, object>`. Compute the union of keys present in either dictionary. For each key, if both sides hold a nested `Dictionary<string, object>`, recurse and include the key only if the nested diff is non-empty; otherwise, compare the two (possibly missing) values and include the key with a `[value1, value2]` pair if they are not equal.

## C# Solution

```csharp
public class Solution
{
    public static Dictionary<string, object> Diff(
        Dictionary<string, object> obj1, Dictionary<string, object> obj2)
    {
        var result = new Dictionary<string, object>();
        var keys = new HashSet<string>(obj1.Keys);
        keys.UnionWith(obj2.Keys);

        foreach (var key in keys)
        {
            bool has1 = obj1.TryGetValue(key, out var v1);
            bool has2 = obj2.TryGetValue(key, out var v2);

            if (has1 && has2 && v1 is Dictionary<string, object> d1 && v2 is Dictionary<string, object> d2)
            {
                var nested = Diff(d1, d2);
                if (nested.Count > 0)
                {
                    result[key] = nested;
                }
            }
            else if (!Equals(v1, v2))
            {
                result[key] = new object[] { has1 ? v1 : null, has2 ? v2 : null };
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(n), where n is the total number of keys across both objects (recursively).
- **Space:** O(n) for the resulting diff object.
