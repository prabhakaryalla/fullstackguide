# 2755. Deep Merge of Two Objects

**Difficulty:** Medium
**Category:** Closure
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given two objects `obj1` and `obj2`, deep-merge `obj2` into `obj1`: for every key present in `obj2`, if the corresponding values in both objects are themselves objects, merge them recursively; otherwise the value from `obj2` overwrites (or adds) the value in the result. Keys present only in `obj1` are kept unchanged.

### Example
```
Input: obj1 = {"a": 1, "nested": {"x": 1}}, obj2 = {"b": 2, "nested": {"y": 2}}
Output: {"a": 1, "b": 2, "nested": {"x": 1, "y": 2}}
```

## Approach
Adapted to C# using `Dictionary<string, object>` to represent JS objects. Clone `obj1` into the result, then for each key in `obj2`, recurse when both the existing and incoming values are themselves dictionaries; otherwise overwrite the result's value with `obj2`'s value.

## C# Solution

```csharp
public class Solution
{
    public static Dictionary<string, object> DeepMerge(Dictionary<string, object> obj1, Dictionary<string, object> obj2)
    {
        var result = new Dictionary<string, object>(obj1);

        foreach (var (key, value2) in obj2)
        {
            if (result.TryGetValue(key, out var value1) &&
                value1 is Dictionary<string, object> dict1 &&
                value2 is Dictionary<string, object> dict2)
            {
                result[key] = DeepMerge(dict1, dict2);
            }
            else
            {
                result[key] = value2;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(n) where n is the total number of keys across both objects.
- **Space:** O(n).
