# 1171. Remove Zero Sum Consecutive Nodes from Linked List

**Difficulty:** Medium
**Category:** Hash Table, Linked List, Prefix Sum

## Problem

Given the head of a linked list, repeatedly remove consecutive sequences of nodes whose values sum to `0`, until no such sequence remains. Return the head of the final list.

### Example

```
Input: head = [1,2,-3,3,1]
Output: [3,1]
```

## Approach

Compute a running prefix sum while walking the list (with a dummy node prepended). Any two positions sharing the same prefix sum mean the nodes between them sum to zero and can be removed. A first pass records, for every prefix-sum value, the *last* node at which that sum occurs. A second pass then relinks each node directly to the successor recorded for its own prefix sum, which automatically skips over any zero-sum segments — including nested or overlapping ones.

## C# Solution

```csharp
public class Solution
{
    public ListNode RemoveZeroSumSublists(ListNode head)
    {
        var dummy = new ListNode(0) { next = head };
        var prefixSumMap = new Dictionary<int, ListNode>();

        int sum = 0;
        var node = dummy;
        while (node != null)
        {
            sum += node.val;
            prefixSumMap[sum] = node;
            node = node.next;
        }

        sum = 0;
        node = dummy;
        while (node != null)
        {
            sum += node.val;
            node.next = prefixSumMap[sum].next;
            node = node.next;
        }

        return dummy.next;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the prefix-sum map.
