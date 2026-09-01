# 2807. Insert Greatest Common Divisors in Linked List

**Difficulty:** Medium
**Category:** Linked List, Math, Number Theory

## Problem

Given the head of a linked list `head`, insert a new node between every pair of adjacent nodes. The value of each inserted node should be the greatest common divisor (GCD) of the two adjacent nodes.

Return the modified linked list after all insertions.

### Example

```
Input: head = [18,6,10,3]
Output: [18,6,6,2,10,1,3]
Explanation: Insert GCD between consecutive pairs:
- GCD(18, 6) = 6
- GCD(6, 10) = 2
- GCD(10, 3) = 1
```

## Approach

Traverse the linked list and for each pair of adjacent nodes:
1. Calculate the GCD of the two node values
2. Create a new node with the GCD value
3. Insert it between the two nodes
4. Move to the next pair

Use the Euclidean algorithm to calculate GCD efficiently.

## C# Solution

```csharp
public class Solution
{
    public ListNode InsertGreatestCommonDivisors(ListNode head)
    {
        if (head == null || head.next == null)
            return head;
        
        ListNode current = head;
        
        while (current != null && current.next != null)
        {
            int gcdValue = GCD(current.val, current.next.val);
            ListNode gcdNode = new ListNode(gcdValue);
            
            gcdNode.next = current.next;
            current.next = gcdNode;
            
            current = gcdNode.next;
        }
        
        return head;
    }
    
    private int GCD(int a, int b)
    {
        while (b != 0)
        {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
```

## Complexity

- **Time:** O(n log m) where n is the number of nodes and m is the maximum value (for GCD calculations)
- **Space:** O(1) excluding the output list modifications
