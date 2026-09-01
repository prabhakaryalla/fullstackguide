# 907. Sum of Subarray Minimums

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Stack, Monotonic Stack

## Problem

Given an array of integers `arr`, return the sum of `min(b)` over every contiguous subarray `b` of `arr`, modulo `10^9 + 7`.

### Example

```
Input: arr = [3,1,2,4]
Output: 17
```

## Approach

For each index `i`, count how many subarrays have `arr[i]` as their minimum by finding the distance to the previous strictly-smaller element (`left[i]`) and the distance to the next smaller-or-equal element (`right[i]`) using monotonic stacks. Then `arr[i]` contributes `arr[i] * left[i] * right[i]` to the total. Using a non-strict comparison on exactly one side avoids double-counting equal values.

## C# Solution

```csharp
public class Solution
{
    public int SumSubarrayMins(int[] arr)
    {
        const int MOD = 1_000_000_007;
        int n = arr.Length;
        var left = new int[n];
        var right = new int[n];
        var stack = new Stack<int>();

        for (int i = 0; i < n; i++)
        {
            while (stack.Count > 0 && arr[stack.Peek()] > arr[i]) stack.Pop();
            left[i] = stack.Count == 0 ? i + 1 : i - stack.Peek();
            stack.Push(i);
        }

        stack.Clear();

        for (int i = n - 1; i >= 0; i--)
        {
            while (stack.Count > 0 && arr[stack.Peek()] >= arr[i]) stack.Pop();
            right[i] = stack.Count == 0 ? n - i : stack.Peek() - i;
            stack.Push(i);
        }

        long sum = 0;
        for (int i = 0; i < n; i++)
        {
            sum = (sum + (long)arr[i] * left[i] * right[i]) % MOD;
        }

        return (int)sum;
    }
}
```

## Complexity

- **Time:** `O(n)` — each index pushed/popped from each stack once.
- **Space:** `O(n)`.
