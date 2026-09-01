# 707. Design Linked List

**Difficulty:** Medium
**Category:** Linked List, Design

## Problem

Design a singly linked list supporting `Get(index)`, `AddAtHead(val)`, `AddAtTail(val)`, `AddAtIndex(index, val)`, and `DeleteAtIndex(index)`.

### Example

```
Input:
["MyLinkedList", "addAtHead", "addAtTail", "addAtIndex", "get", "deleteAtIndex", "get"]
[[], [1], [3], [1, 2], [1], [1], [1]]
Output:
[null, null, null, null, 2, null, 3]
```

## Approach

Use a dummy head node that always precedes the actual first element, simplifying insertion and deletion logic by eliminating special-casing for operations at the very front of the list. Maintain a running `size` count to validate index bounds before performing any operation, and walk from the dummy head the appropriate number of steps to reach the node just before the target position.

## C# Solution

```csharp
public class MyLinkedList
{
    private class Node
    {
        public int Val;
        public Node Next;
        public Node(int val) { Val = val; }
    }

    private readonly Node head = new(-1);
    private int size = 0;

    public int Get(int index)
    {
        if (index < 0 || index >= size) return -1;

        var current = head.Next;
        for (int i = 0; i < index; i++)
            current = current.Next;

        return current.Val;
    }

    public void AddAtHead(int val) => AddAtIndex(0, val);

    public void AddAtTail(int val) => AddAtIndex(size, val);

    public void AddAtIndex(int index, int val)
    {
        if (index > size) return;
        if (index < 0) index = 0;

        var prev = head;
        for (int i = 0; i < index; i++)
            prev = prev.Next;

        var node = new Node(val) { Next = prev.Next };
        prev.Next = node;
        size++;
    }

    public void DeleteAtIndex(int index)
    {
        if (index < 0 || index >= size) return;

        var prev = head;
        for (int i = 0; i < index; i++)
            prev = prev.Next;

        prev.Next = prev.Next.Next;
        size--;
    }
}
```

## Complexity

- **Time:** `O(index)` per operation.
- **Space:** `O(n)` for the stored nodes.
