# 3351. Sum of Good Subsequences

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Hash Table

## Problem

A *good subsequence* is a subsequence where the absolute difference between any two consecutive elements is exactly 1. Return the sum of all elements across all possible good subsequences of `nums` (including single-element ones), modulo $10^9+7$.

### Example

Input: `nums = [1,2,1]`
Output: `14` — good subsequences are `[1],[2],[1],[1,2],[2,1],[1,2,1]`, summing to 4+3+3+4=14.

## Approach

Maintain maps `cnt[v]` and `sum[v]`: the number and total-value-sum of good subsequences ending in value `v`. For each new element `x`, `newCount = 1 + cnt[x-1] + cnt[x+1]` and `newSum = x*newCount + sum[x-1] + sum[x+1]`; accumulate `newSum` into the running answer and merge into `cnt[x]`/`sum[x]`.

## C# Solution

```csharp
public class Solution 
{
    private const int MOD = 1000000007;

    public int SumOfGoodSubsequences(int[] nums) 
    {
        var cnt = new Dictionary<int, long>();
        var sum = new Dictionary<int, long>();
        long total = 0;

        foreach (int x in nums) 
        {
            long c1 = cnt.TryGetValue(x - 1, out var cv1) ? cv1 : 0;
            long c2 = cnt.TryGetValue(x + 1, out var cv2) ? cv2 : 0;
            long s1 = sum.TryGetValue(x - 1, out var sv1) ? sv1 : 0;
            long s2 = sum.TryGetValue(x + 1, out var sv2) ? sv2 : 0;

            long newCount = (1 + c1 + c2) % MOD;
            long newSum = ((long)x % MOD * newCount % MOD + s1 + s2) % MOD;

            cnt[x] = ((cnt.TryGetValue(x, out var cv) ? cv : 0) + newCount) % MOD;
            sum[x] = ((sum.TryGetValue(x, out var sv) ? sv : 0) + newSum) % MOD;

            total = (total + newSum) % MOD;
        }
        return (int)total;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
