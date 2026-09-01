# 2633. Convert Object to JSON String

**Difficulty:** Medium
**Category:** Recursion, String
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Implement `jsonStringify(value)` that manually serializes a value into its JSON string representation — supporting numbers, strings, booleans, `null`, arrays, and nested objects — without relying on the language's built-in JSON serializer.

## Approach
Adapted to C#: represent the input as `object`, where a value is `null`, `bool`, a numeric type, `string`, `List<object>` (array), or `Dictionary<string, object>` (object with string keys). Recursively serialize based on runtime type:
- `null` → the literal `"null"`.
- `bool` → `"true"`/`"false"`.
- Numeric types → their invariant-culture string form.
- `string` → wrapped in quotes with backslashes and quotes escaped.
- `List<object>` → recursively serialize each element and join with commas inside `[...]`.
- `Dictionary<string, object>` → recursively serialize each `"key":value` pair and join with commas inside `{...}`.

## C# Solution

```csharp
public class Solution
{
    public string JsonStringify(object value)
    {
        if (value == null)
        {
            return "null";
        }

        switch (value)
        {
            case bool b:
                return b ? "true" : "false";
            case string s:
                return "\"" + s.Replace("\\", "\\\\").Replace("\"", "\\\"") + "\"";
            case int or long or double or float:
                return Convert.ToString(value, System.Globalization.CultureInfo.InvariantCulture);
            case List<object> list:
                return "[" + string.Join(",", list.Select(JsonStringify)) + "]";
            case Dictionary<string, object> dict:
                var pairs = dict.Select(kv => "\"" + kv.Key + "\":" + JsonStringify(kv.Value));
                return "{" + string.Join(",", pairs) + "}";
            default:
                throw new ArgumentException("Unsupported type");
        }
    }
}
```

## Complexity

- **Time:** O(total number of nodes/characters in the structure).
- **Space:** O(max nesting depth) for recursion, plus O(output length) for the built string.
