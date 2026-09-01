# 237. Delete Node in a Linked List

**Difficulty:** Medium
**Category:** Linked List

## Problem

Given a node (not the tail) in a singly linked list, delete that node from the list. You are only given access to that node, not the head of the list.

### Example

```
Input: head = [4,5,1,9], node = 5 (the second node)
Output: [4,1,9]
```

### Constraints

- The number of nodes is in the range `[2, 1000]`.
- The value of the given node is not the last node's value.
- `node` is not the tail node.

## Approach

Since the node before the target is unreachable, instead copy the value from the next node into the current node, then unlink the next node by pointing `node.next` to `node.next.next`. Effectively the target node "becomes" its successor, and the true successor is removed.

## C# Solution

```csharp
public class Solution
{
    public void DeleteNode(ListNode node)
    {
        node.val = node.next.val;
        node.next = node.next.next;
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
