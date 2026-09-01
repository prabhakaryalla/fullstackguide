# 2649. Nested Array Generator

**Difficulty:** Medium
**Category:** Array, Generator, Design

## Problem

You are given a multi-dimensional array of integers, where any element may itself be an array containing integers and further nested arrays (a `NestedArray`). Write a generator that, when iterated, yields every integer contained in the structure in the same left-to-right order as an inorder (depth-first) traversal.

### Example

```
Input: arr = [[1, 2, 3], [], [4, 5]]
Output: [1, 2, 3, 4, 5]
Explanation: Iterating over the generator yields 1, 2, 3, 4, 5 in order.
```

## Approach

This is originally a JavaScript problem that relies on generator functions and `yield*` to recursively delegate to nested generators. Adapted to C#, we model the nested array as a `List<object>` whose elements are either boxed `int` values or further nested `List<object>` instances, and use an `IEnumerable<int>` method with `yield return`, recursively looping over and re-yielding the results of flattening any nested list (the C# equivalent of `yield*`).

## C# Solution

```csharp
public class Solution
{
    public static IEnumerable<int> NestedArrayGenerator(List<object> arr)
    {
        foreach (var item in arr)
        {
            if (item is List<object> nested)
            {
                foreach (var num in NestedArrayGenerator(nested))
                {
                    yield return num;
                }
            }
            else
            {
                yield return (int)item;
            }
        }
    }
}
```

## Complexity

- **Time:** O(n), where n is the total number of integers across the nested structure.
- **Space:** O(d) auxiliary space for the recursion/iterator stack, where d is the maximum nesting depth.
