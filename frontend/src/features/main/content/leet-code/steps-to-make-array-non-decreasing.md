# 2289. Steps to Make Array Non-decreasing

**Difficulty:** Hard
**Category:** Array, Stack, Linked List, Monotonic Stack

## Problem

You are given a 0-indexed integer array `nums`. In one step, remove all elements `nums[i]` where `nums[i - 1] > nums[i]` for all `0 < i < nums.length`.

Return the number of steps performed until `nums` becomes a non-decreasing array.

### Example

```
Input: nums = [5,3,4,4,7,3,6,11,8,5,11]
Output: 3
Explanation:
Step 1: [5,3,4,4,7,3,6,11,8,5,11] → [5,4,4,7,6,11,11]
Step 2: [5,4,4,7,6,11,11] → [5,4,7,11,11]
Step 3: [5,4,7,11,11] → [5,7,11,11]
```

## Approach

Use a monotonic stack to track elements and the number of steps required to remove them. For each element, check if it would be removed by elements in the stack. Track the maximum steps needed for elements that would be removed by the current element. The answer is the maximum steps across all elements.

## C# Solution

```csharp
public class Solution
{
    public int TotalSteps(int[] nums)
    {
        int n = nums.Length;
        var stack = new Stack<int>();
        int[] steps = new int[n];
        int maxSteps = 0;
        
        for (int i = n - 1; i >= 0; i--)
        {
            int currentSteps = 0;
            
            while (stack.Count > 0 && nums[i] > nums[stack.Peek()])
            {
                currentSteps = Math.Max(currentSteps + 1, steps[stack.Pop()]);
            }
            
            steps[i] = currentSteps;
            maxSteps = Math.Max(maxSteps, currentSteps);
            stack.Push(i);
        }
        
        return maxSteps;
    }
}
```

## Complexity

- **Time:** O(n) as each element is pushed and popped at most once
- **Space:** O(n) for the stack and steps array
