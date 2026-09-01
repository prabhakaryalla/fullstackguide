# 155. Min Stack

**Difficulty:** Medium
**Category:** Stack, Design

## Problem

Design a stack that supports `Push`, `Pop`, `Top`, and retrieving the minimum element in constant time. Implement the `MinStack` class with `Push(val)`, `Pop()`, `Top()`, and `GetMin()`, all running in `O(1)`.

### Example 1

```
Input:
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]
Output:
[null,null,null,null,-3,null,0,-2]
```

### Constraints

- `-2^31 <= val <= 2^31 - 1`
- `Pop`, `Top`, and `GetMin` are always called on a non-empty stack.
- At most `3 * 10^4` calls will be made total.

## Approach

Maintain a second "min stack" alongside the main stack, where each push also pushes the minimum-so-far (the smaller of the new value and the current top of the min stack). This keeps `GetMin()` a simple `O(1)` peek, and popping from both stacks together automatically restores the correct previous minimum.

## C# Solution

```csharp
public class MinStack
{
    private readonly Stack<int> stack = new();
    private readonly Stack<int> minStack = new();

    public void Push(int val)
    {
        stack.Push(val);
        int currentMin = minStack.Count == 0 ? val : Math.Min(val, minStack.Peek());
        minStack.Push(currentMin);
    }

    public void Pop()
    {
        stack.Pop();
        minStack.Pop();
    }

    public int Top()
    {
        return stack.Peek();
    }

    public int GetMin()
    {
        return minStack.Peek();
    }
}
```

## Complexity

- **Time:** `O(1)` — for every operation.
- **Space:** `O(n)` — the min stack mirrors the main stack's size.
