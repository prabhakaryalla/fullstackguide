# 1696. Jump Game VI

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Queue, Sliding Window, Heap (Priority Queue), Monotonic Queue

## Problem

Starting at index `0` of `nums`, you may jump forward up to `k` positions at a time, landing anywhere in `[i+1, i+k]`. Your score is the sum of the values at every index you land on (including index `0`). Return the maximum score achievable when reaching the last index.

### Example

```
Input: nums = [1,-1,-2,4,-7,3], k = 2
Output: 7
```

## Approach

Let `dp[i]` be the best score to reach index `i`, equal to `nums[i] + max(dp[i-k..i-1])`. Maintain a monotonic decreasing deque of indices (by `dp` value) representing the sliding window of the last `k` positions; the front of the deque always holds the index with the maximum `dp` value within range. Pop expired indices from the front, use the front to compute `dp[i]`, then pop smaller values from the back before pushing `i`.

## C# Solution

```csharp
public class Solution
{
    public int MaxResult(int[] nums, int k)
    {
        int n = nums.Length;
        int[] dp = new int[n];
        dp[0] = nums[0];
        LinkedList<int> deque = new LinkedList<int>();
        deque.AddLast(0);

        for (int i = 1; i < n; i++)
        {
            while (deque.Count > 0 && deque.First.Value < i - k)
            {
                deque.RemoveFirst();
            }

            dp[i] = dp[deque.First.Value] + nums[i];

            while (deque.Count > 0 && dp[deque.Last.Value] <= dp[i])
            {
                deque.RemoveLast();
            }

            deque.AddLast(i);
        }

        return dp[n - 1];
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)`.
