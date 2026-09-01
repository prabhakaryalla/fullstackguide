# 368. Largest Divisible Subset

**Difficulty:** Medium
**Category:** Array, Math, Dynamic Programming, Sorting

## Problem

Given a set of distinct positive integers `nums`, return the largest subset such that every pair `(nums[i], nums[j])` of elements in the subset satisfies `nums[i] % nums[j] == 0` or `nums[j] % nums[i] == 0`.

### Example

```
Input: nums = [1,2,4,8]
Output: [1,2,4,8]
```

### Constraints

- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 2 * 10^9`
- All the integers in `nums` are unique.

## Approach

Sort `nums` ascending so that divisibility chains only need to check backward. Use dynamic programming where `dp[i]` is the length of the longest divisible subset ending at `nums[i]`, and `prev[i]` records the previous index in that chain, trying every `j < i` with `nums[i] % nums[j] == 0`. Reconstruct the best chain by walking `prev` back from the index with the maximum `dp` value.

## C# Solution

```csharp
public class Solution
{
    public IList<int> LargestDivisibleSubset(int[] nums)
    {
        int n = nums.Length;
        if (n == 0) return new List<int>();

        Array.Sort(nums);
        var dp = new int[n];
        var prev = new int[n];
        Array.Fill(dp, 1);
        Array.Fill(prev, -1);

        int bestIndex = 0;
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < i; j++)
            {
                if (nums[i] % nums[j] == 0 && dp[j] + 1 > dp[i])
                {
                    dp[i] = dp[j] + 1;
                    prev[i] = j;
                }
            }

            if (dp[i] > dp[bestIndex])
                bestIndex = i;
        }

        var result = new List<int>();
        for (int i = bestIndex; i != -1; i = prev[i])
            result.Add(nums[i]);

        result.Reverse();
        return result;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n)` for the DP and predecessor arrays.
