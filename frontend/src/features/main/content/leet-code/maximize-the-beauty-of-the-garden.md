# 1788. Maximize the Beauty of the Garden

**Difficulty:** Hard
**Category:** Array, Prefix Sum, Greedy

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array `flowers` where negative values represent thorny (unattractive) flowers, a garden is any contiguous subarray whose first and last flower values are equal; its beauty is the sum of the subarray with any negative values excluded (treated as removable gaps), except the two matching endpoints must always be counted even if they are negative. Return the maximum beauty over all valid gardens.

### Example

```
Input: flowers = [1,2,3,1,2]
Output: 8
```

## Approach

Maintain a running prefix sum that only accumulates positive values (negative flowers contribute nothing, effectively "skippable"). For every value seen for the second time (or later), the best garden ending here uses its first occurrence and the current index as endpoints: the beauty is the accumulated positive-only sum between them, with a correction of `2 * value` added back when the repeated value itself is negative (since both endpoints must be included even though they were excluded from the positive-only prefix sum).

## C# Solution

```csharp
public class Solution
{
    public int MaximumBeauty(int[] flowers)
    {
        var firstSeenAt = new Dictionary<int, int>();
        long[] prefix = new long[flowers.Length + 1];
        long result = long.MinValue;

        for (int i = 0; i < flowers.Length; i++)
        {
            int f = flowers[i];
            prefix[i + 1] = f > 0 ? prefix[i] + f : prefix[i];

            if (!firstSeenAt.ContainsKey(f))
            {
                firstSeenAt[f] = i;
                continue;
            }

            long candidate = f < 0
                ? 2L * f + prefix[i + 1] - prefix[firstSeenAt[f]]
                : prefix[i + 1] - prefix[firstSeenAt[f]];

            result = Math.Max(result, candidate);
        }

        return (int)result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the prefix sums and lookup map.
