# 1187. Make Array Strictly Increasing

**Difficulty:** Hard
**Category:** Array, Binary Search, Dynamic Programming

## Problem

Given arrays `arr1` and `arr2`, in one operation you may replace any element of `arr1` with any element of `arr2`. Return the minimum number of operations needed to make `arr1` strictly increasing, or `-1` if it's impossible.

### Example

```
Input: arr1 = [1,5,3,6,7], arr2 = [1,3,2,4]
Output: 1
```

## Approach

Sort and deduplicate `arr2`, then process `arr1` left to right while tracking a frontier of `(lastValue, minReplacements)` pairs representing the best achievable states so far. For each element, every frontier state can either keep the original value (if it's greater than that state's `lastValue`) or replace it with the smallest available `arr2` value greater than `lastValue` (incrementing the replacement count). After processing each element, prune the frontier down to its Pareto-optimal states — for a given `lastValue`, only entries where no smaller-or-equal `lastValue` achieves the same or fewer replacements are kept. The minimum replacement count across the final frontier is the answer.

## C# Solution

```csharp
public class Solution
{
    public int MakeArrayIncreasing(int[] arr1, int[] arr2)
    {
        Array.Sort(arr2);
        arr2 = arr2.Distinct().ToArray();

        var dp = new SortedDictionary<long, int> { [long.MinValue] = 0 };

        foreach (int num in arr1)
        {
            var next = new SortedDictionary<long, int>();

            foreach (var (lastValue, ops) in dp)
            {
                if (num > lastValue)
                {
                    UpdateBest(next, num, ops);
                }

                int idx = UpperBound(arr2, lastValue);
                if (idx < arr2.Length)
                {
                    UpdateBest(next, arr2[idx], ops + 1);
                }
            }

            if (next.Count == 0) return -1;
            dp = Prune(next);
        }

        return dp.Values.Min();
    }

    private void UpdateBest(SortedDictionary<long, int> map, long value, int ops)
    {
        if (!map.TryGetValue(value, out int existing) || ops < existing)
        {
            map[value] = ops;
        }
    }

    private SortedDictionary<long, int> Prune(SortedDictionary<long, int> map)
    {
        var pruned = new SortedDictionary<long, int>();
        int minOpsSoFar = int.MaxValue;

        foreach (var kv in map)
        {
            if (kv.Value < minOpsSoFar)
            {
                pruned[kv.Key] = kv.Value;
                minOpsSoFar = kv.Value;
            }
        }

        return pruned;
    }

    private int UpperBound(int[] arr, long value)
    {
        int lo = 0, hi = arr.Length;
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (arr[mid] <= value) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
```

## Complexity

- **Time:** `O(n^2 log n)` worst case, where `n` is `arr1.Length`.
- **Space:** `O(n)` for the DP frontier.
