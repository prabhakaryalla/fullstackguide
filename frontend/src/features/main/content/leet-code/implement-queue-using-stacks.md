# 232. Implement Queue using Stacks

**Difficulty:** Easy
**Category:** Stack, Design, Queue

## Problem

Implement a first-in-first-out (FIFO) queue using only two stacks, supporting `Push`, `Pop`, `Peek`, and `Empty`.

### Example

```
Push(1); Push(2);
Peek() -> 1
Pop() -> 1
Empty() -> false
```

## Approach

Use two stacks: an "in" stack for pushes, and an "out" stack for pops/peeks. Pushing is always cheap — just push onto "in". When popping or peeking, if "out" is empty, transfer everything from "in" to "out" first (which reverses the order, turning stack order into queue order), then operate on "out"'s top.

## C# Solution

```csharp
public class MyQueue
{
    private readonly Stack<int> inStack = new();
    private readonly Stack<int> outStack = new();

    public void Push(int x)
    {
        inStack.Push(x);
    }

    public int Pop()
    {
        MoveIfNeeded();
        return outStack.Pop();
    }

    public int Peek()
    {
        MoveIfNeeded();
        return outStack.Peek();
    }

    public bool Empty()
    {
        return inStack.Count == 0 && outStack.Count == 0;
    }

    private void MoveIfNeeded()
    {
        if (outStack.Count == 0)
        {
            while (inStack.Count > 0)
            {
                outStack.Push(inStack.Pop());
            }
        }
    }
}
```

## Complexity

- **Time:** `O(1)` amortized for all operations — each element is moved between stacks at most once.
- **Space:** `O(n)` — for the two stacks combined.
