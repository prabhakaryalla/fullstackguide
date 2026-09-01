# 1655. Distribute Repeating Integers

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Bit Manipulation, Bitmask

## Problem

Given `nums` (values may repeat) and `quantity`, where `quantity[i]` customers need `quantity[i]` items all of the *same* value, determine whether all customers can be satisfied simultaneously using the available counts of each distinct value in `nums`.

### Example

```
Input: nums = [1,2,3,4], quantity = [2]
Output: false
```

## Approach

Since there are at most 10 customers, use bitmask DP over subsets of customers. Precompute the total demand of every subset of customers, and the count of every distinct value in `nums`. `dp[i][mask]` is true if the first `i` distinct values can satisfy every customer in `mask`. For each value, either skip it (`dp[i-1][mask]`) or assign it to some sub-subset of `mask` whose total demand fits within that value's count, recursively relying on the remaining customers being satisfiable by earlier values.

## C# Solution

```csharp
public class Solution
{
    public bool CanDistribute(int[] nums, int[] quantity)
    {
        var frequency = new Dictionary<int, int>();

        foreach (int num in nums)
        {
            frequency[num] = frequency.GetValueOrDefault(num) + 1;
        }

        int[] counts = frequency.Values.ToArray();
        int m = quantity.Length;
        int fullMask = (1 << m) - 1;
        int[] subsetSum = new int[1 << m];

        for (int mask = 1; mask <= fullMask; mask++)
        {
            int lowBit = mask & (-mask);
            int index = (int)Math.Log2(lowBit);
            subsetSum[mask] = subsetSum[mask ^ lowBit] + quantity[index];
        }

        bool[,] dp = new bool[counts.Length + 1, 1 << m];
        dp[0, 0] = true;

        for (int i = 1; i <= counts.Length; i++)
        {
            for (int mask = 0; mask <= fullMask; mask++)
            {
                dp[i, mask] = dp[i - 1, mask];

                if (dp[i, mask])
                {
                    continue;
                }

                for (int subMask = mask; subMask > 0; subMask = (subMask - 1) & mask)
                {
                    if (subsetSum[subMask] <= counts[i - 1] && dp[i - 1, mask ^ subMask])
                    {
                        dp[i, mask] = true;
                        break;
                    }
                }
            }
        }

        return dp[counts.Length, fullMask];
    }
}
```

## Complexity

- **Time:** `O(distinctValues * 3^m)`, from enumerating submasks of every mask.
- **Space:** `O(distinctValues * 2^m)`.
