# 83. Remove Duplicates from Sorted List

**Difficulty:** Easy
**Category:** Linked List

## Problem

Given the `head` of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.

### Example 1

```
Input: head = [1,1,2]
Output: [1,2]
```

```mermaid
graph LR
    A[1] --> B[1] --> C[2]
    style A fill:#4caf50,color:#fff
    style C fill:#4caf50,color:#fff
```

### Example 2

```
Input: head = [1,1,2,3,3]
Output: [1,2,3]
```

### Constraints

- The number of nodes in the list is in the range `[0, 300]`.
- `-100 <= Node.val <= 100`
- The list is guaranteed to be sorted in ascending order.

## Approach

Since the list is sorted, all duplicates of a value are consecutive. Walk the list with a single pointer; whenever the current node's value equals the next node's value, skip the next node by relinking `current.next` to `current.next.next`. Otherwise advance normally.

## C# Solution

```csharp
public class Solution
{
    public ListNode DeleteDuplicates(ListNode head)
    {
        var current = head;

        while (current != null && current.next != null)
        {
            if (current.val == current.next.val)
            {
                current.next = current.next.next;
            }
            else
            {
                current = current.next;
            }
        }

        return head;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass.
- **Space:** `O(1)`.
