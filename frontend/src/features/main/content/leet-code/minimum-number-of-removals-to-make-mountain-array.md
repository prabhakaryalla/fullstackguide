# 1671. Minimum Number of Removals to Make Mountain Array

**Difficulty:** Hard
**Category:** Array, Binary Search, Greedy, Dynamic Programming

## Problem

An array is a "mountain" if it strictly increases then strictly decreases, with at least one element on each side of the peak. Given `nums`, return the minimum number of elements to remove so the remainder forms a mountain array.

### Example

```
Input: nums = [2,1,1,5,6,2,3,1]
Output: 3
```

## Approach

For each index `i`, compute the length of the longest strictly increasing subsequence ending at `i` (`lis[i]`) and the longest strictly decreasing subsequence starting at `i` (`lds[i]`), both via the classic `O(n^2)` LIS-style DP. Index `i` can serve as the mountain's peak only if both `lis[i] > 1` and `lds[i] > 1`; the best mountain length using peak `i` is `lis[i] + lds[i] - 1` (not double-counting `nums[i]`). The answer is `n` minus the best mountain length found.

## C# Solution

```csharp
public class Solution
{
    public int MinimumMountainRemovals(int[] nums)
    {
        int n = nums.Length;
        int[] lis = new int[n];
        int[] lds = new int[n];

        for (int i = 0; i < n; i++)
        {
            lis[i] = 1;

            for (int j = 0; j < i; j++)
            {
                if (nums[j] < nums[i])
                {
                    lis[i] = Math.Max(lis[i], lis[j] + 1);
                }
            }
        }

        for (int i = n - 1; i >= 0; i--)
        {
            lds[i] = 1;

            for (int j = n - 1; j > i; j--)
            {
                if (nums[j] < nums[i])
                {
                    lds[i] = Math.Max(lds[i], lds[j] + 1);
                }
            }
        }

        int best = 0;

        for (int i = 0; i < n; i++)
        {
            if (lis[i] > 1 && lds[i] > 1)
            {
                best = Math.Max(best, lis[i] + lds[i] - 1);
            }
        }

        return n - best;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n)`.
