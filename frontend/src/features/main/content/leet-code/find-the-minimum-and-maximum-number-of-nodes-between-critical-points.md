# 2058. Find the Minimum and Maximum Number of Nodes Between Critical Points

**Difficulty:** Medium
**Category:** Linked List, Two Pointers

## Problem

A **critical point** in a linked list is a node (not the first or last node) whose value is either strictly greater than both neighbors (a local maximum) or strictly smaller than both neighbors (a local minimum). Given the `head` of a linked list, return an array `[minDistance, maxDistance]` representing the minimum and maximum distance between any two critical points, or `[-1, -1]` if fewer than two critical points exist.

## Approach

Traverse the list once, keeping track of the previous node's value and index. Whenever the current node is a critical point (compared against its previous and next neighbor), record its index: remember the very first critical index (for computing `maxDistance` at the end), and compute the distance from the previous critical index seen so far to update a running minimum distance between consecutive critical points.

At the end, `maxDistance` is simply the last critical index minus the first critical index (since critical points are visited in order), and `minDistance` is the smallest gap found between any two consecutive critical points.

## C# Solution

```csharp
public class Solution
{
    public int[] NodesBetweenCriticalPoints(ListNode head)
    {
        var prev = head;
        var cur = head.next;
        int index = 1;

        int firstCritical = -1;
        int lastCritical = -1;
        int minDistance = int.MaxValue;

        while (cur.next != null)
        {
            bool isMax = cur.val > prev.val && cur.val > cur.next.val;
            bool isMin = cur.val < prev.val && cur.val < cur.next.val;

            if (isMax || isMin)
            {
                if (firstCritical == -1)
                {
                    firstCritical = index;
                }
                else
                {
                    minDistance = Math.Min(minDistance, index - lastCritical);
                }

                lastCritical = index;
            }

            prev = cur;
            cur = cur.next;
            index++;
        }

        if (firstCritical == -1 || firstCritical == lastCritical)
            return new[] { -1, -1 };

        return new[] { minDistance, lastCritical - firstCritical };
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
