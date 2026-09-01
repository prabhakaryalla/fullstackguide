# 3645. Maximum Total From Optimal Activation Order

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting, Heap (Priority Queue)

## Problem
You are given two integer arrays `value` and `limit`, both of length `n`, describing `n` items. You may activate items in any order, but item `i` can only be activated while the number of items already activated is strictly less than `limit[i]`. Each activated item `i` contributes `value[i]` to the total. You want to choose an order of activation (activating a subset, possibly all, of the items) that maximizes the total value obtained, where an item can be activated only if the constraint on the number of previously activated items is satisfied at the moment of its activation. Return the maximum total value achievable.

## Approach
Group items by their `limit` value. Process potential activation "slots" from the largest limit down to the smallest (or equivalently, process in increasing order of the number of already-activated items allowed). For each limit threshold, only items whose `limit` is greater than the current activated count are eligible. A greedy strategy works well here: sort items by `limit` in descending order, and maintain a min-heap of "eligible" values while walking activation slots from high to low, always picking the largest available values first for the slots that can still accept them. Concretely: sort items by `limit` descending; iterate slot index `k` from the maximum reachable limit downwards, adding all items with `limit > k` into a max-heap (or maintain a running multiset), and at each slot pick the best available item to activate. Since the number of slots is bounded by `n`, use a max-heap seeded incrementally by decreasing limit thresholds, popping the best value that can still be activated at the current count.

A simpler and provably correct way: sort limits, and greedily use a max-heap where we only allow items into consideration once the count of activated items is less than their limit — process count from 0 upward, at each step add all items whose limit is greater than count (i.e., limit == count+1 or more, but only need to add those with limit == count+1 since larger ones added earlier) is subtle; the cleanest implementation sorts items by limit ascending, and iterates activated-count downward using a max-heap that we build by adding items as we relax the count threshold from n down to 0, activating the largest value item whenever the current count is less than its limit.

## C# Solution

```csharp
public class Solution 
{
    public long MaxTotal(int[] value, int[] limit) 
    {
        int n = value.Length;
        var groups = new SortedDictionary<int, List<int>>();
        for (int i = 0; i < n; i++)
        {
            if (!groups.ContainsKey(limit[i])) groups[limit[i]] = new List<int>();
            groups[limit[i]].Add(value[i]);
        }

        // Process limits in descending order, maintaining a max-heap of values
        // whose limit allows activation at the current (decreasing) count.
        var limitsDesc = new List<int>(groups.Keys);
        limitsDesc.Sort((a, b) => b.CompareTo(a));

        var maxHeap = new PriorityQueue<int, int>();
        long total = 0;
        int activated = 0;
        int idx = 0;
        int maxLimit = limitsDesc.Count > 0 ? limitsDesc[0] : 0;

        // count represents number already activated; item usable if limit > count
        for (int count = maxLimit - 1; count >= 0; count--)
        {
            while (idx < limitsDesc.Count && limitsDesc[idx] == count + 1)
            {
                foreach (var v in groups[limitsDesc[idx]])
                    maxHeap.Enqueue(v, -v);
                idx++;
            }
            if (maxHeap.Count > 0)
            {
                int best = maxHeap.Dequeue();
                total += best;
                activated++;
            }
        }

        return total;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
