# 2775. Undefined to Null

**Difficulty:** Easy
**Category:** Closure
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given a JSON-like value that may deeply contain the JavaScript value `undefined` (in object properties or array elements), return an equivalent structure in which every `undefined` value has been replaced with `null`, leaving every other value type unchanged.

### Example
```
Input: {"a": undefined, "b": [1, undefined, 3]}
Output: {"a": null, "b": [1, null, 3]}
```

## Approach
Adapted to C#, which has no direct analog of JavaScript's `undefined` distinct from `null`. A dedicated `Undefined` sentinel object stands in for it. The solution recursively walks `Dictionary<string, object>` and `List<object>` structures, replacing any `Undefined` sentinel encountered at any depth with C#'s `null`.

## C# Solution

```csharp
public sealed class Undefined
{
    public static readonly Undefined Instance = new Undefined();
    private Undefined() { }
}

public class Solution
{
    public static object UndefinedToNull(object value)
    {
        if (value is Undefined)
        {
            return null;
        }

        if (value is Dictionary<string, object> obj)
        {
            var result = new Dictionary<string, object>();
            foreach (var (key, val) in obj)
            {
                result[key] = UndefinedToNull(val);
            }
            return result;
        }

        if (value is List<object> arr)
        {
            return arr.Select(UndefinedToNull).ToList();
        }

        return value;
    }
}
```

## Complexity

- **Time:** O(n) where n is the total number of nodes in the structure.
- **Space:** O(n).
