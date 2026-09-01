# 3728. Stable Subarrays With Equal Boundary and Interior Sum

**Difficulty:** Medium
**Category:** Array, Hash Table, Prefix Sum

## Problem

You are given an integer array `capacity`.

A subarray `capacity[l..r]` is considered stable if:

- Its length is at least 3.
- The first and last elements are each equal to the sum of all elements strictly between them, i.e., `capacity[l] = capacity[r] = capacity[l+1] + capacity[l+2] + ... + capacity[r-1]`.

Return the number of stable subarrays.

### Example

```
Input: capacity = [9,3,3,3,9]
Output: 2
Explanation: [9,3,3,3,9] is stable (interior sum 3+3+3=9), and [3,3,3] is stable (interior sum 3).
```

### Constraints

- `3 <= capacity.length <= 10^5`
- `-10^9 <= capacity[i] <= 10^9`

## Approach

Let `prefix[i]` be the sum of the first `i` elements (`prefix[0] = 0`). The interior sum condition `capacity[l+1] + ... + capacity[r-1] = capacity[r]` rewrites as `prefix[r] - prefix[l+1] = capacity[r]`, i.e. `prefix[l+1] = prefix[r] - capacity[r]`. Combined with `capacity[l] = capacity[r]`, for a fixed `r` we need to count earlier indices `l <= r - 2` whose pair `(capacity[l], prefix[l+1])` exactly equals `(capacity[r], prefix[r] - capacity[r])`. Maintain a hash map counting occurrences of `(capacity[l], prefix[l+1])` for all `l` values that have become eligible so far (exactly one new `l = r - 2` becomes eligible each time `r` advances by one), and look up the required key before adding the new one.

## C# Solution

```csharp
public class Solution
{
    public long StableSubarrays(int[] capacity)
    {
        int n = capacity.Length;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++)
        {
            prefix[i + 1] = prefix[i] + capacity[i];
        }

        Dictionary<(int, long), long> seen = new Dictionary<(int, long), long>();
        long count = 0;

        for (int r = 2; r < n; r++)
        {
            int l = r - 2;
            var key = (capacity[l], prefix[l + 1]);
            seen.TryGetValue(key, out long existing);
            seen[key] = existing + 1;

            var queryKey = (capacity[r], prefix[r] - capacity[r]);
            if (seen.TryGetValue(queryKey, out long matches))
            {
                count += matches;
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n)` on average.
- **Space:** `O(n)`.
