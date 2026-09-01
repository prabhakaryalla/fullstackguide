# 2334. Subarray With Elements Greater Than Varying Threshold

**Difficulty:** Hard
**Category:** Array, Stack, Union Find, Monotonic Stack

## Problem

You are given an integer array `nums` and an integer `threshold`. Find any subarray of `nums` of length `k` such that every element in that subarray is greater than `threshold / k`.

Return the size of any such subarray. If there is no such subarray, return `-1`.

### Example

```
Input: nums = [1,3,4,3,1], threshold = 6
Output: 3
Explanation: The subarray [3,4,3] has length 3, and every element is greater than 6/3 = 2.
```

## Approach

For each possible subarray length k from 1 to n, check if there exists a contiguous subarray where all elements are greater than threshold/k. Use a sliding window for each k. Alternatively, use a more efficient approach with a monotonic stack to find the longest subarray where each element is greater than or equal to some value, then check all threshold conditions.

## C# Solution

```csharp
public class Solution
{
    public int ValidSubarraySize(int[] nums, int threshold)
    {
        int n = nums.Length;
        int[] left = new int[n];
        int[] right = new int[n];
        
        Stack<int> stack = new Stack<int>();
        
        for (int i = 0; i < n; i++)
        {
            while (stack.Count > 0 && nums[stack.Peek()] >= nums[i])
            {
                stack.Pop();
            }
            left[i] = stack.Count == 0 ? -1 : stack.Peek();
            stack.Push(i);
        }
        
        stack.Clear();
        
        for (int i = n - 1; i >= 0; i--)
        {
            while (stack.Count > 0 && nums[stack.Peek()] >= nums[i])
            {
                stack.Pop();
            }
            right[i] = stack.Count == 0 ? n : stack.Peek();
            stack.Push(i);
        }
        
        for (int i = 0; i < n; i++)
        {
            int k = right[i] - left[i] - 1;
            if (nums[i] > threshold / k)
            {
                return k;
            }
        }
        
        return -1;
    }
}
```

## Complexity

- **Time:** O(n) using monotonic stack approach
- **Space:** O(n) for the left and right arrays
