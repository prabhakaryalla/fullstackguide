# 2626. Array Reduce Transformation

**Difficulty:** Easy
**Category:** Array

## Problem
Implement a `reduce(nums, fn, init)` utility that applies a combining function `fn(accumulator, currentValue, currentIndex)` cumulatively across the elements of `nums`, starting from the initial accumulator value `init`, and returns the final accumulated result.

## Approach
Iterate through the array once, threading the accumulator through the callback along with the current element and its index, exactly mirroring the standard reduce/fold operation.

## C# Solution

```csharp
public class Solution
{
    public int Reduce(int[] nums, Func<int, int, int, int> fn, int init)
    {
        int accumulator = init;

        for (int i = 0; i < nums.Length; i++)
        {
            accumulator = fn(accumulator, nums[i], i);
        }

        return accumulator;
    }
}
```

## Complexity

- **Time:** O(n).
- **Space:** O(1) beyond the input and output.
