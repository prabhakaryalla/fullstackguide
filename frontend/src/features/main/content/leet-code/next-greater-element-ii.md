# 503. Next Greater Element II

**Difficulty:** Medium
**Category:** Array, Stack, Monotonic Stack

## Problem

Given a circular integer array `nums`, return the next greater number for every element. The next greater number of a number `x` is the first greater number to its traversing-order right in the array, wrapping around the end of the array to search further if needed. If it doesn't exist, return `-1`.

### Example

```
Input: nums = [1,2,1]
Output: [2,-1,2]
```

### Constraints

- `1 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`

## Approach

Simulate the circular traversal by iterating indices from `0` to `2n - 1`, using `i % n` to wrap around, while maintaining a monotonic decreasing stack of indices whose next greater element hasn't been found yet. Whenever the current value exceeds the value at the stack's top index, that index's answer is found; only push actual indices during the first pass (`i < n`) since the second pass exists solely to resolve wrap-around matches.

## C# Solution

```csharp
public class Solution
{
    public int[] NextGreaterElements(int[] nums)
    {
        int n = nums.Length;
        var result = new int[n];
        Array.Fill(result, -1);

        var stack = new Stack<int>();

        for (int i = 0; i < 2 * n; i++)
        {
            int num = nums[i % n];

            while (stack.Count > 0 && nums[stack.Peek()] < num)
                result[stack.Pop()] = num;

            if (i < n)
                stack.Push(i);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` — each index is pushed and popped at most once.
- **Space:** `O(n)` for the stack and result.
