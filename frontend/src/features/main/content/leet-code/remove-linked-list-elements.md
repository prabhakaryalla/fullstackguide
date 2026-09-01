# 203. Remove Linked List Elements

**Difficulty:** Easy
**Category:** Linked List, Recursion

## Problem

Given the `head` of a linked list and an integer `val`, remove all nodes with `Node.val == val` and return the new head.

### Example

```
head = [1,2,6,3,4,5,6], val = 6 -> [1,2,3,4,5]
```

## Approach

Use a dummy node before `head` so a matching head node can be removed the same way as any other node. Walk the list with a `current` pointer; whenever `current.next` matches `val`, skip past it by relinking; otherwise advance `current` normally.

## C# Solution

```csharp
public class Solution
{
    public ListNode RemoveElements(ListNode head, int val)
    {
        var dummy = new ListNode(0, head);
        var current = dummy;

        while (current.next != null)
        {
            if (current.next.val == val)
            {
                current.next = current.next.next;
            }
            else
            {
                current = current.next;
            }
        }

        return dummy.next;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass.
- **Space:** `O(1)`.
