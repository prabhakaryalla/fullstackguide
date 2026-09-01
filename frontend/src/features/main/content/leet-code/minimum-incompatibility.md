# 1681. Minimum Incompatibility

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Bit Manipulation, Bitmask

## Problem

Given `nums` and `k`, split it into `k` subsets of equal size (`n / k` each) such that no subset contains duplicate values, minimizing the total "incompatibility" (sum, across subsets, of `max - min` within that subset). Return the minimum total incompatibility, or `-1` if it's impossible.

### Example

```
Input: nums = [1,2,1,4], k = 2
Output: 4
```

## Approach

Since `n <= 16`, precompute the incompatibility cost of every bitmask of size exactly `n / k` that contains no duplicate values (invalid masks with duplicates are simply excluded). Then run a subset-sum-style bitmask DP: `dp[mask]` is the minimum total incompatibility to partition exactly the elements in `mask` into valid same-size groups, computed by trying every valid group-sized submask of `mask` as "the next group peeled off" and recursing into the remainder.

## C# Solution

```csharp
public class Solution
{
    public int MinimumIncompatibility(int[] nums, int k)
    {
        int n = nums.Length;
        int groupSize = n / k;

        if (groupSize == 1)
        {
            return 0;
        }

        int fullMask = (1 << n) - 1;
        Dictionary<int, int> subsetCost = new Dictionary<int, int>();

        for (int mask = 0; mask <= fullMask; mask++)
        {
            if (CountBits(mask) != groupSize)
            {
                continue;
            }

            HashSet<int> seen = new HashSet<int>();
            int min = int.MaxValue;
            int max = int.MinValue;
            bool valid = true;

            for (int i = 0; i < n; i++)
            {
                if ((mask & (1 << i)) != 0)
                {
                    if (!seen.Add(nums[i]))
                    {
                        valid = false;
                        break;
                    }

                    min = Math.Min(min, nums[i]);
                    max = Math.Max(max, nums[i]);
                }
            }

            if (valid)
            {
                subsetCost[mask] = max - min;
            }
        }

        int[] dp = new int[1 << n];
        Array.Fill(dp, int.MaxValue / 2);
        dp[0] = 0;

        for (int mask = 1; mask <= fullMask; mask++)
        {
            if (CountBits(mask) % groupSize != 0)
            {
                continue;
            }

            for (int subMask = mask; subMask > 0; subMask = (subMask - 1) & mask)
            {
                if (subsetCost.TryGetValue(subMask, out int cost))
                {
                    dp[mask] = Math.Min(dp[mask], dp[mask ^ subMask] + cost);
                }
            }
        }

        return dp[fullMask] >= int.MaxValue / 2 ? -1 : dp[fullMask];
    }

    private int CountBits(int mask)
    {
        int count = 0;

        while (mask > 0)
        {
            count += mask & 1;
            mask >>= 1;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(3^n)` in the worst case, from submask enumeration.
- **Space:** `O(2^n)`.
