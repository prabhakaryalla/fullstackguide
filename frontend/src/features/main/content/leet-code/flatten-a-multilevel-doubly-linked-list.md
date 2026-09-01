# 430. Flatten a Multilevel Doubly Linked List

**Difficulty:** Medium
**Category:** Linked List, Depth-First Search, Doubly-Linked List

## Problem

Given the `head` of a multilevel doubly linked list, where nodes may have an additional `child` pointer to a separate doubly linked list, flatten the list so all nodes appear in a single-level doubly linked list, and return the `head`.

### Example

```
Input: head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
Output: [1,2,3,7,8,11,12,9,10,4,5,6]
```

### Constraints

- The number of nodes will not exceed `1000`.
- `1 <= Node.val <= 10^5`

## Approach

Walk the list node by node. Whenever a node has a `child` list, splice it in: detach the child pointer, link the current node directly to the child's head, walk to the end of the child chain, and reconnect that tail to whatever originally followed the current node. Continuing the outer walk after this splice naturally descends into and then past each nested list in order.

## C# Solution

```csharp
public class Solution
{
    public Node Flatten(Node head)
    {
        var current = head;

        while (current != null)
        {
            if (current.child != null)
            {
                var next = current.next;
                var child = current.child;

                current.child = null;
                current.next = child;
                child.prev = current;

                var tail = child;
                while (tail.next != null)
                    tail = tail.next;

                tail.next = next;
                if (next != null) next.prev = tail;
            }

            current = current.next;
        }

        return head;
    }
}
```

## Complexity

- **Time:** `O(n)` — every node is visited a constant number of times.
- **Space:** `O(1)` — the list is flattened in place.
