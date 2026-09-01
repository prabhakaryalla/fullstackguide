# 3430. Maximum and Minimum Sums of At Most Size K Subarrays

**Difficulty:** Medium
**Category:** Array, Sliding Window, Monotonic Deque

## Problem
Given an integer array `nums` and an integer `k`, consider every contiguous subarray of `nums` whose length is at most `k`. Return the sum of the maximum element of every such subarray plus the sum of the minimum element of every such subarray.

## Approach
For each starting index `l`, extend the window one element at a time up to length `k` (or until the array ends), maintaining two monotonic deques of indices:

- A **max-deque** kept strictly decreasing in value from front to back, so its front always holds the index of the current window's maximum.
- A **min-deque** kept strictly increasing in value from front to back, so its front always holds the index of the current window's minimum.

As the window grows by one element on the right, pop any deque entries that are dominated by the new element (values `<=` new value from the back of the max-deque, or `>=` new value from the back of the min-deque) before appending it, then read the current max/min from the front of each deque and accumulate it into the running totals. Restarting the deques for every new starting index keeps each window's bounds correct and the logic simple to verify.

## C# Solution

```csharp
public class Solution 
{
    public long MinAndMaxSums(int[] nums, int k) 
    {
        int n = nums.Length;
        long maxSum = 0, minSum = 0;

        for (int l = 0; l < n; l++) 
        {
            var maxDeque = new LinkedList<int>();
            var minDeque = new LinkedList<int>();
            int limit = Math.Min(n - 1, l + k - 1);

            for (int r = l; r <= limit; r++) 
            {
                while (maxDeque.Count > 0 && nums[maxDeque.Last!.Value] <= nums[r]) maxDeque.RemoveLast();
                maxDeque.AddLast(r);

                while (minDeque.Count > 0 && nums[minDeque.Last!.Value] >= nums[r]) minDeque.RemoveLast();
                minDeque.AddLast(r);

                maxSum += nums[maxDeque.First!.Value];
                minSum += nums[minDeque.First!.Value];
            }
        }

        return maxSum + minSum;
    }
}
```

## Complexity

- **Time:** O(n * k), since each of the `n` starting positions expands a window of up to `k` elements with O(1) amortized deque work per step.
- **Space:** O(k) for the deques at any point in time.
