# 3523. Make Array Non-decreasing

**Difficulty:** Medium
**Category:** Array, Stack, Monotonic Stack

## Problem

You are given an integer array `nums`. In one operation you may select any contiguous subarray and replace it with a single element equal to the maximum value of that subarray. Return the minimum possible length of the array after performing any number of such operations so that the final array is non-decreasing.

### Example

```
Input: nums = [4,3,2,6]
Output: 2
Explanation: Merge the subarray [4,3,2] into its maximum value 4, giving [4,6], which has length 2 and is
non-decreasing. No single group split of {4},{3,2},{6} works because 4 > 3, so 4 must be merged together
with 3 and 2 into one group; grouping as {4,3,2} (max 4) and {6} (max 6) yields the minimum length of 2.
```

## Approach

Process the array from right to left while maintaining a stack of groups, each represented as `(maxValue, count)`, where `count` is the number of original elements merged into that group. For each new element `v` (moving right to left), repeatedly merge it with the group at the top of the stack while that group's max is **less than** `v` (otherwise the final sequence would not be non-decreasing, since a group to the left must have a max less than or equal to the group immediately to its right). After absorbing all such groups, push a new group `(v, mergedCount)` onto the stack. The final number of groups on the stack is the minimum possible length of the resulting non-decreasing array.

## C# Solution

```csharp
public class Solution 
{
    public int MakeArrayNonDecreasing(int[] nums) 
    {
        var stack = new Stack<(int max, int count)>();
        for (int i = nums.Length - 1; i >= 0; i--)
        {
            int curMax = nums[i];
            int curCount = 1;
            while (stack.Count > 0 && stack.Peek().max < curMax)
            {
                var top = stack.Pop();
                curCount += top.count;
            }
            stack.Push((curMax, curCount));
        }
        return stack.Count;
    }
}
```

## Complexity

- **Time:** O(n), where n is the length of `nums` (each element is pushed and popped at most once).
- **Space:** O(n) for the stack.
