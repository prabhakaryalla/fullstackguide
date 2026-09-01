# 1721. Swapping Nodes in a Linked List

**Difficulty:** Medium
**Category:** Linked List, Two Pointers

## Problem

Given the head of a linked list and an integer `k`, swap the values of the `kth` node from the beginning and the `kth` node from the end (1-indexed), then return the head.

### Example

```
Input: head = [1,2,3,4,5], k = 2
Output: [1,4,3,2,5]
```

## Approach

Advance a pointer `k - 1` steps to reach the `kth` node from the start. Then use a second pointer starting at the head, moving both the reference pointer and the second pointer together until the reference pointer reaches the last node — at that point the second pointer is at the `kth` node from the end. Swap the two nodes' values.

## C# Solution

```csharp
public class Solution
{
    public ListNode SwapNodes(ListNode head, int k)
    {
        ListNode first = head;
        for (int i = 1; i < k; i++) first = first.next;

        ListNode second = head;
        ListNode runner = first;
        while (runner.next != null)
        {
            runner = runner.next;
            second = second.next;
        }

        int temp = first.val;
        first.val = second.val;
        second.val = temp;

        return head;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
