# 2794. Create Object from Two Arrays

**Difficulty:** Easy
**Category:** Array, Hash Table, Closure
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given an array `keys` and an array `values` of the same length, create and return an object mapping each `keys[i]` to `values[i]`. If a key occurs more than once, only its first occurrence determines the corresponding value (later duplicates for that key are ignored); keys that are `NaN` should be treated as equal to each other, matching how they would collide in a JavaScript object built this way.

### Example
```
Input: keys = [1, 1, 2], values = ["a", "b", "c"]
Output: {1: "a", 2: "c"}
```

## Approach
Adapted to C# using a generic `Dictionary<TKey, TValue>`: iterate the keys once, inserting a value only the first time a given key is seen. .NET's default equality already treats `double.NaN` as equal to itself (unlike the `==` operator), so `NaN` keys collide the same way the original problem requires, with no special casing needed.

## C# Solution

```csharp
public class Solution
{
    public static Dictionary<TKey, TValue> CreateObject<TKey, TValue>(TKey[] keys, TValue[] values)
    {
        var result = new Dictionary<TKey, TValue>();

        for (int i = 0; i < keys.Length; i++)
        {
            if (!result.ContainsKey(keys[i]))
            {
                result[keys[i]] = values[i];
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(n).
- **Space:** O(n).
