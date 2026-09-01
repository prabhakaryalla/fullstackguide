# 2487. Remove Nodes From Linked List

**Difficulty:** Medium
**Category:** Linked List, Stack, Recursion, Monotonic Stack

## Problem

You are given the head of a linked list.

Remove every node which has a node with a strictly greater value anywhere to the right side of it.

Return the head of the modified linked list.

### Example

```
Input: head = [5,2,13,3,8]
Output: [13,8]
Explanation: Nodes with values 5, 2, and 3 have nodes with greater values to their right.
```

## Approach

Use a monotonic decreasing stack approach:
1. Traverse the list and use a stack to keep track of nodes
2. When we encounter a node with a greater value than the stack top, pop elements that are smaller
3. This ensures we only keep nodes that don't have a greater value to their right
4. Rebuild the list from the stack

Alternatively, we can reverse the list, process it left-to-right keeping track of the maximum seen so far, and reverse again.

## C# Solution

```csharp
public class Solution
{
    public ListNode RemoveNodes(ListNode head)
    {
        if (head == null) return null;
        
        Stack<ListNode> stack = new Stack<ListNode>();
        ListNode current = head;
        
        while (current != null)
        {
            while (stack.Count > 0 && stack.Peek().val < current.val)
            {
                stack.Pop();
            }
            stack.Push(current);
            current = current.next;
        }
        
        ListNode next = null;
        while (stack.Count > 0)
        {
            current = stack.Pop();
            current.next = next;
            next = current;
        }
        
        return next;
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of nodes
- **Space:** O(n) for the stack
