# 2724. Sort By

**Difficulty:** Easy
**Category:** Sorting, Array, Closure

## Problem
Given an array `arr` and a function `fn`, return a new array sorted in ascending order by the values returned when `fn` is applied to each element. The comparison is based purely on `fn(element)`, not the elements themselves.

### Example
```
Input: arr = [5, 4, 1, 2, 3], fn = x => x
Output: [1, 2, 3, 4, 5]

Input: arr = [{"x": 1}, {"x": 0}, {"x": -1}], fn = obj => obj.x
Output: [{"x": -1}, {"x": 0}, {"x": 1}]
```

## Approach
Compute a sort key for every element by applying `fn`, then perform a standard ascending sort keyed on those computed values.

## C# Solution

```csharp
public class Solution
{
    public static List<T> SortBy<T>(List<T> arr, Func<T, int> fn)
    {
        return arr.OrderBy(fn).ToList();
    }
}
```

## Complexity

- **Time:** O(n log n).
- **Space:** O(n).
