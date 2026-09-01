# 1787. Make the XOR of All Segments Equal to Zero

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Bit Manipulation

## Problem

Given an array `nums` and an integer `k`, you may change any element to any non-negative value less than `2^10`. Return the minimum number of changes needed so that the XOR of every contiguous subarray of length `k` equals `0`.

### Example

```
Input: nums = [1,2,0,3,0], k = 1
Output: 3
```

## Approach

Every window of length `k` XORing to zero forces `nums[i] == nums[i + k]` for all valid `i`, so the array must be periodic with period `k`, and one full period's values must themselves XOR to `0`. Group indices by `i mod k`. Process the `k` groups one at a time with a DP over the possible cumulative XOR value (`0..1023`): for each group, either "pay" the group's full size to reach an arbitrary XOR target (using the best XOR state so far) or reuse one of the group's existing values at a discount equal to how often it already appears.

## C# Solution

```csharp
public class Solution
{
    public int MinChanges(int[] nums, int k)
    {
        const int Size = 1024;
        int n = nums.Length;
        int[] dp = new int[Size];
        Array.Fill(dp, int.MaxValue / 2);
        dp[0] = 0;

        for (int g = 0; g < k; g++)
        {
            var counts = new Dictionary<int, int>();
            int groupSize = 0;
            for (int i = g; i < n; i += k)
            {
                counts[nums[i]] = counts.GetValueOrDefault(nums[i], 0) + 1;
                groupSize++;
            }

            int minPrev = int.MaxValue;
            foreach (int v in dp) minPrev = Math.Min(minPrev, v);

            int[] newDp = new int[Size];
            for (int x = 0; x < Size; x++) newDp[x] = minPrev + groupSize;

            foreach (var kv in counts)
            {
                int value = kv.Key, freq = kv.Value;
                int cost = groupSize - freq;
                for (int x = 0; x < Size; x++)
                {
                    int candidate = dp[x ^ value] + cost;
                    if (candidate < newDp[x]) newDp[x] = candidate;
                }
            }

            dp = newDp;
        }

        return dp[0];
    }
}
```

## Complexity

- **Time:** `O(n * 1024)`.
- **Space:** `O(1024)`.
