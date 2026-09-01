# 146. LRU Cache

**Difficulty:** Medium
**Category:** Hash Table, Linked List, Design, Doubly-Linked List

## Problem

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the `LRUCache` class with a fixed `capacity`: `Get(key)` returns the value if present (and marks it as recently used) or `-1`; `Put(key, value)` inserts or updates the value (marking it as recently used), evicting the least recently used entry if the cache is at capacity. Both operations must run in `O(1)` average time.

### Example 1

```
Input:
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output:
[null, null, null, 1, null, -1, null, -1, 3, 4]
```

### Constraints

- `1 <= capacity <= 3000`
- `0 <= key, value <= 10^4`
- At most `2 * 10^5` calls will be made to `Get` and `Put`.

## Approach

Combine a dictionary (for `O(1)` key lookup) with a doubly-linked list (for `O(1)` reordering) that keeps nodes ordered from most-recently-used (head) to least-recently-used (tail), using two dummy sentinel nodes to avoid null checks at the boundaries. Every access moves the corresponding node to just after the head; every eviction removes the node just before the tail.

## C# Solution

```csharp
public class LRUCache
{
    private class Node
    {
        public int Key, Value;
        public Node Prev, Next;
    }

    private readonly int capacity;
    private readonly Dictionary<int, Node> map = new();
    private readonly Node head = new();
    private readonly Node tail = new();

    public LRUCache(int capacity)
    {
        this.capacity = capacity;
        head.Next = tail;
        tail.Prev = head;
    }

    public int Get(int key)
    {
        if (!map.TryGetValue(key, out var node)) return -1;

        MoveToFront(node);
        return node.Value;
    }

    public void Put(int key, int value)
    {
        if (map.TryGetValue(key, out var existing))
        {
            existing.Value = value;
            MoveToFront(existing);
            return;
        }

        if (map.Count == capacity)
        {
            var lru = tail.Prev;
            Remove(lru);
            map.Remove(lru.Key);
        }

        var node = new Node { Key = key, Value = value };
        map[key] = node;
        AddToFront(node);
    }

    private void Remove(Node node)
    {
        node.Prev.Next = node.Next;
        node.Next.Prev = node.Prev;
    }

    private void AddToFront(Node node)
    {
        node.Next = head.Next;
        node.Prev = head;
        head.Next.Prev = node;
        head.Next = node;
    }

    private void MoveToFront(Node node)
    {
        Remove(node);
        AddToFront(node);
    }
}
```

## Complexity

- **Time:** `O(1)` average — for both `Get` and `Put`.
- **Space:** `O(capacity)` — for the dictionary and linked list nodes.
