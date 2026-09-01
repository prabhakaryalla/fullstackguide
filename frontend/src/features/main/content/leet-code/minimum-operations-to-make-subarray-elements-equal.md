# 3422. Minimum Operations to Make Subarray Elements Equal

**Difficulty:** Hard
**Category:** Array, Heap (Priority Queue), Sliding Window, Two Pointers
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given an integer array `nums` and an integer `k`, consider every contiguous subarray of length `k`. In one operation you may increase or decrease any element of the subarray by 1. For each subarray, the minimum number of operations needed to make all of its elements equal is the sum of absolute differences between each element and the subarray's median. Return the minimum such cost over all subarrays of length `k`.

## Approach
The value that minimizes the sum of absolute differences to a fixed multiset is the **median**. Maintain a sliding window of size `k` using two heaps: a max-heap `low` holding the smaller half and a min-heap `high` holding the larger half, kept balanced so `low.Count` is `high.Count` or `high.Count + 1`. Track the running sum of each half so the cost of the current window can be computed in O(1): `median * lowCount - lowSum + (highSum - median * highCount)`.

Because a plain heap cannot efficiently remove an arbitrary element when the window slides, use **lazy deletion**: mark a value as pending removal in a counter dictionary, adjust the logical size/sum for whichever half it belonged to, and only physically pop stale entries when they surface at the top of a heap. After every insertion or removal, rebalance the two heaps by moving the boundary element across so the size invariant holds, then read the median from the top of `low`.

## C# Solution

```csharp
public class Solution 
{
    private PriorityQueue<int, int> _low = new();  // max-heap: priority = -value
    private PriorityQueue<int, int> _high = new(); // min-heap: priority = value
    private readonly Dictionary<int, int> _deleted = new();
    private long _lowSum, _highSum;
    private int _lowCount, _highCount;

    public long MinOperations(int[] nums, int k) 
    {
        long best = long.MaxValue;
        int n = nums.Length;

        for (int r = 0; r < n; r++) 
        {
            Add(nums[r]);
            if (r >= k) Remove(nums[r - k]);

            if (r >= k - 1) 
            {
                int median = LowTop();
                long cost = (long)median * _lowCount - _lowSum + (_highSum - (long)median * _highCount);
                best = Math.Min(best, cost);
            }
        }

        return best;
    }

    private void Add(int x) 
    {
        if (_lowCount == 0 || x <= LowTop()) 
        {
            _low.Enqueue(x, -x);
            _lowSum += x;
            _lowCount++;
        } 
        else 
        {
            _high.Enqueue(x, x);
            _highSum += x;
            _highCount++;
        }
        Rebalance();
    }

    private void Remove(int x) 
    {
        _deleted[x] = _deleted.GetValueOrDefault(x) + 1;
        if (_lowCount > 0 && x <= LowTop()) 
        {
            _lowCount--;
            _lowSum -= x;
        } 
        else 
        {
            _highCount--;
            _highSum -= x;
        }
        Rebalance();
    }

    private void Rebalance() 
    {
        while (_lowCount > _highCount + 1) 
        {
            int val = LowPop();
            _lowCount--; _lowSum -= val;
            _high.Enqueue(val, val);
            _highCount++; _highSum += val;
        }
        while (_highCount > _lowCount) 
        {
            int val = HighPop();
            _highCount--; _highSum -= val;
            _low.Enqueue(val, -val);
            _lowCount++; _lowSum += val;
        }
    }

    private void Prune(PriorityQueue<int, int> heap) 
    {
        while (heap.Count > 0 && _deleted.TryGetValue(heap.Peek(), out int c) && c > 0) 
        {
            _deleted[heap.Peek()] = c - 1;
            heap.Dequeue();
        }
    }

    private int LowTop() 
    {
        Prune(_low);
        return _low.Peek();
    }

    private int LowPop() 
    {
        Prune(_low);
        return _low.Dequeue();
    }

    private int HighPop() 
    {
        Prune(_high);
        return _high.Dequeue();
    }
}
```

## Complexity

- **Time:** O(n log k) — each element is pushed/popped from a heap a constant number of times.
- **Space:** O(k) for the two heaps and the deletion tracker.
