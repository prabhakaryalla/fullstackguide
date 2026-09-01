# 2690. Infinite Method Object

**Difficulty:** Easy
**Category:** Design, Object
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a function `createInfiniteObject()` that returns a new "infinite object". Accessing any property or key on this object — no matter what the key is — returns that key itself (stringified).

### Example

```
const obj = createInfiniteObject();
console.log(obj.a); // "a"
console.log(obj[5]); // "5"
console.log(obj.anything); // "anything"
```

## Approach

JavaScript achieves this dynamically via a `Proxy` intercepting arbitrary property access. C# has no direct equivalent for statically-typed member access, so the adaptation implements `System.Dynamic.DynamicObject`, overriding `TryGetMember` (for `obj.someName`-style access) and `TryGetIndex` (for `obj[key]`-style access) so that both always return the accessed key as a string, allowing the object to be used through the `dynamic` keyword.

## C# Solution

```csharp
using System.Dynamic;

public class InfiniteObject : DynamicObject
{
    public override bool TryGetMember(GetMemberBinder binder, out object result)
    {
        result = binder.Name;
        return true;
    }

    public override bool TryGetIndex(GetIndexBinder binder, object[] indexes, out object result)
    {
        result = indexes[0]?.ToString();
        return true;
    }
}

public class Solution
{
    public static dynamic CreateInfiniteObject()
    {
        return new InfiniteObject();
    }
}
```

## Complexity

- **Time:** O(1) per property/index access.
- **Space:** O(1).
