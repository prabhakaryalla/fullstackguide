# 3217. Delete Nodes From Linked List Present in Array

**Difficulty:** Medium
**Category:** Array, Hash Table, Linked List

## Problem
Given the head of a linked list and an integer array `nums`, remove every node from the linked list whose value appears anywhere in `nums`. Return the head of the modified list.

## Approach
Put all values from `nums` into a hash set for O(1) membership checks. Use a dummy node pointing to the head to simplify removal at the very start of the list. Traverse the list with a pointer; whenever the next node's value is found in the set, bypass it by linking the current node directly to the node after next (effectively deleting it); otherwise, advance the pointer normally.

## C# Solution
```csharp
public class Solution {
    public ListNode ModifiedList(int[] nums, ListNode head) {
        ListNode dummy = new ListNode(0, head);
        HashSet<int> numsSet = new HashSet<int>(nums);

        ListNode curr = dummy;
        while (curr.next != null) {
            if (numsSet.Contains(curr.next.val))
                curr.next = curr.next.next;
            else
                curr = curr.next;
        }

        return dummy.next;
    }
}
```

## Complexity
- Time: O(|nums| + |head|)
- Space: O(|nums|)
