# 3686. Number of Stable Subsequences

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

You are given an integer array `nums`.

A subsequence is **stable** if it does not contain three consecutive elements (consecutive within the subsequence) that all have the same parity.

Return the number of non-empty stable subsequences, modulo `10^9 + 7`.

### Example

```
Input: nums = [1,3,5]
Output: 6
Explanation: All non-empty subsequences are stable except [1, 3, 5], which has three consecutive odd numbers.
```

### Constraints

- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`

## Approach

Track four running totals as we scan left to right: the number of stable subsequences built so far whose last chosen element is odd with a trailing run of exactly 1 or 2 same-parity elements, and the analogous two counts for even. When processing a new value `x`, subsequences that don't use `x` are simply carried forward unchanged. Subsequences that end at `x` are formed either by starting fresh with `x` alone, or by extending any subsequence whose last element has the opposite parity (run resets to 1), or by extending a same-parity subsequence that currently has a run of exactly 1 (run becomes 2 — extending a run of 2 would create an invalid run of 3, so those are excluded). Summing the four counters after the last element gives the answer.

## C# Solution

```csharp
public class Solution
{
    public int CountStableSubsequences(int[] nums)
    {
        const int MOD = 1_000_000_007;
        long oddStreak1 = 0, oddStreak2 = 0, evenStreak1 = 0, evenStreak2 = 0;

        foreach (int x in nums)
        {
            if ((x & 1) == 1)
            {
                long newOdd1 = (oddStreak1 + evenStreak1 + evenStreak2 + 1) % MOD;
                long newOdd2 = (oddStreak2 + oddStreak1) % MOD;
                oddStreak1 = newOdd1;
                oddStreak2 = newOdd2;
            }
            else
            {
                long newEven1 = (evenStreak1 + oddStreak1 + oddStreak2 + 1) % MOD;
                long newEven2 = (evenStreak2 + evenStreak1) % MOD;
                evenStreak1 = newEven1;
                evenStreak2 = newEven2;
            }
        }

        long total = (oddStreak1 + oddStreak2 + evenStreak1 + evenStreak2) % MOD;
        return (int)total;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
