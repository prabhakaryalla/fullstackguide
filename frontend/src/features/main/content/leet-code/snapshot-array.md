# 1146. Snapshot Array

**Difficulty:** Medium
**Category:** Array, Hash Table, Binary Search, Design

## Problem

Design a `SnapshotArray` that supports `Set(index, val)`, `Snap()` (which takes a snapshot and returns the snapshot's ID, starting at `0` and incrementing each call), and `Get(index, snap_id)` (which returns the value at `index` at the time of the given snapshot).

### Example

```
Input:
["SnapshotArray","set","snap","set","get"]
[[3],[0,5],[],[0,6],[0,0]]
Output:
[null,null,0,null,5]
```

## Approach

For each index, maintain a list of `(snapshotId, value)` pairs recorded only when a value actually changes, instead of storing a full copy of the array per snapshot. `Set` either updates the most recent entry (if it belongs to the current, not-yet-snapped state) or appends a new entry. `Get` binary searches that index's history for the latest entry whose snapshot ID is `<=` the requested one.

## C# Solution

```csharp
public class SnapshotArray
{
    private readonly List<(int snapId, int value)>[] history;
    private int snapId;

    public SnapshotArray(int length)
    {
        history = new List<(int, int)>[length];
        for (int i = 0; i < length; i++)
        {
            history[i] = new List<(int, int)> { (0, 0) };
        }
    }

    public void Set(int index, int val)
    {
        var list = history[index];
        if (list[^1].snapId == snapId)
        {
            list[^1] = (snapId, val);
        }
        else
        {
            list.Add((snapId, val));
        }
    }

    public int Snap()
    {
        return snapId++;
    }

    public int Get(int index, int snap_id)
    {
        var list = history[index];
        int lo = 0, hi = list.Count - 1;

        while (lo < hi)
        {
            int mid = lo + (hi - lo + 1) / 2;
            if (list[mid].snapId <= snap_id) lo = mid;
            else hi = mid - 1;
        }

        return list[lo].value;
    }
}
```

## Complexity

- **Time:** `O(1)` amortized for `Set`/`Snap`, `O(log k)` for `Get`.
- **Space:** `O(n + total sets)`.
