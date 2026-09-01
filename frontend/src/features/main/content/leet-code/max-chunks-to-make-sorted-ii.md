# 768. Max Chunks To Make Sorted II

**Difficulty:** Hard
**Category:** Stack, Array, Greedy, Sorting, Monotonic Stack

## Problem

Given an integer array `arr` (which may contain duplicates, unlike the simpler version of this problem), split it into the maximum number of contiguous chunks such that sorting each chunk individually and concatenating them produces the fully sorted array. Return the maximum number of chunks possible.

### Example

```
Input: arr = [2,1,3,4,4]
Output: 4
```

## Approach

Use a monotonic stack storing the maximum value of each chunk formed so far. For each new number, if it is greater than or equal to the stack's top, it can start its own new chunk (push it). Otherwise, it must merge with previous chunks: pop and merge chunks whose maximum exceeds the current number (since the current number must belong to any chunk whose max is greater than it), keeping track of the largest max value absorbed, and push that combined max back as a single chunk. The final stack size is the number of valid chunks.

## C# Solution

```csharp
public class Solution
{
    public int MaxChunksToSorted(int[] arr)
    {
        var stack = new Stack<int>();

        foreach (var num in arr)
        {
            if (stack.Count == 0 || num >= stack.Peek())
            {
                stack.Push(num);
            }
            else
            {
                int max = stack.Pop();
                while (stack.Count > 0 && stack.Peek() > num)
                    stack.Pop();

                stack.Push(max);
            }
        }

        return stack.Count;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the stack.
