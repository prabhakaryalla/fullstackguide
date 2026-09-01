# 2816. Double a Number Represented as a Linked List

**Difficulty:** Medium
**Category:** Linked List, Math, Stack

## Problem

You are given the `head` of a non-empty linked list representing a non-negative integer without leading zeroes. Return the `head` of the linked list after doubling the number it represents.

### Example

```
Input: head = [1,8,9]
Output: [3,7,8]
Explanation: 189 × 2 = 378
```

## Approach

We need to double the number represented by the linked list:

1. Reverse the linked list (to process from least significant digit)
2. Traverse and double each digit, handling carry
3. Add a new node if there's a final carry
4. Reverse the list back

Alternatively, use recursion or a stack to avoid modifying the list structure multiple times.

## C# Solution

```csharp
public class Solution
{
    public ListNode DoubleIt(ListNode head)
    {
        head = Reverse(head);
        
        ListNode current = head;
        int carry = 0;
        ListNode prev = null;
        
        while (current != null)
        {
            int doubled = current.val * 2 + carry;
            current.val = doubled % 10;
            carry = doubled / 10;
            prev = current;
            current = current.next;
        }
        
        if (carry > 0)
        {
            prev.next = new ListNode(carry);
        }
        
        return Reverse(head);
    }
    
    private ListNode Reverse(ListNode head)
    {
        ListNode prev = null;
        ListNode current = head;
        
        while (current != null)
        {
            ListNode next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        
        return prev;
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of nodes
- **Space:** O(1) excluding the output
