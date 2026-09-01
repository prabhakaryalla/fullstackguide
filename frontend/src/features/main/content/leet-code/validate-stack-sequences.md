# 946. Validate Stack Sequences

**Difficulty:** Medium
**Category:** Array, Stack, Simulation

## Problem

Given two integer arrays `pushed` and `popped`, both permutations of the same values, return `true` if they could represent the sequence of push and pop operations on an initially empty stack.

### Example

```
Input: pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
Output: true
```

## Approach

Simulate with an actual stack: push each value from `pushed` in order, and after every push, pop from the stack while its top matches the next expected value in `popped`. If the simulation consumes all of `pushed` and the stack ends up empty, the sequence is valid.

## C# Solution

```csharp
public class Solution
{
    public bool ValidateStackSequences(int[] pushed, int[] popped)
    {
        var stack = new Stack<int>();
        int j = 0;

        foreach (var x in pushed)
        {
            stack.Push(x);

            while (stack.Count > 0 && stack.Peek() == popped[j])
            {
                stack.Pop();
                j++;
            }
        }

        return stack.Count == 0;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the stack.
