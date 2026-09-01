# 24. Swap Nodes in Pairs

**Difficulty:** Medium
**Category:** Linked List, Recursion

## Problem

Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (only node references may be changed).

### Example 1

```
Input: head = [1,2,3,4]
Output: [2,1,4,3]
```

```mermaid
graph LR
    A[1] --> B[2] --> C[3] --> D[4]
    B -.swap.-> A
    D -.swap.-> C
```

### Example 2

```
Input: head = []
Output: []
```

### Example 3

```
Input: head = [1]
Output: [1]
```

### Constraints

- The number of nodes in the list is in the range `[0, 100]`.
- `0 <= Node.val <= 100`

## Approach

Use a dummy node before the head so the first pair can be swapped uniformly. For each pair, rewire three pointers (`prev.next`, `first.next`, `second.next`) to swap the two nodes, then advance `prev` to `first` (now the second node of the swapped pair) for the next iteration.

## C# Solution

```csharp
public class Solution
{
    public ListNode SwapPairs(ListNode head)
    {
        var dummy = new ListNode(0, head);
        var prev = dummy;

        while (prev.next != null && prev.next.next != null)
        {
            var first = prev.next;
            var second = first.next;

            first.next = second.next;
            second.next = first;
            prev.next = second;

            prev = first;
        }

        return dummy.next;
    }
}
```

## Complexity

- **Time:** `O(n)` — each node is visited once.
- **Space:** `O(1)` — pointers are rewired in place.
