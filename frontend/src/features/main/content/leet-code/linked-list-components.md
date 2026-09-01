# 817. Linked List Components

**Difficulty:** Medium
**Category:** Array, Hash Table, Linked List

## Problem

Given the head of a linked list and an array `nums` of distinct values (a subset of the list's values), return the number of connected components formed by the nodes whose values are in `nums` (a component is a maximal run of consecutive list nodes all belonging to `nums`).

### Example

```
Input: head = [0,1,2,3], nums = [0,1,3]
Output: 2
```

## Approach

Store `nums` in a hash set for O(1) membership checks. Walk through the list while tracking whether the previous node was part of a component; whenever a node whose value is in the set is encountered right after a node that wasn't (or at the very start), a new component begins, so increment the count.

## C# Solution

```csharp
public class Solution
{
    public int NumComponents(ListNode head, int[] nums)
    {
        var numSet = new HashSet<int>(nums);
        int count = 0;
        bool inComponent = false;

        var node = head;
        while (node != null)
        {
            if (numSet.Contains(node.val))
            {
                if (!inComponent)
                {
                    count++;
                    inComponent = true;
                }
            }
            else
            {
                inComponent = false;
            }

            node = node.next;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n + m)`, where `m` is the size of `nums`.
- **Space:** `O(m)` for the value set.
