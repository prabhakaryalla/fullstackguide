# 1673. Find the Most Competitive Subsequence

**Difficulty:** Medium
**Category:** Array, Stack, Greedy, Monotonic Stack

## Problem

Given `nums` and `k`, return the subsequence of length `k` that is the most "competitive" — lexicographically smallest among all length-`k` subsequences.

### Example

```
Input: nums = [3,5,2,6], k = 2
Output: [2,6]
```

## Approach

Use a monotonic stack: for each number, pop larger elements off the top of the stack as long as doing so still leaves enough remaining numbers (including the current one) to reach length `k`. Push the current number only if the stack has fewer than `k` elements. The stack, read bottom to top, is the answer.

## C# Solution

```csharp
public class Solution
{
    public int[] MostCompetitive(int[] nums, int k)
    {
        Stack<int> stack = new Stack<int>();
        int n = nums.Length;

        for (int i = 0; i < n; i++)
        {
            while (stack.Count > 0 && stack.Peek() > nums[i] && stack.Count + (n - i) > k)
            {
                stack.Pop();
            }

            if (stack.Count < k)
            {
                stack.Push(nums[i]);
            }
        }

        int[] result = stack.ToArray();
        Array.Reverse(result);
        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(k)` for the stack.
