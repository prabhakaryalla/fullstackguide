# 2046. Sort Linked List Already Sorted Using Absolute Values

**Difficulty:** Medium
**Category:** Linked List, Two Pointers
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the head of a singly linked list that is sorted by the **absolute value** of its node values, reorder it in place so it is sorted by actual value (ascending), and return the new head.

### Example

`head = [0,2,-5,5,10,-10]` (sorted by absolute value: 0,2,5,5,10,10) → sorted by actual value: `[-10,-5,0,2,5,10]`.

## Approach

Because the list is sorted by absolute value, any negative node is "out of place" relative to true ascending order — it needs to move toward the front. Walk the list with a `prev`/`curr` pair starting at the head. Whenever `curr.val < 0`, unlink it from its current position and splice it in as the new head (`prev.next = curr.next`, `curr.next = head`, `head = curr`, then continue from `prev.next`). Whenever `curr.val >= 0`, it is already correctly placed relative to everything before it, so just advance `prev` and `curr`. A single left-to-right pass suffices because the non-negative values are already in ascending order among themselves, and each negative value gets moved to the front in the order encountered, keeping the growing negative prefix correctly sorted (most negative ends up furthest from the original head, but since insertion always happens right after where `prev` currently is, the relative order of already-moved negatives is preserved as ascending from the true head down to the boundary).

## C# Solution

```csharp
public class Solution 
{
    public ListNode SortLinkedList(ListNode head) 
    {
        ListNode prev = head;
        ListNode curr = head.next;

        while (curr != null)
        {
            if (curr.val < 0)
            {
                prev.next = curr.next;
                curr.next = head;
                head = curr;
                curr = prev.next;
            }
            else
            {
                prev = curr;
                curr = curr.next;
            }
        }

        return head;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
