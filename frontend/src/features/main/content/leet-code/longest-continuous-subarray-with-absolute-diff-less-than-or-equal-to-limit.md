# 1438. Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit

**Difficulty:** Medium
**Category:** Array, Queue, Sliding Window, Monotonic Queue

## Problem

Given an array of integers `nums` and an integer `limit`, return the length of the longest contiguous subarray such that the absolute difference between any two elements in it is at most `limit`.

### Example

```
Input: nums = [8,2,4,7], limit = 4
Output: 2
```

## Approach

Use a sliding window with two monotonic deques: one tracking indices with decreasing values (to quickly get the window maximum) and one tracking indices with increasing values (to quickly get the window minimum). Expand the window by moving `right` forward, and whenever `max - min` exceeds `limit`, shrink from the `left`, removing indices from the deques as they fall outside the window. Track the best window length seen.

## C# Solution

```csharp
public class Solution
{
    public int LongestSubarray(int[] nums, int limit)
    {
        var maxDeque = new LinkedList<int>();
        var minDeque = new LinkedList<int>();
        int left = 0, result = 0;

        for (int right = 0; right < nums.Length; right++)
        {
            while (maxDeque.Count > 0 && nums[maxDeque.Last.Value] < nums[right])
                maxDeque.RemoveLast();
            maxDeque.AddLast(right);

            while (minDeque.Count > 0 && nums[minDeque.Last.Value] > nums[right])
                minDeque.RemoveLast();
            minDeque.AddLast(right);

            while (nums[maxDeque.First.Value] - nums[minDeque.First.Value] > limit)
            {
                if (maxDeque.First.Value == left) maxDeque.RemoveFirst();
                if (minDeque.First.Value == left) minDeque.RemoveFirst();
                left++;
            }

            result = Math.Max(result, right - left + 1);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` — each index enters and leaves the deques at most once.
- **Space:** `O(n)` for the deques.
