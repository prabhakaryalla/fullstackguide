# 446. Arithmetic Slices II - Subsequence

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

Given an integer array `nums`, return the number of arithmetic subsequences of `nums` with at least three elements (elements need not be contiguous, but must preserve relative order).

### Example

```
Input: nums = [2,4,6,8,10]
Output: 7
```

### Constraints

- `1 <= nums.length <= 1000`
- `-2^31 <= nums[i] <= 2^31 - 1`

## Approach

For each index `i`, maintain a dictionary mapping a common difference to the number of arithmetic subsequences (of length `>= 2`) ending at `i` with that difference. For every earlier index `j`, the difference `nums[i] - nums[j]` extends every length-`>=2` subsequence ending at `j` with that same difference into a length-`>=3` subsequence ending at `i` (contributing to the answer), and also creates a new length-2 subsequence `(j, i)` for future extensions.

## C# Solution

```csharp
public class Solution
{
    public int NumberOfArithmeticSlices(int[] nums)
    {
        int n = nums.Length;
        var dp = new Dictionary<long, int>[n];
        for (int i = 0; i < n; i++)
            dp[i] = new Dictionary<long, int>();

        int total = 0;

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < i; j++)
            {
                long diff = (long)nums[i] - nums[j];
                int countAtJ = dp[j].GetValueOrDefault(diff);

                total += countAtJ;
                dp[i][diff] = dp[i].GetValueOrDefault(diff) + countAtJ + 1;
            }
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n^2)` for the per-index difference maps.
