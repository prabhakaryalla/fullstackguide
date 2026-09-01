# 2692. Make Object Immutable

**Difficulty:** Hard
**Category:** Design, Recursion, Object
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a JSON-like value `obj` (an object, array, or primitive), return a deeply immutable version of it. Any attempt to mutate the returned value must throw an error, including:

- For arrays: mutating methods such as `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, and `reverse`, or assigning to an index.
- For objects: adding, reassigning, or deleting any property.

This immutability applies recursively — every nested object or array reachable from `obj` must also be immutable.

### Example

```
const obj = makeImmutable({ a: 1, b: [1, 2, 3] });
obj.a = 5; // throws Error
obj.b.push(4); // throws Error
```

## Approach

JavaScript implements this using a `Proxy` that intercepts every `set`/`deleteProperty`/mutating-method trap. C# has no equivalent interception mechanism for arbitrary mutation, so the adaptation wraps the JSON-like tree in dedicated read-only wrapper classes, `ImmutableJsonObject` and `ImmutableJsonArray`. Their constructors recursively wrap every nested value, and every member that would normally mutate state (indexer setters, `Add`, `RemoveAt`, `Remove`) instead throws an `InvalidOperationException`, while read accessors return the already-wrapped, still-immutable nested values.

## C# Solution

```csharp
public class ImmutableJsonArray
{
    private readonly List<object> items;

    public ImmutableJsonArray(List<object> source)
    {
        items = new List<object>();
        foreach (var item in source)
        {
            items.Add(MakeImmutable(item));
        }
    }

    public int Count => items.Count;

    public object this[int index]
    {
        get => items[index];
        set => throw new InvalidOperationException("Cannot modify an immutable array.");
    }

    public void Add(object value) => throw new InvalidOperationException("Cannot modify an immutable array.");
    public void RemoveAt(int index) => throw new InvalidOperationException("Cannot modify an immutable array.");

    public static object MakeImmutable(object value)
    {
        if (value is List<object> list)
        {
            return new ImmutableJsonArray(list);
        }
        if (value is Dictionary<string, object> dict)
        {
            return new ImmutableJsonObject(dict);
        }
        return value;
    }
}

public class ImmutableJsonObject
{
    private readonly Dictionary<string, object> properties;

    public ImmutableJsonObject(Dictionary<string, object> source)
    {
        properties = new Dictionary<string, object>();
        foreach (var kvp in source)
        {
            properties[kvp.Key] = ImmutableJsonArray.MakeImmutable(kvp.Value);
        }
    }

    public object this[string key]
    {
        get => properties[key];
        set => throw new InvalidOperationException("Cannot modify an immutable object.");
    }

    public bool Remove(string key) => throw new InvalidOperationException("Cannot modify an immutable object.");
}

public class Solution
{
    public static object MakeImmutable(object obj) => ImmutableJsonArray.MakeImmutable(obj);
}
```

## Complexity

- **Time:** O(n), to recursively wrap every element and property exactly once.
- **Space:** O(n) for the resulting wrapper tree.
