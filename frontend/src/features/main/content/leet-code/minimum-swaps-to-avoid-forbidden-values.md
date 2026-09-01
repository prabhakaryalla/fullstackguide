# 3785. Minimum Swaps to Avoid Forbidden Values

**Difficulty:** Hard
**Category:** Array, Hash Table, Greedy, Counting

## Problem

Given arrays `nums` and `forbidden` of length `n`, you may swap any two elements of `nums` any number of times. Return the minimum number of swaps so that `nums[i] != forbidden[i]` for every `i`, or `-1` if impossible.

### Example

Input: `nums = [1,2,3], forbidden = [3,2,1]`
Output: `1`

## Approach

Combine frequency counts of `nums` and `forbidden`; if any value's combined frequency is `>= n + 1`, it is impossible (that value cannot avoid appearing at some forbidden position). Otherwise count "bad pairs" where `nums[i] == forbidden[i]`, grouped by value. Pairing two different-valued bad positions together (swap) fixes both in one swap (cost `ceil(totalBad/2)`), but if one value's bad-pair count exceeds half the total, that value bottlenecks the answer to its own count. The answer is `max(ceil(totalBad/2), maxSingleValueBadCount)`.

## C# Solution

```csharp
public class Solution 
{
    public int MinSwaps(int[] nums, int[] forbidden) 
    {
        int n = nums.Length;
        var combinedFreq = new Dictionary<int, int>();
        foreach (int v in nums) { combinedFreq.TryGetValue(v, out int c); combinedFreq[v] = c + 1; }
        foreach (int v in forbidden) { combinedFreq.TryGetValue(v, out int c); combinedFreq[v] = c + 1; }
        foreach (var kv in combinedFreq)
            if (kv.Value >= n + 1) return -1;

        var badPairs = new Dictionary<int, int>();
        int badPairsSum = 0;
        for (int i = 0; i < n; i++)
        {
            if (nums[i] == forbidden[i])
            {
                badPairs.TryGetValue(nums[i], out int c);
                badPairs[nums[i]] = c + 1;
                badPairsSum++;
            }
        }
        int maxBadPairs = badPairs.Count == 0 ? 0 : badPairs.Values.Max();
        int half = (badPairsSum + 1) / 2;
        return Math.Max(half, maxBadPairs);
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
