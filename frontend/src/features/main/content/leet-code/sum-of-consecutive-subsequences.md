# 3299. Sum of Consecutive Subsequences

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Hash Table
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given an integer array `nums`, a **consecutive subsequence** is a subsequence (elements keep their original relative order but need not be contiguous) of length at least 2 in which each element is exactly one greater than the previous element. Return the sum, over every such subsequence, of the sum of its elements, modulo `10^9 + 7`.

### Example

Input: `nums = [1,2,3]`

Output: `14`

Explanation: The valid subsequences are `[1,2]` (sum 3), `[2,3]` (sum 5), and `[1,2,3]` (sum 6). Total: `3 + 5 + 6 = 14`.

## Approach
Process the array left to right while maintaining, for every value `v` seen so far, two running totals: `cnt[v]` — the number of chains (of length ≥ 1) ending with value `v` — and `sum[v]` — the sum of the elements of those chains. When the current element `v` is processed, any chain ending at `v - 1` can be extended by `v` to form a new, valid (length ≥ 2) consecutive subsequence; add `sum[v-1] + cnt[v-1] * v` to the answer. Then update the running state for value `v` to include both these extended chains and a brand-new length-1 chain `[v]` (so future values can extend from it), using a hash map keyed by value since values can be large or sparse.

## C# Solution

```csharp
public class Solution 
{
    private const int MOD = 1_000_000_007;

    public int SumOfConsecutiveSubsequences(int[] nums) 
    {
        Dictionary<int, long> cnt = new Dictionary<int, long>();
        Dictionary<int, long> sum = new Dictionary<int, long>();
        long answer = 0;

        foreach (int v in nums) 
        {
            long prevCnt = cnt.GetValueOrDefault(v - 1);
            long prevSum = sum.GetValueOrDefault(v - 1);

            long extendedSum = (prevSum + prevCnt * v) % MOD;
            answer = (answer + extendedSum) % MOD;

            long newCnt = (cnt.GetValueOrDefault(v) + prevCnt + 1) % MOD;
            long newSum = (sum.GetValueOrDefault(v) + prevSum + prevCnt * v % MOD + v) % MOD;

            cnt[v] = newCnt;
            sum[v] = newSum;
        }

        return (int)(answer % MOD);
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
