# 876. Middle of the Linked List

**Difficulty:** Easy
**Category:** Linked List, Two Pointers

## Problem

Given the head of a singly linked list, return the middle node. If there are two middle nodes, return the second one.

### Example

```
Input: head = [1,2,3,4,5]
Output: [3,4,5]
```

## Approach

Use the classic slow/fast pointer technique: advance `slow` by one node and `fast` by two nodes at a time. When `fast` reaches the end of the list, `slow` is positioned at the middle (naturally landing on the second middle node for even-length lists, since `fast` runs out one step earlier).

## C# Solution

```csharp
public class Solution
{
    public ListNode MiddleNode(ListNode head)
    {
        var slow = head;
        var fast = head;

        while (fast != null && fast.next != null)
        {
            slow = slow.next;
            fast = fast.next.next;
        }

        return slow;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` extra.
