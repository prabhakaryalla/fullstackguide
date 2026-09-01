# 2095. Delete the Middle Node of a Linked List

**Difficulty:** Medium
**Category:** Linked List, Two Pointers

## Problem

Given the `head` of a linked list, delete the **middle node** and return the head of the modified list. If there are two middle nodes (even length), delete the second one.

## Approach

Use the classic slow/fast pointer technique, but keep a reference to the node **before** the slow pointer so it can be unlinked. Advance `fast` by two steps and `slow` by one step per iteration; when `fast` reaches the end (or one before the end), `slow` sits at the middle node. Relink `prev.next` to skip over `slow`. Handle the special case of a single-node list separately (deleting it entirely, returning `null`).

## C# Solution

```csharp
public class Solution
{
    public ListNode DeleteMiddle(ListNode head)
    {
        if (head.next == null) return null;

        ListNode prev = null;
        var slow = head;
        var fast = head;

        while (fast != null && fast.next != null)
        {
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }

        prev.next = slow.next;
        return head;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
