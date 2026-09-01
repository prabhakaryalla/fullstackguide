# 2102. Sequentially Ordinal Rank Tracker

**Difficulty:** Hard
**Category:** Design, Heap (Priority Queue), Ordered Set

## Problem

Design a system that tracks scenic locations and allows querying the k-th best location based on a scoring system (score descending, then name ascending). The value of k increments with each query.

Implement the `SORTracker` class with methods `add(name, score)` to add a location and `get()` to return the k-th best location where k starts at 1 and increments with each call.

### Example

```
Input: ["SORTracker", "add", "add", "get", "add", "get"]
       [[], ["bradford", 2], ["branford", 3], [], ["alps", 2], []]
Output: [null, null, null, "branford", null, "alps"]
```

## Approach

Maintain two heaps: a max-heap for locations better than the current k-th and a min-heap for locations at or worse than the current k-th. Initially k=1. On each `get()`, return the top of the min-heap and increment k by rebalancing: move the top of min-heap to max-heap. On `add()`, insert into the appropriate heap and rebalance if needed.

## C# Solution

```csharp
public class SORTracker
{
    private PriorityQueue<(int score, string name), (int, string)> maxHeap;
    private PriorityQueue<(int score, string name), (int, string)> minHeap;
    
    public SORTracker()
    {
        maxHeap = new PriorityQueue<(int, string), (int, string)>(
            Comparer<(int score, string name)>.Create((a, b) =>
            {
                if (a.score != b.score) return b.score.CompareTo(a.score);
                return a.name.CompareTo(b.name);
            }));
        minHeap = new PriorityQueue<(int, string), (int, string)>(
            Comparer<(int score, string name)>.Create((a, b) =>
            {
                if (a.score != b.score) return a.score.CompareTo(b.score);
                return b.name.CompareTo(a.name);
            }));
    }
    
    public void Add(string name, int score)
    {
        maxHeap.Enqueue((score, name), (score, name));
        var top = maxHeap.Dequeue();
        minHeap.Enqueue(top, top);
    }
    
    public string Get()
    {
        var result = minHeap.Dequeue();
        maxHeap.Enqueue(result, result);
        return result.name;
    }
}
```

## Complexity

- **Time:** O(log n) per operation
- **Space:** O(n) for storing all locations
