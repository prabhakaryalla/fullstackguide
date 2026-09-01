# 445. Add Two Numbers II

**Difficulty:** Medium
**Category:** Linked List, Math, Stack

## Problem

Given two non-empty linked lists `l1` and `l2` representing two non-negative integers with the most significant digit first, add the two numbers and return the sum as a linked list, without reversing the input lists.

### Example

```
Input: l1 = [7,2,4,3], l2 = [5,6,4]
Output: [7,8,0,7]
```

### Constraints

- The number of nodes in each list is in the range `[1, 100]`.
- `0 <= Node.val <= 9`

## Approach

Since addition naturally proceeds from the least significant digit but the lists are given most-significant-digit first, push each list's digits onto a stack to reverse their processing order. Pop from both stacks simultaneously, adding digits along with any carry, and prepend each resulting digit to the front of a newly built result list.

## C# Solution

```csharp
public class Solution
{
    public ListNode AddTwoNumbers(ListNode l1, ListNode l2)
    {
        var stack1 = ToStack(l1);
        var stack2 = ToStack(l2);

        ListNode result = null;
        int carry = 0;

        while (stack1.Count > 0 || stack2.Count > 0 || carry > 0)
        {
            int sum = carry;
            if (stack1.Count > 0) sum += stack1.Pop();
            if (stack2.Count > 0) sum += stack2.Pop();

            var node = new ListNode(sum % 10);
            node.next = result;
            result = node;
            carry = sum / 10;
        }

        return result;
    }

    private Stack<int> ToStack(ListNode node)
    {
        var stack = new Stack<int>();
        while (node != null)
        {
            stack.Push(node.val);
            node = node.next;
        }

        return stack;
    }
}
```

## Complexity

- **Time:** `O(n + m)`.
- **Space:** `O(n + m)` for the stacks and result list.
