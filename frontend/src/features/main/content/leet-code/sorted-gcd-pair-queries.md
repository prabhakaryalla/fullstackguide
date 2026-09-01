# 3312. Sorted GCD Pair Queries

**Difficulty:** Hard
**Category:** Array, Hash Table, Math, Binary Search, Combinatorics, Counting, Number Theory

## Problem

You are given an integer array `nums` of length `n` and an integer array `queries`.

Let `gcdPairs` be the array obtained by computing `gcd(nums[i], nums[j])` for all pairs `0 <= i < j < n`, then sorting the results in ascending order.

For each `queries[i]`, find `gcdPairs[queries[i]]`.

Return an array `answer` where `answer[i] = gcdPairs[queries[i]]`.

### Example

Input: `nums = [2,3,4], queries = [0,2,2]`

Output: `[1,2,2]`

Explanation: `gcdPairs = [gcd(2,3), gcd(2,4), gcd(3,4)] = [1,2,1]`. Sorted: `[1,1,2]`. So `answer = [gcdPairs[0], gcdPairs[2], gcdPairs[2]] = [1,2,2]`.

## Approach

Directly enumerating all pairs is too slow. Instead, count how many pairs have each possible GCD value using inclusion–exclusion:

1. Let `maxVal` be the maximum value in `nums`. Build `freq[v]` = number of elements equal to `v`.
2. For every `d` from `1` to `maxVal`, compute `cntMultiple[d]` = number of elements divisible by `d` (by summing `freq` over multiples of `d`).
3. The number of pairs where **both** elements are divisible by `d` is `C(cntMultiple[d], 2)`. This counts pairs whose GCD is `d` or any multiple of `d`.
4. Process `d` from `maxVal` down to `1`: `exact[d] = C(cntMultiple[d], 2) - sum(exact[m])` for all multiples `m` of `d` with `m > d`. This isolates pairs whose GCD is **exactly** `d`.
5. Build a prefix sum of `exact` over increasing `d`. Since `gcdPairs` sorted ascending groups equal GCD values together, binary search the prefix sum to answer each query in O(log maxVal).

## C# Solution

```csharp
public class Solution 
{
    public int[] GcdValues(int[] nums, long[] queries) 
    {
        int maxVal = 0;
        foreach (int v in nums) maxVal = Math.Max(maxVal, v);

        long[] freq = new long[maxVal + 1];
        foreach (int v in nums) freq[v]++;

        long[] cntMultiple = new long[maxVal + 1];
        for (int d = 1; d <= maxVal; d++)
        {
            long s = 0;
            for (int m = d; m <= maxVal; m += d) s += freq[m];
            cntMultiple[d] = s;
        }

        long[] exact = new long[maxVal + 1];
        for (int d = maxVal; d >= 1; d--)
        {
            long c = cntMultiple[d];
            long pairs = c * (c - 1) / 2;
            for (int m = 2 * d; m <= maxVal; m += d) pairs -= exact[m];
            exact[d] = pairs;
        }

        long[] prefix = new long[maxVal + 1];
        for (int d = 1; d <= maxVal; d++) prefix[d] = prefix[d - 1] + exact[d];

        int q = queries.Length;
        int[] ans = new int[q];
        for (int i = 0; i < q; i++)
        {
            long idx = queries[i] + 1;
            int lo = 1, hi = maxVal, res = maxVal;
            while (lo <= hi)
            {
                int mid = (lo + hi) / 2;
                if (prefix[mid] >= idx) { res = mid; hi = mid - 1; }
                else lo = mid + 1;
            }
            ans[i] = res;
        }
        return ans;
    }
}
```

## Complexity

- **Time:** O(maxVal log maxVal) for the sieve steps, plus O(q log maxVal) for answering queries.
- **Space:** O(maxVal).
