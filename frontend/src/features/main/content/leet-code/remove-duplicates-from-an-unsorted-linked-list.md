# 1836. Remove Duplicates From an Unsorted Linked List

**Difficulty:** Medium
**Category:** Linked List, Hash Table

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the head of an unsorted linked list, remove every node whose value appears more than once in the list, and return the resulting list.

### Example

```
Input: head = [1,2,3,2]
Output: [1,3]
```

## Approach

First pass: count the occurrences of every value in the list. Second pass: walk the list with a dummy head and a trailing pointer, unlinking any node whose value has a count greater than one, and advancing the trailing pointer only past nodes that are kept.

## C# Solution

```csharp
public class Solution
{
    public ListNode DeleteDuplicatesUnsorted(ListNode head)
    {
        var counts = new Dictionary<int, int>();
        for (var node = head; node != null; node = node.next)
        {
            counts[node.val] = counts.GetValueOrDefault(node.val) + 1;
        }

        var dummy = new ListNode(0) { next = head };
        var prev = dummy;
        var curr = head;

        while (curr != null)
        {
            if (counts[curr.val] > 1)
            {
                prev.next = curr.next;
            }
            else
            {
                prev = curr;
            }
            curr = curr.next;
        }

        return dummy.next;
    }
}
```

## Complexity

- **Time:** `O(n)` for the two passes.
- **Space:** `O(n)` for the frequency map.
