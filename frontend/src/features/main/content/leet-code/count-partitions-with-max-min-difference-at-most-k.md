# 3578. Count Partitions With Max-Min Difference at Most K

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Queue, Sliding Window, Prefix Sum, Monotonic Queue

## Problem
You are given an integer array `nums` and an integer `k`. Partition `nums` into one or more non-empty contiguous segments such that in each segment, the difference between its maximum and minimum elements is at most `k`.

Return the total number of ways to partition `nums` under this condition, modulo `10^9 + 7`.

### Example

```
Input: nums = [9,4,1,3,7], k = 4
Output: 6
```

```
Input: nums = [3,3,4], k = 0
Output: 2
```

**Constraints:**
- `2 <= nums.length <= 5 * 10^4`
- `0 <= k <= 10^9`

## Approach
Let `dp[i]` be the number of valid ways to partition the first `i` elements (`dp[0] = 1`, representing the empty prefix). Then `dp[i] = sum(dp[j])` for all `j` in `[left(i), i-1]`, where `left(i)` is the smallest starting index such that the subarray `nums[left(i)..i-1]` has max-min `<= k`. Since restricting a valid range to a smaller range can only keep or shrink its max-min difference, `left(i)` is monotonically non-decreasing as `i` grows, enabling a two-pointer sliding window maintained with a monotonic max-deque and min-deque.

Maintain a running prefix sum of `dp` so that `dp[i]` can be computed in O(1) as the difference of two prefix sums over the current valid window, giving an overall O(n) algorithm.

## C# Solution

```csharp
public class Solution 
{
    private const int MOD = 1_000_000_007;

    public int CountPartitions(int[] nums, int k) 
    {
        int n = nums.Length;
        long[] dp = new long[n + 1];
        long[] prefixSum = new long[n + 2];
        dp[0] = 1;
        prefixSum[1] = dp[0];

        LinkedList<int> maxDeque = new LinkedList<int>();
        LinkedList<int> minDeque = new LinkedList<int>();
        int left = 0;

        for (int i = 1; i <= n; i++)
        {
            int cur = i - 1;

            while (maxDeque.Count > 0 && nums[maxDeque.Last.Value] <= nums[cur]) maxDeque.RemoveLast();
            maxDeque.AddLast(cur);
            while (minDeque.Count > 0 && nums[minDeque.Last.Value] >= nums[cur]) minDeque.RemoveLast();
            minDeque.AddLast(cur);

            while (nums[maxDeque.First.Value] - nums[minDeque.First.Value] > k)
            {
                left++;
                if (maxDeque.First.Value < left) maxDeque.RemoveFirst();
                if (minDeque.First.Value < left) minDeque.RemoveFirst();
            }

            dp[i] = ((prefixSum[cur + 1] - prefixSum[left]) % MOD + MOD) % MOD;
            prefixSum[i + 1] = (prefixSum[i] + dp[i]) % MOD;
        }

        return (int)dp[n];
    }
}
```

## Complexity

- **Time:** O(n), amortized, for the two-pointer sliding window with monotonic deques.
- **Space:** O(n), for the DP and prefix sum arrays.
