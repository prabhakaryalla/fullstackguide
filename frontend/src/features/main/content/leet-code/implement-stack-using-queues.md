# 225. Implement Stack using Queues

**Difficulty:** Easy
**Category:** Stack, Design, Queue

## Problem

Implement a last-in-first-out (LIFO) stack using only two queues, supporting `Push`, `Pop`, `Top`, and `Empty`.

### Example

```
Push(1); Push(2);
Top() -> 2
Pop() -> 2
Empty() -> false
```

## Approach

Keep everything in a single queue, but reorder it on every push: after enqueuing the new element, rotate the queue by dequeuing and re-enqueuing all the older elements behind it. This puts the most recently pushed element at the front of the queue, so `Pop`/`Top` (which only ever look at the front) behave like a stack.

## C# Solution

```csharp
public class MyStack
{
    private readonly Queue<int> queue = new();

    public void Push(int x)
    {
        queue.Enqueue(x);

        int rotations = queue.Count - 1;
        for (int i = 0; i < rotations; i++)
        {
            queue.Enqueue(queue.Dequeue());
        }
    }

    public int Pop()
    {
        return queue.Dequeue();
    }

    public int Top()
    {
        return queue.Peek();
    }

    public bool Empty()
    {
        return queue.Count == 0;
    }
}
```

## Complexity

- **Time:** `O(n)` for `Push` (the rotation), `O(1)` for `Pop`/`Top`/`Empty`.
- **Space:** `O(n)` — the queue holds all current stack elements.
