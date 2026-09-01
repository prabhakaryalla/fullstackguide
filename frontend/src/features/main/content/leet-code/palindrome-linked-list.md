# 234. Palindrome Linked List

**Difficulty:** Easy
**Category:** Linked List, Two Pointers, Stack, Recursion

## Problem

Given the `head` of a singly linked list, return `true` if it is a palindrome, or `false` otherwise.

### Example 1

```
Input: head = [1,2,2,1]
Output: true
```

### Example 2

```
Input: head = [1,2]
Output: false
```

### Constraints

- The number of nodes is in the range `[1, 10^5]`.
- `0 <= Node.val <= 9`

## Approach

Find the middle of the list with slow/fast pointers, reverse the second half in place, then compare the first half against the reversed second half node by node. This achieves `O(1)` extra space instead of copying values into an array.

## C# Solution

```csharp
public class Solution
{
    public bool IsPalindrome(ListNode head)
    {
        var slow = head;
        var fast = head;
        while (fast != null && fast.next != null)
        {
            slow = slow.next;
            fast = fast.next.next;
        }

        ListNode prev = null;
        var current = slow;
        while (current != null)
        {
            var next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        var left = head;
        var right = prev;
        while (right != null)
        {
            if (left.val != right.val) return false;
            left = left.next;
            right = right.next;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)` — each node is visited a constant number of times.
- **Space:** `O(1)` — only pointers are used.
