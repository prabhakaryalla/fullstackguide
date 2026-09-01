# 1950. Maximum of Minimum Values in All Subarrays

**Difficulty:** Medium
**Category:** Array, Stack, Monotonic Stack
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an integer array `nums` of size `n`, for every window length `k` from `1` to `n`, find the maximum possible minimum value among all contiguous subarrays of length `k`. Return an array `answer` of size `n` where `answer[k-1]` is that value for window length `k`.

### Example

```
Input: nums = [0,1,2,4]
Output: [4,2,1,0]
Explanation: For k=1, best window minimum is 4 (the window [4] itself); for k=4, the only window is the whole array, min=0.
```

### Constraints

- `1 <= n == nums.length <= 10^5`
- `0 <= nums[i] <= 10^9`

## Approach

For each element `nums[i]`, find the nearest smaller element to the left (`left[i]`) and to the right (`right[i]`) using a monotonic increasing stack — these define the maximal window in which `nums[i]` is the minimum, of length `len = right[i] - left[i] - 1`. Since `nums[i]` is the minimum over that entire window, it is a candidate answer for every window length from `1` up to `len`; update `best[len] = max(best[len], nums[i])`. After processing all elements, sweep `best` from the largest length down to `1`, taking a running maximum, since any window minimum valid for a larger length is also achievable (via a sub-window) for smaller lengths.

## C# Solution

```csharp
public class Solution
{
    public int[] FindMaximums(int[] nums)
    {
        int n = nums.Length;
        int[] left = new int[n];
        int[] right = new int[n];
        var stack = new Stack<int>();

        for (int i = 0; i < n; i++)
        {
            while (stack.Count > 0 && nums[stack.Peek()] >= nums[i]) stack.Pop();
            left[i] = stack.Count == 0 ? -1 : stack.Peek();
            stack.Push(i);
        }

        stack.Clear();
        for (int i = n - 1; i >= 0; i--)
        {
            while (stack.Count > 0 && nums[stack.Peek()] >= nums[i]) stack.Pop();
            right[i] = stack.Count == 0 ? n : stack.Peek();
            stack.Push(i);
        }

        int[] best = new int[n + 1];
        for (int i = 0; i < n; i++)
        {
            int len = right[i] - left[i] - 1;
            best[len] = Math.Max(best[len], nums[i]);
        }

        int[] answer = new int[n];
        for (int len = n - 1; len >= 1; len--)
        {
            best[len] = Math.Max(best[len], best[len + 1]);
            answer[len - 1] = best[len];
        }

        return answer;
    }
}
```

## Complexity

- **Time:** `O(n)` — each element is pushed and popped from the monotonic stacks at most once.
- **Space:** `O(n)` for the left/right/best arrays.
