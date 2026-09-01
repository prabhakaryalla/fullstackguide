# 3524. Find X Value of Array I

**Difficulty:** Medium
**Category:** Array, Math, Dynamic Programming

## Problem
You are given an integer array `nums` and an integer `k`. For every subarray of `nums`, compute the product of its elements modulo `k`. Return an array `answer` of length `k`, where `answer[x]` is the total number of subarrays whose product modulo `k` equals `x`.

### Example
Input: `nums = [4,2,1]`, `k = 3` → Subarrays and their products mod 3: `[4]→1`, `[4,2]→8%3=2`, `[4,2,1]→8%3=2`, `[2]→2`, `[2,1]→2`, `[1]→1`. Output: `answer = [0,2,4]` (0 subarrays give remainder 0, 2 give remainder 1, 4 give remainder 2).

## Approach
Use a rolling dynamic-programming array `dp[r]` = number of subarrays **ending at the current position** whose product modulo `k` equals `r`.
- For each new element `num` (with `numMod = num % k`), a new subarray consisting of just `num` contributes to `newDp[numMod]`.
- Every previously tracked subarray ending at the prior position, with remainder `i`, extends by one element to a new remainder `(i * numMod) % k`, contributing `dp[i]` to `newDp[(i * numMod) % k]`.
- Add `newDp` into the running `answer` totals, then move `dp = newDp` and continue to the next element.

## C# Solution

```csharp
public class Solution {
    public long[] ResultArray(int[] nums, int k) {
        long[] ans = new long[k];
        long[] dp = new long[k];

        foreach (int num in nums) {
            long[] newDp = new long[k];
            int numMod = num % k;
            newDp[numMod] += 1; // start a new subarray with only `num`

            for (int i = 0; i < k; i++) {
                if (dp[i] == 0) continue;
                int newMod = (int)((long)i * numMod % k);
                newDp[newMod] += dp[i];
            }

            for (int i = 0; i < k; i++) ans[i] += newDp[i];
            dp = newDp;
        }

        return ans;
    }
}
```

## Complexity

- **Time:** O(n * k) since each element updates all `k` remainder buckets
- **Space:** O(k) for the rolling DP array and the output
