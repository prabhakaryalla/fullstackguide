# 1474. Delete N Nodes After M Nodes of a Linked List

**Difficulty:** Easy
**Category:** Linked List

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the `head` of a linked list and integers `m` and `n`, repeatedly keep `m` nodes and then delete the next `n` nodes, continuing this pattern until the end of the list is reached. Return the modified list's head.

### Example

```
Input: head = [1,2,3,4,5,6,7,8,9,10,11,12,13], m = 2, n = 3
Output: [1,2,6,7,11,12]
```

## Approach

Walk the list in a loop: advance `m - 1` steps to reach the end of the kept segment, then walk `n` more steps ahead to find where the deleted segment ends, and relink the kept segment directly to that point. Repeat from the new current node until reaching the end of the list.

## C# Solution

```csharp
public class Solution
{
    public ListNode DeleteNodes(ListNode head, int m, int n)
    {
        ListNode cur = head;

        while (cur != null)
        {
            for (int i = 1; i < m && cur != null; i++)
                cur = cur.next;

            if (cur == null) break;

            ListNode deleteStart = cur.next;
            for (int i = 0; i < n && deleteStart != null; i++)
                deleteStart = deleteStart.next;

            cur.next = deleteStart;
            cur = cur.next;
        }

        return head;
    }
}
```

## Complexity

- **Time:** `O(len)` where `len` is the number of nodes in the list.
- **Space:** `O(1)`.
