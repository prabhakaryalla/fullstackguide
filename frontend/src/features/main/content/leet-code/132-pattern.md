# 456. 132 Pattern

**Difficulty:** Medium
**Category:** Array, Stack, Monotonic Stack, Binary Search

## Problem

Given an array of integers `nums`, return `true` if there exists a 132 pattern: three indices `i < j < k` such that `nums[i] < nums[k] < nums[j]`.

### Example

```
Input: nums = [3,1,4,2]
Output: true
Explanation: nums[1] = 1 < nums[3] = 2 < nums[2] = 4.
```

### Constraints

- `n == nums.length`
- `1 <= n <= 2 * 10^5`
- `-10^9 <= nums[i] <= 10^9`

## Approach

Scan from right to left while maintaining a monotonic decreasing stack of candidate "3" values, and track `thirdMax`, the largest value that has been popped so far (representing a valid "2" for some earlier "3"). Popping the stack while the current element is smaller than the stack's top identifies valid `nums[j] > nums[k]` pairs, updating `thirdMax` to the best such `nums[k]`. If the current element is ever less than `thirdMax`, it serves as a valid "1" completing the pattern.

## C# Solution

```csharp
public class Solution
{
    public bool Find132pattern(int[] nums)
    {
        var stack = new Stack<int>();
        int thirdMax = int.MinValue;

        for (int i = nums.Length - 1; i >= 0; i--)
        {
            if (nums[i] < thirdMax) return true;

            while (stack.Count > 0 && stack.Peek() < nums[i])
                thirdMax = stack.Pop();

            stack.Push(nums[i]);
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(n)` — each element is pushed and popped at most once.
- **Space:** `O(n)` for the stack.
