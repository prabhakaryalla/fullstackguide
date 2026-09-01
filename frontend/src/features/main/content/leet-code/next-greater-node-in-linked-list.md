# 1019. Next Greater Node In Linked List

**Difficulty:** Medium
**Category:** Linked List, Array, Stack

## Problem

Given the `head` of a linked list with `n` nodes, for each node return the value of the next node with a strictly greater value, or `0` if none exists.

### Example

```
Input: head = [2,1,5]
Output: [5,5,0]
```

## Approach

Copy the list values into an array for easy indexed access. Use a monotonic decreasing stack of indices whose "next greater" hasn't been found yet: for each new value, pop and resolve any stacked indices whose value is smaller than the current one (the current value is their answer), then push the current index. Any indices left on the stack at the end have no next greater element, so they keep the default `0`.

## C# Solution

```csharp
public class Solution
{
    public int[] NextLargerNodes(ListNode head)
    {
        var values = new List<int>();
        for (var node = head; node != null; node = node.next) values.Add(node.val);

        int n = values.Count;
        var result = new int[n];
        var stack = new Stack<int>();

        for (int i = 0; i < n; i++)
        {
            while (stack.Count > 0 && values[stack.Peek()] < values[i])
            {
                result[stack.Pop()] = values[i];
            }
            stack.Push(i);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` — each index is pushed and popped at most once.
- **Space:** `O(n)` for the values array and stack.
