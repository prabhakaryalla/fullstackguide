# 143. Reorder List

**Difficulty:** Medium
**Category:** Linked List, Two Pointers, Stack

## Problem

Given the `head` of a singly linked list `L0 -> L1 -> ... -> Ln-1 -> Ln`, reorder it in place to become `L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> ...`.

### Example 1

```
Input: head = [1,2,3,4]
Output: [1,4,2,3]
```

```mermaid
graph LR
    A[1] --> B[4] --> C[2] --> D[3]
    style A fill:#4caf50,color:#fff
```

### Example 2

```
Input: head = [1,2,3,4,5]
Output: [1,5,2,4,3]
```

### Constraints

- The number of nodes is in the range `[1, 5 * 10^4]`.
- `1 <= Node.val <= 1000`

## Approach

Three steps: (1) find the middle of the list using slow/fast pointers, (2) reverse the second half of the list starting right after the middle, and (3) merge the first half and the reversed second half by alternating nodes from each.

## C# Solution

```csharp
public class Solution
{
    public void ReorderList(ListNode head)
    {
        if (head == null || head.next == null) return;

        var slow = head;
        var fast = head;
        while (fast.next != null && fast.next.next != null)
        {
            slow = slow.next;
            fast = fast.next.next;
        }

        var second = slow.next;
        slow.next = null;
        ListNode prev = null;
        while (second != null)
        {
            var next = second.next;
            second.next = prev;
            prev = second;
            second = next;
        }
        second = prev;

        var first = head;
        while (second != null)
        {
            var firstNext = first.next;
            var secondNext = second.next;

            first.next = second;
            second.next = firstNext;

            first = firstNext;
            second = secondNext;
        }
    }
}
```

## Complexity

- **Time:** `O(n)` — finding the middle, reversing, and merging are each linear.
- **Space:** `O(1)`.
