# 2703. Return Length of Arguments Passed

**Difficulty:** Easy
**Category:** Function

## Problem

Write a function `argumentsLength` that returns the count of arguments passed to it.

### Example

```
Input: args = [5]
Output: 1

Input: args = [1, 2, 3]
Output: 3
```

## Approach

JavaScript allows any function to be called with an arbitrary number of arguments and inspect `arguments.length`. The C# equivalent is a `params` array parameter, whose `.Length` gives the count of arguments supplied at the call site.

## C# Solution

```csharp
public class Solution
{
    public static int ArgumentsLength(params object[] args)
    {
        return args.Length;
    }
}
```

## Complexity

- **Time:** O(1).
- **Space:** O(1) beyond the params array allocated by the caller.
