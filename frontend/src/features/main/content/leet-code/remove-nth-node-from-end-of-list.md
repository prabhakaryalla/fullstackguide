# 19. Remove Nth Node From End of List

**Difficulty:** Medium
**Category:** Linked List, Two Pointers

## Problem

Given the `head` of a linked list, remove the `n`-th node from the end of the list and return its head.

### Example 1

```
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
```

```mermaid
graph LR
    A[1] --> B[2] --> C[3] --> D[4] --> E[5]
    style D fill:#f44336,color:#fff
```

### Example 2

```
Input: head = [1], n = 1
Output: []
```

### Example 3

```
Input: head = [1,2], n = 1
Output: [1]
```

### Constraints

- The number of nodes in the list is `sz`.
- `1 <= sz <= 30`
- `0 <= Node.val <= 100`
- `1 <= n <= sz`

## Approach

Use two pointers separated by `n` nodes: advance a `fast` pointer `n` steps ahead first, then move both `fast` and `slow` together until `fast` reaches the end. `slow` now sits just before the node to remove, so its `next` pointer can be relinked in a single pass. A dummy head node simplifies removing the actual head.

## C# Solution

```csharp
public class Solution
{
    public ListNode RemoveNthFromEnd(ListNode head, int n)
    {
        var dummy = new ListNode(0, head);
        var fast = dummy;
        var slow = dummy;

        for (int i = 0; i < n; i++)
        {
            fast = fast.next;
        }

        while (fast.next != null)
        {
            fast = fast.next;
            slow = slow.next;
        }

        slow.next = slow.next.next;
        return dummy.next;
    }
}
```

## Complexity

- **Time:** `O(L)` — where `L` is the list length; a single pass.
- **Space:** `O(1)`.
