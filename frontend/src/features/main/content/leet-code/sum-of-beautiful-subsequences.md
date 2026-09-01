# 3671. Sum of Beautiful Subsequences

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Hash Table

## Problem
You are given an integer array `nums`. A non-empty subsequence is called **beautiful** if no two consecutively chosen elements (adjacent within the subsequence) have the same value.

Return the total number of beautiful subsequences of `nums`, modulo `10^9 + 7`.

## Approach
Let `dp[i]` be the number of beautiful subsequences that end exactly at index `i`. A beautiful subsequence ending at `i` is either the single element `nums[i]`, or any beautiful subsequence ending at some earlier index `j < i` with `nums[j] != nums[i]`, extended by `nums[i]`.

So `dp[i] = 1 + (sum of dp[j] for all j < i) - (sum of dp[j] for j < i where nums[j] == nums[i])`.

Maintain a running total of all `dp` values seen so far, and a hash map from value to the running sum of `dp` for indices with that value. This allows each `dp[i]` to be computed in O(1) amortized time.

The final answer is the sum of all `dp[i]`.

## C# Solution

```csharp
public class Solution
{
    public int SumBeautifulSubsequences(int[] nums)
    {
        const int MOD = 1_000_000_007;
        var sumByValue = new Dictionary<int, long>();
        long runningTotal = 0;
        long answer = 0;

        foreach (int num in nums)
        {
            sumByValue.TryGetValue(num, out long sameValueSum);
            long dpCurrent = (1 + runningTotal - sameValueSum % MOD + MOD) % MOD;

            answer = (answer + dpCurrent) % MOD;
            runningTotal = (runningTotal + dpCurrent) % MOD;
            sumByValue[num] = (sameValueSum + dpCurrent) % MOD;
        }

        return (int)answer;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
