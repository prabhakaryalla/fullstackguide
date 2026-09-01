# 2104. Sum of Subarray Ranges

**Difficulty:** Medium
**Category:** Array, Stack, Monotonic Stack

## Problem

Given an integer array `nums`, return the sum of all subarray ranges. The range of a subarray is the difference between the maximum and minimum elements in that subarray.

### Example

```
Input: nums = [1,2,3]
Output: 4
Explanation: The 6 subarrays are:
[1]: range = 0, [2]: range = 0, [3]: range = 0
[1,2]: range = 1, [2,3]: range = 1, [1,2,3]: range = 2
Total: 0 + 0 + 0 + 1 + 1 + 2 = 4
```

## Approach

The sum of ranges equals (sum of all subarray maximums) - (sum of all subarray minimums). Use monotonic stacks to efficiently compute the contribution of each element as a maximum and as a minimum across all subarrays where it appears as such.

## C# Solution

```csharp
public class Solution
{
    public long SubArrayRanges(int[] nums)
    {
        int n = nums.Length;
        long sumMax = 0, sumMin = 0;
        
        var stack = new Stack<int>();
        for (int i = 0; i <= n; i++)
        {
            while (stack.Count > 0 && (i == n || nums[stack.Peek()] < nums[i]))
            {
                int j = stack.Pop();
                int left = stack.Count == 0 ? -1 : stack.Peek();
                sumMax += (long)nums[j] * (i - j) * (j - left);
            }
            stack.Push(i);
        }
        
        stack.Clear();
        for (int i = 0; i <= n; i++)
        {
            while (stack.Count > 0 && (i == n || nums[stack.Peek()] > nums[i]))
            {
                int j = stack.Pop();
                int left = stack.Count == 0 ? -1 : stack.Peek();
                sumMin += (long)nums[j] * (i - j) * (j - left);
            }
            stack.Push(i);
        }
        
        return sumMax - sumMin;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
