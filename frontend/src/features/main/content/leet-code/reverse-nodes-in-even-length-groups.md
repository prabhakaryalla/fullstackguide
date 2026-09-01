# 2074. Reverse Nodes in Even Length Groups

**Difficulty:** Medium
**Category:** Linked List, Simulation

## Problem

Given the `head` of a linked list, the nodes are conceptually divided into consecutive groups of increasing sizes `1, 2, 3, ...` (the last group may be shorter than intended if there aren't enough remaining nodes). For every group whose **actual** length is even, reverse that group's nodes. Return the head of the modified list.

## Approach

Walk through the list group by group. For each group, first collect its actual node values into a list by advancing a pointer up to the intended group size or until the list ends (whichever comes first). If the collected group has an even number of nodes, reverse the order of the *values* stored in those nodes in place (swapping values is simpler than relinking pointers). Then move on to the next group, whose intended size is one larger than the previous.

## C# Solution

```csharp
public class Solution
{
    public ListNode ReverseEvenLengthGroups(ListNode head)
    {
        int groupSize = 1;
        var groupStart = head;

        while (groupStart != null)
        {
            var nodes = new List<ListNode>();
            var cur = groupStart;
            for (int i = 0; i < groupSize && cur != null; i++)
            {
                nodes.Add(cur);
                cur = cur.next;
            }

            if (nodes.Count % 2 == 0)
            {
                int left = 0, right = nodes.Count - 1;
                while (left < right)
                {
                    (nodes[left].val, nodes[right].val) = (nodes[right].val, nodes[left].val);
                    left++;
                    right--;
                }
            }

            groupStart = cur;
            groupSize++;
        }

        return head;
    }
}
```

## Complexity

- **Time:** `O(n)`, since every node is visited a constant number of times across all groups.
- **Space:** `O(sqrt(n))` for the largest group's temporary node list.
