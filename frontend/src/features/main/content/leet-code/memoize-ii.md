# 2630. Memoize II

**Difficulty:** Hard
**Category:** Design, Hash Table, Closures

## Problem
Implement an advanced memoizer that can cache the results of calls to arbitrary functions with a **variable number of arguments**, where arguments may be primitive values (compared by value) or reference/object values (compared by identity). Calling the memoizer with the same function reference and the same sequence of arguments must return the previously cached result without invoking the function again, even for functions with side effects; calling it with a different function reference, or different arguments, must compute (and separately cache) a new result.

## Approach
Adapted to C#: build a small trie ("argument tree") keyed first by the target delegate, then by each argument in sequence. Each node holds a dictionary from "next argument value" to child node, using a custom equality comparer that:
- Compares value types (numbers, structs) and `string` by value.
- Compares all other reference types by object identity (`ReferenceEquals`), matching how objects are compared in the original problem.

Walking the trie for a given `(fn, args)` call either finds an existing terminal node (cache hit — return its stored value) or creates the missing path and invokes the function once to populate it (cache miss).

## C# Solution

```csharp
public class Memoizer
{
    private class ArgNode
    {
        public Dictionary<object, ArgNode> Children = new(new ArgComparer());
        public bool HasValue;
        public object Value;
    }

    private class ArgComparer : IEqualityComparer<object>
    {
        public new bool Equals(object x, object y)
        {
            if (x is ValueType || x is string)
            {
                return object.Equals(x, y);
            }
            return ReferenceEquals(x, y);
        }

        public int GetHashCode(object obj)
        {
            if (obj is ValueType || obj is string)
            {
                return obj?.GetHashCode() ?? 0;
            }
            return System.Runtime.CompilerServices.RuntimeHelpers.GetHashCode(obj);
        }
    }

    private readonly Dictionary<Delegate, ArgNode> roots = new();

    public object Call(Delegate fn, object[] args)
    {
        if (!roots.TryGetValue(fn, out var node))
        {
            node = new ArgNode();
            roots[fn] = node;
        }

        foreach (var arg in args)
        {
            if (!node.Children.TryGetValue(arg, out var child))
            {
                child = new ArgNode();
                node.Children[arg] = child;
            }
            node = child;
        }

        if (!node.HasValue)
        {
            node.Value = fn.DynamicInvoke(args);
            node.HasValue = true;
        }

        return node.Value;
    }
}
```

## Complexity

- **Time:** O(k) per call, where `k` is the number of arguments (amortized, after the first computation for a given path).
- **Space:** O(total number of distinct argument paths cached).
