# 862. Shortest Subarray with Sum at Least K

**Difficulty:** Hard
**Category:** Array, Breadth-First Search, Sliding Window, Heap, Prefix Sum, Monotonic Queue

## Problem

Given an integer array `nums` and an integer `k`, return the length of the shortest, non-empty, contiguous subarray whose sum is at least `k`, or `-1` if no such subarray exists.

### Example

```
Input: nums = [2,-1,2], k = 3
Output: 3
```

## Approach

Compute prefix sums, so that any subarray's sum is a difference of two prefix values. Maintain a monotonically increasing deque of prefix-sum indices. For each new prefix index `i`, while the earliest index in the deque produces a subarray sum `>= k`, that's a candidate shortest length — record it and pop that index (since any later `i` would only produce an equal-or-longer subarray using it). Then, before adding `i` to the deque, remove any trailing indices whose prefix sum is `>=` the current one (they can never produce a shorter valid subarray than starting from `i`, since `i` has an equal-or-smaller prefix value and a later position).

## C# Solution

```csharp
public class Solution
{
    public int ShortestSubarray(int[] nums, int k)
    {
        int n = nums.Length;
        var prefix = new long[n + 1];
        for (int i = 0; i < n; i++)
            prefix[i + 1] = prefix[i] + nums[i];

        var deque = new LinkedList<int>();
        int best = int.MaxValue;

        for (int i = 0; i <= n; i++)
        {
            while (deque.Count > 0 && prefix[i] - prefix[deque.First.Value] >= k)
            {
                best = Math.Min(best, i - deque.First.Value);
                deque.RemoveFirst();
            }

            while (deque.Count > 0 && prefix[deque.Last.Value] >= prefix[i])
            {
                deque.RemoveLast();
            }

            deque.AddLast(i);
        }

        return best == int.MaxValue ? -1 : best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the prefix sums and deque.
