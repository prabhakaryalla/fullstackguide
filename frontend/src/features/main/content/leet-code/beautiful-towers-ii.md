# 2866. Beautiful Towers II

**Difficulty:** Medium
**Category:** Array, Stack, Monotonic Stack, Dynamic Programming

## Problem

You are given a 0-indexed array `maxHeights` of `n` integers representing the maximum possible height of each tower. You can set the height of the `i`th tower to any value in the range `[0, maxHeights[i]]`.

A configuration is considered beautiful if it forms a mountain array (non-decreasing then non-increasing).

Return the maximum possible sum of heights in a beautiful configuration. This is the harder version with larger constraints than Beautiful Towers I.

### Example

```
Input: maxHeights = [5,3,4,1,1]
Output: 13
Explanation:
Set heights to [5,3,3,1,1] with peak at index 0.
Sum = 13
```

## Approach

Similar to Beautiful Towers I but optimized with monotonic stacks to handle larger constraints efficiently. For each potential peak position:
- Use a monotonic stack to compute the maximum sum of non-decreasing sequence ending at each position
- Use another monotonic stack for non-increasing sequence starting from each position
- Combine both to find the maximum total sum

## C# Solution

```csharp
public class Solution
{
    public long MaximumSumOfHeights(int[] maxHeights)
    {
        int n = maxHeights.Length;
        long[] left = new long[n];
        long[] right = new long[n];
        var stack = new Stack<int>();
        
        for (int i = 0; i < n; i++)
        {
            while (stack.Count > 0 && maxHeights[stack.Peek()] > maxHeights[i])
                stack.Pop();
            
            if (stack.Count == 0)
            {
                left[i] = (long)(i + 1) * maxHeights[i];
            }
            else
            {
                int j = stack.Peek();
                left[i] = left[j] + (long)(i - j) * maxHeights[i];
            }
            stack.Push(i);
        }
        
        stack.Clear();
        
        for (int i = n - 1; i >= 0; i--)
        {
            while (stack.Count > 0 && maxHeights[stack.Peek()] > maxHeights[i])
                stack.Pop();
            
            if (stack.Count == 0)
            {
                right[i] = (long)(n - i) * maxHeights[i];
            }
            else
            {
                int j = stack.Peek();
                right[i] = right[j] + (long)(j - i) * maxHeights[i];
            }
            stack.Push(i);
        }
        
        long maxSum = 0;
        for (int i = 0; i < n; i++)
        {
            maxSum = Math.Max(maxSum, left[i] + right[i] - maxHeights[i]);
        }
        
        return maxSum;
    }
}
```

## Complexity

- **Time:** `O(n)` — each element pushed/popped from stack at most once.
- **Space:** `O(n)` for arrays and stack.
