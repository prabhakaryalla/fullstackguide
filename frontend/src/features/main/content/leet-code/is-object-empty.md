# 2727. Is Object Empty

**Difficulty:** Easy
**Category:** Closure

## Problem
Given an object or an array, return `true` if it contains no keys (for an object) or no elements (for an array), otherwise return `false`.

### Example
```
Input: {}
Output: true

Input: {"a": 1}
Output: false

Input: []
Output: true

Input: [null, null, null]
Output: false
```

## Approach
Adapted to C#: since there is no single dynamic "object or array" type, this accepts an `object` parameter and pattern-matches it against `IDictionary` (representing a JS object) or `ICollection` (representing a JS array), returning whether its element count is zero.

## C# Solution

```csharp
public class Solution
{
    public static bool IsEmpty(object obj)
    {
        if (obj is IDictionary dict)
        {
            return dict.Count == 0;
        }

        if (obj is ICollection collection)
        {
            return collection.Count == 0;
        }

        return true;
    }
}
```

## Complexity

- **Time:** O(1).
- **Space:** O(1).
