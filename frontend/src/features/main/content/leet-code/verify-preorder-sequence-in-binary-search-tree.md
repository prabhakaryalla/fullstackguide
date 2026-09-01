# 255. Verify Preorder Sequence in Binary Search Tree

**Difficulty:** Medium
**Category:** Array, Stack, Binary Search Tree, Binary Tree, Monotonic Stack

## Problem

Given an array of unique integers `preorder`, return `true` if it represents the correct preorder traversal sequence of a binary search tree.

### Example 1

```
Input: preorder = [5,2,1,3,6]
Output: true
```

### Example 2

```
Input: preorder = [5,2,6,1,3]
Output: false
```

### Constraints

- `1 <= preorder.length <= 10^4`
- All values are unique.

## Approach

Walk through the sequence with a stack representing the path of ancestors still awaiting a right child, and a running `lowerBound` (initially negative infinity) representing the minimum value that could legally appear next. Whenever the current value is less than the top of the stack, it must be a left child, so push it. Whenever it's greater, it means we're moving into the right subtree of some ancestor — pop all stack entries less than the current value, updating `lowerBound` to the last popped value. If at any point the current value is less than `lowerBound`, the sequence is invalid.

## C# Solution

```csharp
public class Solution
{
    public bool VerifyPreorder(int[] preorder)
    {
        var stack = new Stack<int>();
        int lowerBound = int.MinValue;

        foreach (var value in preorder)
        {
            if (value < lowerBound) return false;

            while (stack.Count > 0 && stack.Peek() < value)
                lowerBound = stack.Pop();

            stack.Push(value);
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)` — each value is pushed and popped from the stack at most once.
- **Space:** `O(n)` — for the stack in the worst case.
