# 2629. Function Composition

**Difficulty:** Easy
**Category:** Closures

## Problem
Given an array of single-argument functions, implement `compose(functions)` that returns a new single-argument function applying each function from **last to first**: `compose([f, g, h])(x)` should equal `f(g(h(x)))`. If the array is empty, the returned function is the identity function.

## Approach
Return a lambda that starts with the input value and iterates the functions array **backwards**, applying each function to the running result in turn. This produces the right-to-left composition order without needing recursion.

## C# Solution

```csharp
public class Solution
{
    public Func<int, int> Compose(Func<int, int>[] functions)
    {
        return x =>
        {
            int result = x;
            for (int i = functions.Length - 1; i >= 0; i--)
            {
                result = functions[i](result);
            }
            return result;
        };
    }
}
```

## Complexity

- **Time:** O(k) per invocation, where `k` is the number of functions.
- **Space:** O(1) beyond the returned closure.
