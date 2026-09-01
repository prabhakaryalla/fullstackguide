# 1590. Make Sum Divisible by P

**Difficulty:** Medium
**Category:** Array, Hash Table, Prefix Sum

## Problem

Given an array `nums` and an integer `p`, remove the smallest possible non-empty subarray so that the sum of the remaining elements is divisible by `p`. Return the length of that subarray, or `-1` if it isn't possible (or if the whole array would need to be removed).

### Example

```
Input: nums = [3,1,4,2], p = 6
Output: 1
```

## Approach

Let `remainder = (totalSum) % p`. If `remainder == 0`, no removal is needed, so the answer is `0`. Otherwise, we need to find the shortest subarray whose sum modulo `p` equals `remainder`. Track running prefix sums modulo `p`, and for each prefix, compute the needed *previous* prefix remainder as `(currentPrefixMod - remainder + p) % p`; look it up in a hash map storing the most recent index for each prefix-mod value seen so far, and update the best (shortest) length found.

## C# Solution

```csharp
public class Solution
{
    public int MinSubarray(int[] nums, int p)
    {
        long totalSum = 0;
        foreach (int num in nums)
        {
            totalSum += num;
        }

        long remainder = totalSum % p;
        if (remainder == 0)
        {
            return 0;
        }

        int n = nums.Length;
        var lastIndex = new Dictionary<long, int> { { 0, -1 } };
        long prefixMod = 0;
        int best = n;

        for (int i = 0; i < n; i++)
        {
            prefixMod = (prefixMod + nums[i]) % p;
            long needed = (prefixMod - remainder + p) % p;

            if (lastIndex.TryGetValue(needed, out int prevIndex))
            {
                best = Math.Min(best, i - prevIndex);
            }

            lastIndex[prefixMod] = i;
        }

        return best == n ? -1 : best;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the array.
- **Space:** `O(min(n, p))` for the hash map of prefix-mod indices.
