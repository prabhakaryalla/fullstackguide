# 1063. Number of Valid Subarrays

**Difficulty:** Hard
**Category:** Array, Stack, Monotonic Stack

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an integer array `nums`, return the number of contiguous subarrays where the leftmost element is the minimum element of that subarray.

### Example

```
Input: nums = [1,4,2,5,3]
Output: 11
```

## Approach

For each index `i`, count how many valid subarrays start at `i` — that's exactly the distance to the next index `j > i` where `nums[j] < nums[i]` (or the end of the array if no such index exists), since `nums[i]` remains the minimum of `[i, k]` for every `k` from `i` up to `j - 1`. Compute this efficiently with a monotonic increasing stack of indices: whenever a smaller value is found, pop the stack and credit the popped index with `currentIndex - poppedIndex` valid subarrays. Any indices left on the stack at the end extend all the way to the array's end.

## C# Solution

```csharp
public class Solution
{
    public int ValidSubarrays(int[] nums)
    {
        int n = nums.Length;
        var stack = new Stack<int>();
        int count = 0;

        for (int i = 0; i < n; i++)
        {
            while (stack.Count > 0 && nums[stack.Peek()] > nums[i])
            {
                count += i - stack.Pop();
            }
            stack.Push(i);
        }

        while (stack.Count > 0)
        {
            count += n - stack.Pop();
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n)` — each index is pushed and popped at most once.
- **Space:** `O(n)` for the stack.
