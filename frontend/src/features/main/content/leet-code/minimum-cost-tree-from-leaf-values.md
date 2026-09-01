# 1130. Minimum Cost Tree From Leaf Values

**Difficulty:** Medium
**Category:** Stack, Array, Dynamic Programming, Monotonic Stack

## Problem

Given an array of positive integers `arr`, build a binary tree where `arr` is exactly the in-order traversal of its leaf values. Every non-leaf node's value equals the product of the largest leaf value in its left subtree and the largest leaf value in its right subtree. Return the smallest possible sum of the values of all non-leaf nodes.

### Example

```
Input: arr = [6,2,4]
Output: 32
```

## Approach

Use a monotonic decreasing stack of leaf values (with a sentinel `int.MaxValue` at the bottom). For each incoming value, while it's greater than or equal to the stack's top, pop that top as the "smaller side" of a merge and add `popped * min(newStackTop, value)` to the total cost — always merging the smallest available leaf with the smaller of its two neighbors minimizes the running cost. After processing all values, drain any remaining stack elements pairwise the same way.

## C# Solution

```csharp
public class Solution
{
    public int MctFromLeafValues(int[] arr)
    {
        var stack = new Stack<int>();
        stack.Push(int.MaxValue);
        int total = 0;

        foreach (int value in arr)
        {
            while (stack.Peek() <= value)
            {
                int mid = stack.Pop();
                total += mid * Math.Min(stack.Peek(), value);
            }
            stack.Push(value);
        }

        while (stack.Count > 2)
        {
            total += stack.Pop() * stack.Peek();
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the stack.
