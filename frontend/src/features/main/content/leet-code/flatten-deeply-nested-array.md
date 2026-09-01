# 2625. Flatten Deeply Nested Array

**Difficulty:** Medium
**Category:** Array, Recursion

## Problem
Given a multi-dimensional array `arr` (whose elements may themselves be arrays, nested to arbitrary depth) and an integer `depth`, flatten the array by merging nested arrays into their parent up to `depth` levels of nesting. Elements nested deeper than `depth` remain as nested arrays in the output.

## Approach
Adapted to C#: represent the "arbitrary JavaScript array" as `List<object>`, where each element is either a plain value (e.g. `int`) or another nested `List<object>`. Recursively walk the list: for a nested list encountered while `depth > 0`, recursively flatten it one level down (decrementing `depth`) and splice its results directly into the output; otherwise, the element (nested list or not) is copied through unchanged.

## C# Solution

```csharp
public class Solution
{
    public List<object> Flatten(List<object> arr, int depth)
    {
        var result = new List<object>();

        foreach (var item in arr)
        {
            if (item is List<object> nested && depth > 0)
            {
                result.AddRange(Flatten(nested, depth - 1));
            }
            else
            {
                result.Add(item);
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(total number of elements across every nesting level that gets visited).
- **Space:** O(output size) plus O(max nesting depth) for the recursion stack.
