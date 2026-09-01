# 2628. JSON Deep Equal

**Difficulty:** Medium
**Category:** Recursion
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given two values built from JSON-like data (numbers, strings, booleans, `null`, arrays, and nested objects), implement `areDeeplyEqual(o1, o2)` that determines whether the two values are deeply equal — recursively comparing arrays element-by-element and objects key-by-key. Critically, no type coercion is allowed: values of different types (e.g. the number `1` and the string `"1"`) are never considered equal, even if they'd be "loosely equal" under coercive comparison rules.

## Approach
Adapted to C#: model JSON-like values with `object`, where a value is `null`, `bool`, a numeric type, `string`, `List<object>` (array), or `Dictionary<string, object>` (object). The recursive comparison:
1. Treats `null` specially: equal only if both sides are `null`.
2. Immediately fails if the two values have different runtime types (this enforces "no coercion").
3. For arrays, compares lengths and recursively compares elements pairwise in order.
4. For objects, compares key counts and recursively compares each key's value (order-independent, since JSON object key order isn't significant).
5. Falls back to `Equals` for matching primitive types (numbers, strings, booleans).

## C# Solution

```csharp
public class Solution
{
    public bool AreDeeplyEqual(object o1, object o2)
    {
        if (o1 == null || o2 == null)
        {
            return o1 == null && o2 == null;
        }

        if (o1.GetType() != o2.GetType())
        {
            return false;
        }

        if (o1 is List<object> list1 && o2 is List<object> list2)
        {
            if (list1.Count != list2.Count)
            {
                return false;
            }

            for (int i = 0; i < list1.Count; i++)
            {
                if (!AreDeeplyEqual(list1[i], list2[i]))
                {
                    return false;
                }
            }

            return true;
        }

        if (o1 is Dictionary<string, object> dict1 && o2 is Dictionary<string, object> dict2)
        {
            if (dict1.Count != dict2.Count)
            {
                return false;
            }

            foreach (var (key, value) in dict1)
            {
                if (!dict2.TryGetValue(key, out var otherValue) || !AreDeeplyEqual(value, otherValue))
                {
                    return false;
                }
            }

            return true;
        }

        return o1.Equals(o2);
    }
}
```

## Complexity

- **Time:** O(total number of nodes across both structures).
- **Space:** O(max nesting depth) for the recursion stack.
