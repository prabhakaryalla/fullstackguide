# 2691. Immutability Helper

**Difficulty:** Hard
**Category:** Design, Recursion, Object
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Implement an `update(data, command)` utility, modeled after the popular "immutability-helper" library, that produces a new value derived from `data` by applying `command`, without ever mutating `data` itself. Each command is an object whose keys select one of the following operations (or address a nested field):

- `{ "$push": values }` — return a new array equal to the target with `values` appended at the end.
- `{ "$set": value }` — replace the target entirely with `value`.
- `{ "$merge": obj }` — return a new object equal to the target with `obj`'s own keys merged in, overwriting any existing keys.
- `{ "$apply": fn }` — return the result of calling `fn(target)`.
- Any other key in `command` names a property of `data`, whose associated value is itself a nested command to apply recursively to `data[key]`, producing an updated copy of `data` with just that field replaced.

### Example

```
update({ a: 1, b: 2 }, { a: { $set: 10 } }); // { a: 10, b: 2 }
update([1, 2, 3], { $push: [4, 5] }); // [1, 2, 3, 4, 5]
update({ a: { b: { c: 1 } } }, { a: { b: { c: { $set: 2 } } } }); // { a: { b: { c: 2 } } }
```

## Approach

Represent JSON-like data generically with `Dictionary<string, object>` for objects and `List<object>` for arrays. `Update` first checks for each of the special command keys (`$set`, `$push`, `$merge`, `$apply`) and handles them directly by building a new copy of the relevant structure. If none of those special keys are present, `command` is treated as a map of nested field commands: for each key, recursively call `Update` on the corresponding sub-value of `data` and place the result into a shallow copy of `data`, leaving the original untouched.

## C# Solution

```csharp
public class Solution
{
    public static object Update(object data, Dictionary<string, object> command)
    {
        if (command.ContainsKey("$set"))
        {
            return command["$set"];
        }

        if (command.ContainsKey("$push"))
        {
            var list = new List<object>((List<object>)data);
            list.AddRange((List<object>)command["$push"]);
            return list;
        }

        if (command.ContainsKey("$merge"))
        {
            var merged = new Dictionary<string, object>((Dictionary<string, object>)data);
            foreach (var kvp in (Dictionary<string, object>)command["$merge"])
            {
                merged[kvp.Key] = kvp.Value;
            }
            return merged;
        }

        if (command.ContainsKey("$apply"))
        {
            var fn = (Func<object, object>)command["$apply"];
            return fn(data);
        }

        var result = new Dictionary<string, object>((Dictionary<string, object>)data);
        foreach (var kvp in command)
        {
            var nestedCommand = (Dictionary<string, object>)kvp.Value;
            var existing = result.TryGetValue(kvp.Key, out var value) ? value : null;
            result[kvp.Key] = Update(existing, nestedCommand);
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(n), where n is the size of the portion of `data`/`command` touched by the update.
- **Space:** O(n) for the newly created structures, since the original `data` is left untouched.
