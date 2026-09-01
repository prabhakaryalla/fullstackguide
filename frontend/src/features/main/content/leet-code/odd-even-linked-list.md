# 328. Odd Even Linked List

**Difficulty:** Medium
**Category:** Linked List

## Problem

Given the `head` of a singly linked list, group all the nodes at odd indices together followed by the nodes at even indices (using 1-based indexing), and return the reordered list. The relative order inside each group must be preserved, and the solution must run in `O(1)` extra space and `O(n)` time.

### Example

```
Input: head = [1,2,3,4,5]
Output: [1,3,5,2,4]
```

### Constraints

- The number of nodes is in the range `[0, 10^4]`.
- `-10^6 <= Node.val <= 10^6`

## Approach

Maintain two pointers, `odd` and `even`, starting at the first and second nodes, and remember the head of the even chain. Repeatedly relink each pointer to skip one node ahead (rebuilding the odd chain and the even chain in parallel), then attach the even chain after the last odd node.

## C# Solution

```csharp
public class Solution
{
    public ListNode OddEvenList(ListNode head)
    {
        if (head == null || head.next == null) return head;

        var odd = head;
        var even = head.next;
        var evenHead = even;

        while (even != null && even.next != null)
        {
            odd.next = even.next;
            odd = odd.next;
            even.next = odd.next;
            even = even.next;
        }

        odd.next = evenHead;
        return head;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the list.
- **Space:** `O(1)` — pointers only, no extra nodes allocated.
