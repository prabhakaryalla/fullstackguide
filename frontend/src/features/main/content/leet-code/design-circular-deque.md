# 641. Design Circular Deque

**Difficulty:** Medium
**Category:** Array, Design, Linked List, Queue

## Problem

Design a circular double-ended queue of fixed capacity `k`, implementing `InsertFront`, `InsertLast`, `DeleteFront`, `DeleteLast`, `GetFront`, `GetRear`, `IsEmpty`, and `IsFull`.

### Example

```
Input:
["MyCircularDeque", "insertLast", "insertLast", "insertFront", "getRear", "isFull", "deleteLast", "insertFront", "getFront"]
[[3], [1], [2], [3], [], [], [], [4], []]
Output:
[null, true, true, true, 2, true, true, true, 4]
```

## Approach

Use a fixed-size array with a `head` index and a `count` of currently stored elements, treating the array as circular via modulo arithmetic. `InsertFront` decrements `head` (wrapping around) before writing; `InsertLast` writes at `(head + count) % capacity`. Both deletions simply adjust `head` or `count` without shifting any elements, since the circular indexing already tracks the logical front and back.

## C# Solution

```csharp
public class MyCircularDeque
{
    private readonly int[] data;
    private int head;
    private int count;
    private readonly int capacity;

    public MyCircularDeque(int k)
    {
        capacity = k;
        data = new int[k];
    }

    public bool InsertFront(int value)
    {
        if (IsFull()) return false;

        head = (head - 1 + capacity) % capacity;
        data[head] = value;
        count++;
        return true;
    }

    public bool InsertLast(int value)
    {
        if (IsFull()) return false;

        int tail = (head + count) % capacity;
        data[tail] = value;
        count++;
        return true;
    }

    public bool DeleteFront()
    {
        if (IsEmpty()) return false;

        head = (head + 1) % capacity;
        count--;
        return true;
    }

    public bool DeleteLast()
    {
        if (IsEmpty()) return false;

        count--;
        return true;
    }

    public int GetFront()
    {
        return IsEmpty() ? -1 : data[head];
    }

    public int GetRear()
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
