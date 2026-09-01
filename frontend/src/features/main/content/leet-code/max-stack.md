# 716. Max Stack

**Difficulty:** Hard
**Category:** Linked List, Stack, Design, Sorted Container, Doubly-Linked List, Heap
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Design a max stack supporting standard stack operations `Push` and `Pop`, plus `Top` (peek the top), `PeekMax` (return the maximum element), and `PopMax` (remove and return the maximum element, removing the topmost occurrence if there are duplicates).

### Example

```
Input:
["MaxStack", "push", "push", "push", "top", "popMax", "top", "peekMax", "pop", "top"]
[[], [5], [1], [5], [], [], [], [], [], []]
Output:
[null, null, null, null, 5, 5, 1, 5, 1, 5]
```

## Approach

Maintain the stack as a doubly linked list (with sentinel head and tail nodes) so any node, once located, can be removed in `O(1)` without shifting other elements. Separately maintain a sorted map from value to the list of node references holding that value, enabling `O(log n)` lookup of the maximum value and its most recently pushed node (the last one in that value's list, matching topmost-occurrence removal semantics). `Push` appends before the tail sentinel and registers the new node in the map; `Pop` and `PopMax` both remove a node from the linked list and clean up its entry in the map.

## C# Solution

```csharp
public class MaxStack
{
    private class Node
    {
        public int Val;
        public Node Prev, Next;
        public Node(int val) { Val = val; }
    }

    private readonly Node head = new(0), tail = new(0);
    private readonly SortedDictionary<int, List<Node>> nodesByValue = new();

    public MaxStack()
    {
        head.Next = tail;
        tail.Prev = head;
    }

    public void Push(int x)
    {
        var node = new Node(x);
        InsertBefore(tail, node);

        if (!nodesByValue.TryGetValue(x, out var list))
        {
            list = new List<Node>();
            nodesByValue[x] = list;
        }
        list.Add(node);
    }

    public int Pop()
    {
        var node = tail.Prev;
        Remove(node);
        RemoveFromMap(node);
        return node.Val;
    }

    public int Top()
    {
        return tail.Prev.Val;
    }

    public int PeekMax()
    {
        return nodesByValue.Keys.Last();
    }

    public int PopMax()
    {
        int maxValue = nodesByValue.Keys.Last();
        var list = nodesByValue[maxValue];
        var node = list[^1];

        Remove(node);
        RemoveFromMap(node);

        return maxValue;
    }

    private void InsertBefore(Node target, Node node)
    {
        var prev = target.Prev;
        prev.Next = node;
        node.Prev = prev;
        node.Next = target;
        target.Prev = node;
    }

    private void Remove(Node node)
    {
        node.Prev.Next = node.Next;
        node.Next.Prev = node.Prev;
    }

    private void RemoveFromMap(Node node)
    {
        var list = nodesByValue[node.Val];
        list.Remove(node);
        if (list.Count == 0)
            nodesByValue.Remove(node.Val);
    }
}
```

## Complexity

- **Time:** `O(log n)` for `Push` and `PopMax`; `O(1)` for `Pop` and `Top`.
- **Space:** `O(n)` for the linked list and value map.
