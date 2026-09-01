# 622. Design Circular Queue

**Difficulty:** Medium
**Category:** Array, Design, Queue, Linked List

## Problem

Design a circular queue of fixed capacity `k`, implementing `EnQueue(value)`, `DeQueue()`, `Front()`, `Rear()`, `IsEmpty()`, and `IsFull()`.

### Example

```
Input:
["MyCircularQueue", "enQueue", "enQueue", "enQueue", "enQueue", "Rear", "isFull", "deQueue", "enQueue", "Rear"]
[[3], [1], [2], [3], [4], [], [], [], [4], []]
Output:
[null, true, true, true, false, 3, true, true, true, 4]
```

### Constraints

- `1 <= k <= 1000`
- At most `3000` calls total to the listed methods.

## Approach

Use a fixed-size array with a `head` index and a running `count` of elements currently stored, treating the array as circular via modulo arithmetic. The tail position is always `(head + count) % capacity`; enqueuing writes there and increments `count`, while dequeuing simply advances `head` and decrements `count`, avoiding any actual shifting of elements.

## C# Solution

```csharp
public class MyCircularQueue
{
    private readonly int[] data;
    private int head;
    private int count;
    private readonly int capacity;

    public MyCircularQueue(int k)
    {
        capacity = k;
        data = new int[k];
    }

    public bool EnQueue(int value)
    {
        if (IsFull()) return false;

        int tail = (head + count) % capacity;
        data[tail] = value;
        count++;
        return true;
    }

    public bool DeQueue()
    {
        if (IsEmpty()) return false;

        head = (head + 1) % capacity;
        count--;
        return true;
    }

    public int Front()
    {
        return IsEmpty() ? -1 : data[head];
    }

    public int Rear()
    {
        return IsEmpty() ? -1 : data[(head + count - 1) % capacity];
    }

    public bool IsEmpty() => count == 0;

    public bool IsFull() => count == capacity;
}
```

## Complexity

- **Time:** `O(1)` per operation.
- **Space:** `O(k)` for the underlying array.
