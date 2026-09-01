# 2181. Merge Nodes in Between Zeros

**Difficulty:** Medium
**Category:** Linked List, Simulation

## Problem

You are given the head of a linked list, which contains a series of integers separated by 0's. The beginning and end of the linked list will have value 0.

For every two consecutive 0's, merge all the nodes lying in between them into a single node whose value is the sum of all the merged nodes. The modified list should not contain any 0's.

Return the head of the modified linked list.

### Example

```
Input: head = [0,3,1,0,4,5,2,0]
Output: [4,11]
Explanation: 
The segment [3,1] sums to 4.
The segment [4,5,2] sums to 11.
```

## Approach

We traverse the linked list and whenever we encounter a 0, we start summing the values of subsequent nodes until we hit the next 0. We create a new node with this sum and add it to our result list. We continue this process until we've processed the entire list.

The algorithm:
1. Skip the initial 0 node
2. Initialize a sum variable to 0
3. Traverse nodes, accumulating their values in sum
4. When we hit a 0, create a new node with the accumulated sum
5. Reset sum to 0 and continue until end of list

## C# Solution

```csharp
public class Solution
{
    public ListNode MergeNodes(ListNode head)
    {
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        ListNode node = head.next; // Skip initial 0
        int sum = 0;
        
        while (node != null)
        {
            if (node.val == 0)
            {
                current.next = new ListNode(sum);
                current = current.next;
                sum = 0;
            }
            else
            {
                sum += node.val;
            }
            node = node.next;
        }
        
        return dummy.next;
    }
}
```

## Complexity

- **Time:** O(n), where n is the number of nodes in the linked list
- **Space:** O(1), excluding the output list
