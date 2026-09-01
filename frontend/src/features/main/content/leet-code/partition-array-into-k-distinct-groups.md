# 3659. Partition Array Into K-Distinct Groups

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting, Hash Map

## Problem
You are given an integer array `nums` and an integer `k`. You want to partition all elements of `nums` into groups such that every group has exactly `k` elements, and within each group all elements are pairwise distinct (no duplicate value appears twice in the same group). Determine whether such a partition is possible, and if so, return the groups (or a boolean indicating feasibility, depending on the exact required output); return the maximum number of such valid groups if a full partition covering all elements is not required, otherwise indicate impossibility.

## Approach
Count the frequency of every distinct value in `nums` using a hash map. Since each group must contain `k` distinct values, no value's frequency can exceed the total number of groups formed (each group can use that value at most once). Let `maxFreq` be the highest frequency among all values, and `distinctCount` be the number of distinct values. A valid partition using all elements into groups of size `k` exists exactly when `nums.Length % k == 0` and `maxFreq <= nums.Length / k` and `distinctCount >= k`. If feasible, construct the groups greedily: repeatedly take one occurrence of each of the `k` most frequent remaining distinct values (using a max-heap keyed by remaining frequency) to form each group, which guarantees no duplicate within a group while balancing frequency usage across the required number of groups.

## C# Solution

```csharp
public class Solution 
{
    public IList<IList<int>> PartitionArray(int[] nums, int k) 
    {
        int n = nums.Length;
        var result = new List<IList<int>>();
        if (n % k != 0) return result; // impossible

        int groupCount = n / k;
        var freq = new Dictionary<int, int>();
        foreach (var num in nums)
        {
            freq[num] = freq.GetValueOrDefault(num, 0) + 1;
        }

        if (freq.Count < k) return result; // not enough distinct values per group
        foreach (var kv in freq)
        {
            if (kv.Value > groupCount) return result; // impossible, a value would repeat within a group
        }

        var maxHeap = new PriorityQueue<int, int>();
        foreach (var kv in freq) maxHeap.Enqueue(kv.Key, -kv.Value);

        var remaining = new Dictionary<int, int>(freq);

        for (int g = 0; g < groupCount; g++)
        {
            var group = new List<int>();
            var used = new List<int>();

            for (int i = 0; i < k; i++)
            {
                int val = maxHeap.Dequeue();
                group.Add(val);
                used.Add(val);
            }

            foreach (var val in used)
            {
                remaining[val]--;
                if (remaining[val] > 0)
                {
                    maxHeap.Enqueue(val, -remaining[val]);
                }
            }

            result.Add(group);
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(n log d) where d is the number of distinct values
- **Space:** O(n)
