# 206. Reverse Linked List

**Difficulty:** Easy
**Category:** Linked List, Recursion

## Problem

Given the `head` of a singly linked list, reverse the list and return the new head.

### Example

```
head = [1,2,3,4,5] -> [5,4,3,2,1]
```

## Approach

Walk the list once, keeping a `prev` pointer (initially `null`). At each node, save `next` before overwriting `current.next` to point backward at `prev`, then advance `prev` and `current` forward. When `current` becomes `null`, `prev` is the new head.

## C# Solution

```csharp
public class Solution
{
    public ListNode ReverseList(ListNode head)
    {
        ListNode prev = null;
        var current = head;

        while (current != null)
        {
            var next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        return prev;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass.
- **Space:** `O(1)`.
