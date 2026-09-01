# 61. Rotate List

**Difficulty:** Medium
**Category:** Linked List, Two Pointers

## Problem

Given the `head` of a linked list, rotate the list to the right by `k` places.

### Example 1

```
Input: head = [1,2,3,4,5], k = 2
Output: [4,5,1,2,3]
```

```mermaid
graph LR
    A[1] --> B[2] --> C[3] --> D[4] --> E[5]
    style D fill:#4caf50,color:#fff
    style E fill:#4caf50,color:#fff
```

### Example 2

```
Input: head = [0,1,2], k = 4
Output: [2,0,1]
```

### Constraints

- The number of nodes in the list is in the range `[0, 500]`.
- `-100 <= Node.val <= 100`
- `0 <= k <= 2 * 10^9`

## Approach

First find the list's length and connect the tail to the head, forming a ring. Reduce `k` modulo the length (rotating by the full length is a no-op). Then walk `length - k % length` steps from the head to find the new tail, break the ring there, and return the node after it as the new head.

## C# Solution

```csharp
public class Solution
{
    public ListNode RotateRight(ListNode head, int k)
    {
        if (head == null || head.next == null || k == 0) return head;

        int length = 1;
        var tail = head;
        while (tail.next != null)
        {
            tail = tail.next;
            length++;
        }

        tail.next = head; // form a ring

        int stepsToNewTail = length - k % length;
        var newTail = head;
        for (int i = 1; i < stepsToNewTail; i++)
        {
            newTail = newTail.next;
        }

        var newHead = newTail.next;
        newTail.next = null; // break the ring
        return newHead;
    }
}
```

## Complexity

- **Time:** `O(n)` — two passes over the list.
- **Space:** `O(1)`.
