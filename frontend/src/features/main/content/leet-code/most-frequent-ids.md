# 3092. Most Frequent IDs

**Difficulty:** Hard
**Category:** Array, Hash Table, Ordered Set

## Problem

You are tracking IDs over time. You are given parallel 0-indexed arrays `nums` and `freq` of length `n`. At step `i`, the count of id `nums[i]` changes by `freq[i]` (positive to add occurrences, negative to remove; the id's count never goes negative). After each step, record the count of whichever id currently has the highest count (or `0` if no ids remain). Return an array of these running maximums.

## Approach

Maintain each id's current count in a hash map. Also maintain, for every count value currently held by at least one id, how many ids hold it — and keep the *set* of counts that are actually in use (non-zero holders) in a structure that supports O(1) max lookup. Before updating an id's count, remove its old count from the "in-use" bookkeeping (decrementing that count's holder tally, and dropping the count from the active set if it hits zero); after computing the new count, add it back to the bookkeeping (and to the active set if it wasn't already tracked). After each step, the answer is the maximum value in the active set of counts (or `0` if empty).

## C# Solution

```csharp
public class Solution {
    public long[] MostFrequentIDs(int[] nums, int[] freq) {
        var ans = new long[nums.Length];
        var numCount = new Dictionary<int, long>();
        var freqToCount = new Dictionary<long, int>();
        var activeFreqs = new SortedSet<long>();

        for (int i = 0; i < nums.Length; i++) {
            int num = nums[i];
            int f = freq[i];

            if (numCount.TryGetValue(num, out long oldFreq)) {
                freqToCount[oldFreq]--;
                if (freqToCount[oldFreq] == 0)
                    activeFreqs.Remove(oldFreq);
            }

            long newFreq = numCount.GetValueOrDefault(num) + f;
            if (newFreq == 0) {
                numCount.Remove(num);
            } else {
                numCount[num] = newFreq;
                freqToCount[newFreq] = freqToCount.GetValueOrDefault(newFreq) + 1;
                activeFreqs.Add(newFreq);
            }

            ans[i] = activeFreqs.Count == 0 ? 0 : activeFreqs.Max;
        }

        return ans;
    }
}
```

## Complexity

- Time: O(n log n) — each step performs a constant number of O(log n) sorted-set operations.
- Space: O(n) — the tracking dictionaries and sorted set.
