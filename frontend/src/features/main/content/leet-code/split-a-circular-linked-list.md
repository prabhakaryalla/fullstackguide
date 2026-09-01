# 2674. Split a Circular Linked List

**Difficulty:** Medium
**Category:** Linked List
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the head of a circular linked list `head` (the last node's `next` points back to the head), split the list into two circular halves. The first half should contain `ceil(n / 2)` nodes and the second half should contain `floor(n / 2)` nodes, where `n` is the total number of nodes. Return an array `[head1, head2]` containing the heads of both resulting circular linked lists.

### Example

Input: head = [1,2,3,4,5] (circular)
Output: list1 = [1,2,3] (circular), list2 = [4,5] (circular)
Explanation: The list has 5 nodes, so the first half gets ceil(5/2) = 3 nodes (1,2,3) and the second half gets the remaining 2 nodes (4,5). Each half is re-linked into its own circular list.

## Approach

First traverse the list starting at `head` to count the total number of nodes `n` (stop when we return to `head`). The first half needs `ceil(n / 2)` nodes, so walk that many steps from `head` to find the last node of the first half (`firstTail`). The node right after it, `firstTail.next`, becomes the head of the second half (`secondHead`).

To finish splitting: point `firstTail.next` back to `head` to close the first circular list. Then walk from `secondHead` until we find the node whose `next` is still the original `head` (the old tail of the whole list) and redirect that node's `next` to `secondHead`, closing the second circular list.

## C# Solution

```csharp
public class Solution 
{
    public ListNode[] SplitCircularLinkedList(ListNode head)
    {
        int count = 1;
        ListNode node = head;
        while (node.next != head)
        {
            count++;
            node = node.next;
        }

        int firstHalfLength = (count + 1) / 2;
        ListNode firstTail = head;
        for (int i = 1; i < firstHalfLength; i++)
        {
            firstTail = firstTail.next;
        }

        ListNode secondHead = firstTail.next;
        firstTail.next = head;

        ListNode secondTail = secondHead;
        while (secondTail.next != head)
        {
            secondTail = secondTail.next;
        }
        secondTail.next = secondHead;

        return new ListNode[] { head, secondHead };
    }
}
```

## Complexity

- **Time:** O(n), a constant number of traversals over the list.
- **Space:** O(1) extra space (not counting the output array).
