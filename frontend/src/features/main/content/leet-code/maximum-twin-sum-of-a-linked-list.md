# 2130. Maximum Twin Sum of a Linked List

**Difficulty:** Medium
**Category:** Linked List, Two Pointers, Stack

## Problem

In a linked list of even length, the `i`-th node and the `(n-1-i)`-th node are twins. Return the maximum twin sum.

### Example

```
Input: head = [5,4,2,1]
Output: 6
Explanation: Twins are (5,1) and (4,2). Maximum sum is 4+2=6.
```

## Approach

Use fast/slow pointers to find the middle. Reverse the second half. Traverse both halves simultaneously, computing twin sums and tracking the maximum.

## C# Solution

```csharp
public class Solution
{
    public int PairSum(ListNode head)
    {
        var slow = head;
        var fast = head;
        
        while (fast != null && fast.next != null)
        {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        ListNode prev = null;
        while (slow != null)
        {
            var next = slow.next;
            slow.next = prev;
            prev = slow;
            slow = next;
        }
        
        int maxSum = 0;
        while (prev != null)
        {
            maxSum = Math.Max(maxSum, head.val + prev.val);
            head = head.next;
            prev = prev.next;
        }
        
        return maxSum;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
