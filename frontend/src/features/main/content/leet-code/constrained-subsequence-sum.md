# 1425. Constrained Subsequence Sum

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Queue, Sliding Window, Heap (Priority Queue), Monotonic Queue

## Problem

Given an integer array `nums` and an integer `k`, return the maximum sum of a non-empty subsequence such that for every two consecutive chosen indices `i < j`, `j - i <= k`.

### Example

```
Input: nums = [10,2,-10,5,20], k = 2
Output: 37
```

## Approach

Let `dp[i]` be the best subsequence sum ending exactly at index `i`. Then `dp[i] = nums[i] + max(0, max(dp[i-k..i-1]))` — either start fresh at `i`, or extend from the best (non-negative) `dp` value within the previous `k` positions. Maintain a monotonically decreasing deque of indices over the `dp` array to answer each sliding-window maximum query in amortized `O(1)`.

## C# Solution

```csharp
public class Solution
{
    public int ConstrainedSubsetSum(int[] nums, int k)
    {
        int n = nums.Length;
        int[] dp = new int[n];
        var deque = new LinkedList<int>();
        int result = int.MinValue;

        for (int i = 0; i < n; i++)
        {
            while (deque.Count > 0 && deque.First.Value < i - k)
                deque.RemoveFirst();

            int best = deque.Count > 0 ? Math.Max(dp[deque.First.Value], 0) : 0;
            dp[i] = nums[i] + best;
            result = Math.Max(result, dp[i]);

            while (deque.Count > 0 && dp[deque.Last.Value] <= dp[i])
                deque.RemoveLast();

            deque.AddLast(i);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` — each index enters and leaves the deque at most once.
- **Space:** `O(n)` for the `dp` array and deque.
