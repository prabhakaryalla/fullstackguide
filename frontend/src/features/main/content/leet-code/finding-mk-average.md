# 1825. Finding MK Average

**Difficulty:** Hard
**Category:** Design, Heap, Data Stream, Ordered Set, Queue

## Problem

Design a data structure that supports adding numbers one at a time to a stream and computing the "MKAverage": once at least `m` elements have been added, take the most recent `m` elements, remove the smallest `k` and largest `k` of them, and return the (floored) average of the remaining `m - 2k` elements. Before `m` elements have been added, `calculateMKAverage` returns `-1`.

## Approach

Keep the last `m` elements in a `Queue` (each tagged with a unique insertion id to disambiguate duplicate values in sorted sets) and maintain three `SortedSet<(value, id)>` buckets — `low` (the current `k` smallest), `mid` (the middle `m - 2k`), and `high` (the current `k` largest) — plus a running `_midSum`. On insertion, place the new element into whichever bucket its value belongs to by comparing against the current boundaries (`low.Max`/`high.Min`), defaulting to `mid`; once the window exceeds `m`, remove the oldest element from whichever bucket currently holds it. Finally rebalance by repeatedly moving the extreme boundary element between adjacent buckets until `low.Count == k` and `high.Count == k`, which restores the correct three-way partition since values were already inserted in the correct relative order. `calculateMKAverage` simply divides `_midSum` by `m - 2k`.

## C# Solution

```csharp
public class MKAverage
{
    private readonly int _m, _k;
    private readonly Queue<(int val, int id)> _window = new();
    private readonly SortedSet<(int val, int id)> _low = new();
    private readonly SortedSet<(int val, int id)> _mid = new();
    private readonly SortedSet<(int val, int id)> _high = new();
    private long _midSum;
    private int _nextId;

    public MKAverage(int m, int k)
    {
        _m = m;
        _k = k;
    }

    public void AddElement(int num)
    {
        var item = (num, _nextId++);
        _window.Enqueue(item);

        if (_low.Count > 0 && item.CompareTo(_low.Max) <= 0)
        {
            _low.Add(item);
        }
        else if (_high.Count > 0 && item.CompareTo(_high.Min) >= 0)
        {
            _high.Add(item);
        }
        else
        {
            _mid.Add(item);
            _midSum += num;
        }

        if (_window.Count > _m)
        {
            Remove(_window.Dequeue());
        }

        Rebalance();
    }

    public int CalculateMKAverage()
    {
        if (_window.Count < _m) return -1;
        return (int)(_midSum / (_m - 2 * _k));
    }

    private void Remove((int val, int id) item)
    {
        if (_low.Remove(item)) return;
        if (_mid.Remove(item)) { _midSum -= item.val; return; }
        _high.Remove(item);
    }

    private void Rebalance()
    {
        while (_low.Count < _k && _mid.Count > 0)
        {
            var item = _mid.Min;
            _mid.Remove(item);
            _midSum -= item.val;
            _low.Add(item);
        }
        while (_low.Count > _k)
        {
            var item = _low.Max;
            _low.Remove(item);
            _mid.Add(item);
            _midSum += item.val;
        }
        while (_high.Count < _k && _mid.Count > 0)
        {
            var item = _mid.Max;
            _mid.Remove(item);
            _midSum -= item.val;
            _high.Add(item);
        }
        while (_high.Count > _k)
        {
            var item = _high.Min;
            _high.Remove(item);
            _mid.Add(item);
            _midSum += item.val;
        }
    }
}
```

## Complexity

- **Time:** `O(log m)` per `AddElement` call for the sorted-set operations; `O(1)` for `CalculateMKAverage`.
- **Space:** `O(m)` for the window and the three buckets.
