# 2276. Count Integers in Intervals

**Difficulty:** Hard
**Category:** Design, Segment Tree, Ordered Set

## Problem

Design a data structure that supports adding intervals and counting the total number of integers covered by all intervals. Implement the `CountIntervals` class with methods to add an interval and query the count.

### Example

```
CountIntervals intervals = new CountIntervals();
intervals.add(2, 3);   // Add [2, 3]
intervals.add(7, 10);  // Add [7, 10]
intervals.count();     // Returns 6 (integers 2,3,7,8,9,10)
intervals.add(5, 8);   // Add [5, 8], merges with [7, 10]
intervals.count();     // Returns 8 (integers 2,3,5,6,7,8,9,10)
```

## Approach

Use a sorted set (like SortedSet in C#) to store non-overlapping intervals. When adding a new interval, merge it with any overlapping intervals. Maintain a running count of covered integers.

## C# Solution

```csharp
public class CountIntervals
{
    private SortedDictionary<int, int> intervals;
    private int count;
    
    public CountIntervals()
    {
        intervals = new SortedDictionary<int, int>();
        count = 0;
    }
    
    public void Add(int left, int right)
    {
        var toRemove = new List<int>();
        int newLeft = left, newRight = right;
        
        foreach (var kvp in intervals)
        {
            if (kvp.Value < left || kvp.Key > right) continue;
            
            newLeft = Math.Min(newLeft, kvp.Key);
            newRight = Math.Max(newRight, kvp.Value);
            count -= kvp.Value - kvp.Key + 1;
            toRemove.Add(kvp.Key);
        }
        
        foreach (var key in toRemove)
        {
            intervals.Remove(key);
        }
        
        intervals[newLeft] = newRight;
        count += newRight - newLeft + 1;
    }
    
    public int Count()
    {
        return count;
    }
}
```

## Complexity

- **Time:** O(n) per add operation in worst case, O(1) for count
- **Space:** O(n)
