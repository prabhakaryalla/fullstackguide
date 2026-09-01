# 1381. Design a Stack With Increment Operation

**Difficulty:** Medium
**Category:** Array, Stack, Design

## Problem

Design a stack of maximum size `maxSize` that supports `push`, `pop`, and `increment(k, val)`, which adds `val` to the bottom `k` elements of the stack (or all elements if the stack has fewer than `k`).

### Example

```
Input: ["CustomStack","push","push","pop","push","push","push","increment","increment","pop","pop","pop","pop"]
[[3],[1],[2],[],[2],[3],[4],[5,100],[2,100],[],[],[],[]]
Output: [null,null,null,2,null,null,null,null,null,103,202,201,-1]
```

## Approach

Store the stack as a list along with a lazily-applied "increment" array of the same capacity. Instead of touching every one of the bottom `k` elements immediately, record the pending increment at index `k - 1`; when popping, apply the top-of-stack's accumulated pending increment to the value being returned and push that pending amount down to the next element below so it isn't lost.

## C# Solution

```csharp
public class CustomStack
{
    private readonly int[] stack;
    private readonly int[] increments;
    private int top = -1;

    public CustomStack(int maxSize)
    {
        stack = new int[maxSize];
        increments = new int[maxSize];
    }

    public void Push(int x)
    {
        if (top + 1 < stack.Length)
        {
            stack[++top] = x;
        }
    }

    public int Pop()
    {
        if (top < 0) return -1;

        int result = stack[top] + increments[top];
        if (top > 0) increments[top - 1] += increments[top];
        increments[top] = 0;
        top--;

        return result;
    }

    public void Increment(int k, int val)
    {
        int idx = Math.Min(k, top + 1) - 1;
        if (idx >= 0) increments[idx] += val;
    }
}
```

## Complexity

- **Time:** `O(1)` for every operation.
- **Space:** `O(maxSize)`.
