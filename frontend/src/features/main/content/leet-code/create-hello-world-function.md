# 2667. Create Hello World Function

**Difficulty:** Easy
**Category:** Closure, Function

## Problem

Write a function `createHelloWorld`. It should return a new function that, regardless of the arguments passed to it, always returns the string `"Hello World"`.

### Example

```
Input: args = []
Output: "Hello World"
Explanation:
const f = createHelloWorld();
f(); // "Hello World"
```

## Approach

This is a straightforward closure/factory pattern: return a function value that ignores its inputs and always produces the same constant. In C#, we return a `Func<object[], string>` that accepts any number of arguments (mirroring JavaScript's variadic call flexibility) and always returns `"Hello World"`.

## C# Solution

```csharp
public class Solution
{
    public static Func<object[], string> CreateHelloWorld()
    {
        return args => "Hello World";
    }
}
```

## Complexity

- **Time:** O(1).
- **Space:** O(1).
