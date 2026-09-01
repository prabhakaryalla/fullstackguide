# 1669. Merge In Between Linked Lists

**Difficulty:** Medium
**Category:** Linked List

## Problem

Given `list1`, remove nodes at positions `a` through `b` (0-indexed, inclusive), and insert `list2` in their place, connecting the remaining ends. Return the head of the merged list.

### Example

```
Input: list1 = [0,1,2,3,4,5], a = 3, b = 4, list2 = [1000000,1000001,1000002]
Output: [0,1,2,1000000,1000001,1000002,5]
```

## Approach

Walk to the node just before position `a` (`before`) and the node just after position `b` (`after`). Splice `list2` in between: point `before.next` to `list2`'s head, then walk to `list2`'s tail and point it to `after`.

## C# Solution

```csharp
public class Solution
{
    public ListNode MergeInBetween(ListNode list1, int a, int b, ListNode list2)
    {
        ListNode before = list1;

        for (int i = 0; i < a - 1; i++)
        {
            before = before.next;
        }

        ListNode after = before;

        for (int i = 0; i <= b - a + 1; i++)
        {
            after = after.next;
        }

        before.next = list2;
        ListNode list2Tail = list2;

        while (list2Tail.next != null)
        {
            list2Tail = list2Tail.next;
        }

        list2Tail.next = after;

        return list1;
    }
}
```

## Complexity

- **Time:** `O(n + m)`, where `n` is the length of `list1` and `m` the length of `list2`.
- **Space:** `O(1)`.
