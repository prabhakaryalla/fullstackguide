# 460. LFU Cache

**Difficulty:** Hard
**Category:** Hash Table, Linked List, Design, Doubly-Linked List

## Problem

Design a Least Frequently Used (LFU) cache with a fixed `capacity`, implementing `Get(key)` (returns the value and increases its usage frequency, or `-1` if absent) and `Put(key, value)` (inserts or updates a value, evicting the least frequently used entry — breaking ties by least recently used — when at capacity). Both operations must run in `O(1)` average time.

### Example

```
Input:
["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]
Output:
[null, null, null, 1, null, -1, 3, null, -1, 3, 4]
```

### Constraints

- `0 <= capacity <= 10^4`
- `0 <= key, value <= 10^5`
- At most `2 * 10^5` calls will be made to `Get` and `Put`.

## Approach

Maintain a doubly linked list per distinct frequency value, each ordered from most- to least-recently-used within that frequency, plus a dictionary mapping each key to its node and a `minFreq` counter tracking the lowest frequency currently in use. On access, move a node from its current frequency's list to the front of the next frequency's list, bumping `minFreq` if the old list becomes empty. Eviction always removes the least-recently-used node from the `minFreq` list.

## C# Solution

```csharp
public class LFUCache
{
    private class Node
    {
        public int Key, Value, Freq = 1;
        public Node Prev, Next;
    }

    private class FreqList
    {
        public Node Head = new(), Tail = new();
        public FreqList() { Head.Next = Tail; Tail.Prev = Head; }
        public bool IsEmpty => Head.Next == Tail;

        public void AddFront(Node node)
        {
            node.Next = Head.Next;
            node.Prev = Head;
            Head.Next.Prev = node;
            Head.Next = node;
        }

        public void Remove(Node node)
        {
            node.Prev.Next = node.Next;
            node.Next.Prev = node.Prev;
        }
    }

    private readonly int capacity;
    private int minFreq;
    private readonly Dictionary<int, Node> nodeByKey = new();
    private readonly Dictionary<int, FreqList> listByFreq = new();

    public LFUCache(int capacity)
    {
        this.capacity = capacity;
    }

    public int Get(int key)
    {
        if (!nodeByKey.TryGetValue(key, out var node)) return -1;

        Touch(node);
        return node.Value;
    }

    public void Put(int key, int value)
    {
        if (capacity == 0) return;

        if (nodeByKey.TryGetValue(key, out var existing))
        {
            existing.Value = value;
            Touch(existing);
            return;
        }

        if (nodeByKey.Count == capacity)
        {
            var list = listByFreq[minFreq];
            var evict = list.Tail.Prev;
            list.Remove(evict);
            nodeByKey.Remove(evict.Key);
        }

        var node = new Node { Key = key, Value = value };
        nodeByKey[key] = node;
        minFreq = 1;

        if (!listByFreq.TryGetValue(1, out var freqList))
        {
            freqList = new FreqList();
            listByFreq[1] = freqList;
        }

        freqList.AddFront(node);
    }

    private void Touch(Node node)
    {
        var oldList = listByFreq[node.Freq];
        oldList.Remove(node);

        if (node.Freq == minFreq && oldList.IsEmpty)
            minFreq++;

        node.Freq++;

        if (!listByFreq.TryGetValue(node.Freq, out var newList))
        {
            newList = new FreqList();
            listByFreq[node.Freq] = newList;
        }

        newList.AddFront(node);
    }
}
```

## Complexity

- **Time:** `O(1)` average for both `Get` and `Put`.
- **Space:** `O(capacity)`.
