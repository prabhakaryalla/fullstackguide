# 2618. Check if Object Instance of Class

**Difficulty:** Medium
**Category:** Closures

## Problem
Implement a function that checks whether a given value is an "instance of" a given class or any of its superclasses/interfaces — replicating the behavior of a built-in instance-check operator without using it directly. The check should walk the value's type/prototype chain: it returns `true` if the value's own type matches the target type, or if any ancestor in its inheritance chain matches; `false` otherwise (including when the value is `null`).

## Approach
Adapted to C#: instead of walking a JavaScript prototype chain, manually walk .NET's type hierarchy for the object's runtime type without using the `is` operator or `Type.IsInstanceOfType`. Starting from `obj.GetType()`, repeatedly:
- Compare the current type against the target type.
- Check the current type's directly implemented interfaces against the target type (interfaces don't appear via `BaseType`).
- Move to `BaseType` and repeat until there are no more base types.

This mirrors "does a chain of inheritance exist from this object's type to the target type?" without relying on the language's built-in instance-check operator.

## C# Solution

```csharp
public class Solution
{
    public bool CheckIfInstanceOf(object obj, Type classType)
    {
        if (obj == null || classType == null)
        {
            return false;
        }

        Type current = obj.GetType();

        while (current != null)
        {
            if (current == classType)
            {
                return true;
            }

            foreach (Type iface in current.GetInterfaces())
            {
                if (iface == classType)
                {
                    return true;
                }
            }

            current = current.BaseType;
        }

        return false;
    }
}
```

## Complexity

- **Time:** O(d + i), where `d` is the depth of the class hierarchy and `i` is the total number of interfaces examined along the way.
- **Space:** O(1) beyond the interface array returned per level.
