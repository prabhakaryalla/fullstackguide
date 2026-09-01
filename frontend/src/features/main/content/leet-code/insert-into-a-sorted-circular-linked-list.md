# 708. Insert into a Sorted Circular Linked List

**Difficulty:** Medium
**Category:** Linked List
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a node from a circular, ascending-sorted, singly linked list, insert a new value into the list such that it remains sorted and circular, then return a reference to the original given node (or the new node, if the list was originally empty).

### Example

```
Input: head = [3,4,1], insertVal = 2
Output: [3,4,1,2] (as a circular list: 3 -> 4 -> 1 -> 2 -> 3 -> ...)
```

## Approach

Walk the circular list looking for the correct insertion point: either a normal ascending gap where `current.val <= insertVal <= current.next.val`, or the "wrap-around" point where `current.val > current.next.val` (the boundary between largest and smallest values) and `insertVal` is either `>=` the largest or `<=` the smallest. If neither case is found after a full loop back to the start (all values equal, or inserting doesn't fit any natural gap), simply insert right after the starting node as a safe fallback.

## C# Solution

```csharp
public class Solution
{
    public Node Insert(Node head, int insertVal)
    {
        var newNode = new Node(insertVal);

        if (head == null)
        {
            newNode.next = newNode;
            return newNode;
        }

        var current = head;

        while (true)
        {
            if (current.val <= insertVal && insertVal <= current.next.val)
                break;

            if (current.val > current.next.val)
            {
                if (insertVal >= current.val || insertVal <= current.next.val)
                    break;
            }

            current = current.next;
            if (current == head) break;
        }

        newNode.next = current.next;
        current.next = newNode;

        return head;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
