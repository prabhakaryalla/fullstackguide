# 82. Remove Duplicates from Sorted List II

**Difficulty:** Medium
**Category:** Linked List, Two Pointers

## Problem

Given the `head` of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.

### Example 1

```
Input: head = [1,2,3,3,4,4,5]
Output: [1,2,5]
```

```mermaid
graph LR
    A[1] --> B[2] --> C[3] --> D[3] --> E[4] --> F[4] --> G[5]
    style A fill:#4caf50,color:#fff
    style B fill:#4caf50,color:#fff
    style G fill:#4caf50,color:#fff
```

### Example 2

```
Input: head = [1,1,1,2,3]
Output: [2,3]
```

### Constraints

- The number of nodes in the list is in the range `[0, 300]`.
- `-100 <= Node.val <= 100`
- The list is guaranteed to be sorted in ascending order.

## Approach

Use a dummy node before the head (since the head itself might be a duplicate that gets removed entirely). Walk with `prev` and `current`; whenever `current.next` has the same value as `current`, skip forward past the entire run of duplicates and link `prev.next` directly past it. Otherwise advance `prev` normally.

## C# Solution

```csharp
public class Solution
{
    public ListNode DeleteDuplicates(ListNode head)
    {
        var dummy = new ListNode(0, head);
        var prev = dummy;
        var current = head;

        while (current != null)
        {
            if (current.next != null && current.val == current.next.val)
            {
                int duplicateVal = current.val;
                while (current != null && current.val == duplicateVal)
                {
                    current = current.next;
                }
                prev.next = current;
            }
            else
            {
                prev = current;
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
