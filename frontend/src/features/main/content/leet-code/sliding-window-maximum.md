# 239. Sliding Window Maximum

**Difficulty:** Hard
**Category:** Array, Queue, Sliding Window, Heap (Priority Queue), Monotonic Queue

## Problem

Given an array `nums` and a sliding window of size `k` moving from the very left to the very right of the array, return the maximum value in the window for each position it slides to.

### Example

```
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
```

### Constraints

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `1 <= k <= nums.length`

## Approach

Maintain a deque of indices whose values are in decreasing order. For each new index, pop indices from the back whose values are less than or equal to the current value (they can never be the maximum again), then push the current index. Pop from the front any index that has fallen out of the window. The front of the deque is always the maximum for the current window.

## C# Solution

```csharp
public class Solution
{
    public int[] MaxSlidingWindow(int[] nums, int k)
    {
        var result = new List<int>();
        var deque = new LinkedList<int>(); // stores indices, values decreasing

        for (int i = 0; i < nums.Length; i++)
        {
            while (deque.Count > 0 && nums[deque.Last.Value] <= nums[i])
                deque.RemoveLast();

            deque.AddLast(i);

            if (deque.First.Value <= i - k)
                deque.RemoveFirst();

            if (i >= k - 1)
                result.Add(nums[deque.First.Value]);
        }

        return result.ToArray();
    }
}
```

## Complexity

- **Time:** `O(n)` — each index is pushed and popped from the deque at most once.
- **Space:** `O(k)` — the deque holds at most `k` indices.
