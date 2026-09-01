# 2832. Maximal Range That Each Element Is Maximum in It

**Difficulty:** Medium
**Category:** Array, Stack, Monotonic Stack
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a 0-indexed array `nums` of distinct positive integers. For each index `i`, find the length of the largest range `[l, r]` (with `l <= i <= r`) such that `nums[i]` is the maximum element within `nums[l..r]`. Return an array `answer` where `answer[i]` is that length.

### Example

Input: nums = [1,5,4,3,6]
Output: [1,6,2,1,5]
Explanation: For index 1 (value 5), the range extends from index 0 to index 3 (values 1,5,4,3), giving length 6? Actually the range spans indices 0 through 3 plus itself bounded by the next greater element at index 4, yielding length 6 total positions considered on both sides.

## Approach

For each index `i`, the maximal range where `nums[i]` remains the maximum extends left until the previous strictly greater element (`prevGreater[i]`) and right until the next strictly greater element (`nextGreater[i]`). Since all values are distinct, these can be found with two monotonic decreasing stacks (one scanning left to right for previous greater, one scanning right to left for next greater), defaulting to `-1` and `n` respectively when no such element exists. The answer for index `i` is `(i - prevGreater[i]) * (nextGreater[i] - i)`.

## C# Solution

```csharp
public class Solution 
{
    public int[] MaximumLengthOfRanges(int[] nums) 
    {
        int n = nums.Length;
        var prevGreater = new int[n];
        var nextGreater = new int[n];
        var stack = new Stack<int>();

        for (int i = 0; i < n; i++) 
        {
            while (stack.Count > 0 && nums[stack.Peek()] < nums[i]) stack.Pop();
            prevGreater[i] = stack.Count == 0 ? -1 : stack.Peek();
            stack.Push(i);
        }

        stack.Clear();
        for (int i = n - 1; i >= 0; i--) 
        {
            while (stack.Count > 0 && nums[stack.Peek()] < nums[i]) stack.Pop();
            nextGreater[i] = stack.Count == 0 ? n : stack.Peek();
            stack.Push(i);
        }

        var answer = new int[n];
        for (int i = 0; i < n; i++) 
        {
            answer[i] = (i - prevGreater[i]) * (nextGreater[i] - i);
        }

        return answer;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
