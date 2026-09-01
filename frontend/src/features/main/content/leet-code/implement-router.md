# 3508. Implement Router

**Difficulty:** Medium
**Category:** Design, Hash Table, Binary Search, Data Stream, Queue

## Problem

Design a data structure that manages routing network packets, supporting a fixed memory limit. Implement the `Router` class:

- `Router(int memoryLimit)` initializes the router with a maximum of `memoryLimit` packets it can store at once.
- `bool AddPacket(int source, int destination, int timestamp)` adds a packet described by `(source, destination, timestamp)`. Returns `false` if an identical packet (same source, destination, and timestamp) already exists in the router; otherwise adds it and returns `true`. If adding would exceed `memoryLimit`, the **oldest** packet is forwarded (removed) first to make room.
- `int[] ForwardPacket()` removes and returns the oldest packet currently in the router as `[source, destination, timestamp]`, or an empty array if there are none.
- `int GetCount(int destination, int startTime, int endTime)` returns the number of packets currently in the router with the given `destination` and a `timestamp` in the inclusive range `[startTime, endTime]`.

### Example

```
Router router = new Router(3);
router.AddPacket(1, 4, 90);  // true
router.AddPacket(1, 5, 90);  // true
router.AddPacket(3, 5, 95);  // true
router.AddPacket(4, 5, 105); // true, capacity exceeded -> forwards the oldest packet (1,4,90) first
router.GetCount(5, 90, 100); // counts packets to destination 5 with timestamp in [90,100] -> 2
```

## Approach

Use a `Queue` to preserve arrival (FIFO) order for `ForwardPacket`, and a `HashSet` of `(source, destination, timestamp)` tuples for O(1) duplicate detection. For efficient range counting per destination, maintain a `Dictionary<int, List<int>>` mapping each destination to the (naturally increasing) timestamps of its packets, along with a per-destination "consumed" pointer marking how many of the oldest entries have already been forwarded. Since packets are always forwarded in overall arrival order, and a destination's own list is also in arrival order, the pointer always marks a valid prefix to skip. `GetCount` then performs two binary searches (lower/upper bound) on the remaining suffix of that destination's timestamp list.

## C# Solution

```csharp
public class Router 
{
    private readonly int memoryLimit;
    private readonly Queue<(int source, int destination, int timestamp)> queue = new Queue<(int, int, int)>();
    private readonly HashSet<(int, int, int)> seen = new HashSet<(int, int, int)>();
    private readonly Dictionary<int, List<int>> timestampsByDestination = new Dictionary<int, List<int>>();
    private readonly Dictionary<int, int> consumedCount = new Dictionary<int, int>();

    public Router(int memoryLimit)
    {
        this.memoryLimit = memoryLimit;
    }

    public bool AddPacket(int source, int destination, int timestamp)
    {
        var key = (source, destination, timestamp);
        if (seen.Contains(key))
        {
            return false;
        }

        if (queue.Count == memoryLimit)
        {
            ForwardPacket();
        }

        queue.Enqueue(key);
        seen.Add(key);
        if (!timestampsByDestination.TryGetValue(destination, out var list))
        {
            list = new List<int>();
            timestampsByDestination[destination] = list;
            consumedCount[destination] = 0;
        }
        list.Add(timestamp);
        return true;
    }

    public int[] ForwardPacket()
    {
        if (queue.Count == 0)
        {
            return Array.Empty<int>();
        }
        var packet = queue.Dequeue();
        seen.Remove(packet);
        consumedCount[packet.destination]++;
        return new int[] { packet.source, packet.destination, packet.timestamp };
    }

    public int GetCount(int destination, int startTime, int endTime)
    {
        if (!timestampsByDestination.TryGetValue(destination, out var list))
        {
            return 0;
        }
        int from = consumedCount[destination];
        int lo = LowerBound(list, from, startTime);
        int hi = UpperBound(list, from, endTime);
        return hi - lo;
    }

    private int LowerBound(List<int> list, int from, int value)
    {
        int lo = from, hi = list.Count;
        while (lo < hi)
        {
            int mid = (lo + hi) / 2;
            if (list[mid] < value) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }

    private int UpperBound(List<int> list, int from, int value)
    {
        int lo = from, hi = list.Count;
        while (lo < hi)
        {
            int mid = (lo + hi) / 2;
            if (list[mid] <= value) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
```

## Complexity

- **Time:** O(log n) for `AddPacket`/`GetCount`, O(1) amortized for `ForwardPacket`.
- **Space:** O(n), where n is the number of packets currently stored.
