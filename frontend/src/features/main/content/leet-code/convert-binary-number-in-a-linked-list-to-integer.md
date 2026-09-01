# 1290. Convert Binary Number in a Linked List to Integer

**Difficulty:** Easy
**Category:** Linked List, Math

## Problem

Given the head of a singly linked list where each node holds either `0` or `1`, representing a binary number's digits from most significant to least significant, return the decimal value of that number.

### Example

```
Input: head = [1,0,1]
Output: 5
```

## Approach

Walk the list once from head to tail, maintaining a running decimal value. At each node, shifting the accumulated value left by one bit (multiplying by `2`) and adding the current node's bit builds up the correct decimal value incrementally, exactly like reading a binary number digit by digit from left to right.

## C# Solution

```csharp
public class Solution
{
    public int GetDecimalValue(ListNode head)
    {
        int result = 0;

        while (head != null)
        {
            result = result * 2 + head.val;
            head = head.next;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of nodes.
- **Space:** `O(1)`.
