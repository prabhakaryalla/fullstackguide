# 739. Daily Temperatures

**Difficulty:** Medium
**Category:** Array, Stack, Monotonic Stack

## Problem

Given an array of integers `temperatures`, return an array `answer` where `answer[i]` is the number of days to wait after day `i` to get a warmer temperature, or `0` if no such day exists.

### Example

```
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
```

## Approach

Use a monotonic decreasing stack of indices whose warmer day hasn't been found yet. For each new day, while the current temperature exceeds the temperature at the index on top of the stack, pop that index and record the distance to the current day as its answer. Then push the current index onto the stack.

## C# Solution

```csharp
public class Solution
{
    public int[] DailyTemperatures(int[] temperatures)
    {
        int n = temperatures.Length;
        var result = new int[n];
        var stack = new Stack<int>();

        for (int i = 0; i < n; i++)
        {
            while (stack.Count > 0 && temperatures[stack.Peek()] < temperatures[i])
            {
                int prevIndex = stack.Pop();
                result[prevIndex] = i - prevIndex;
            }

            stack.Push(i);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` — each index is pushed and popped at most once.
- **Space:** `O(n)` for the stack.
