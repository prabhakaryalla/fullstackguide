# 2823. Deep Object Filter

**Difficulty:** Medium
**Category:** Closure
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given an object `obj` and a predicate function `fn(value, key)`, return a new object containing only the properties (applied recursively into any nested object values) for which `fn(value, key)` returns `true`. Properties for which `fn` returns `false` are dropped, along with all of their nested content.

### Example
```
Input: obj = {"a": 1, "b": {"c": 2, "d": 3}}, fn = (value, key) => value !== 3 && key !== "c"
Output: {"a": 1, "b": {}}
```

## Approach
Adapted to C# using `Dictionary<string, object>` to represent objects. For each entry, first test it with `fn`, and only keep it if the test passes; when a kept value is itself a nested dictionary, recurse into it so filtering is applied at every depth.

## C# Solution

```csharp
public class Solution
{
    public static Dictionary<string, object> DeepFilter(Dictionary<string, object> obj, Func<object, string, bool> fn)
    {
        var result = new Dictionary<string, object>();

        foreach (var (key, value) in obj)
        {
            if (!fn(value, key))
            {
                continue;
            }

            if (value is Dictionary<string, object> nested)
            {
                result[key] = DeepFilter(nested, fn);
            }
            else
            {
                result[key] = value;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(n) where n is the total number of properties visited.
- **Space:** O(n).
