# 369. Plus One Linked List

**Difficulty:** Medium
**Category:** Linked List
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a non-negative integer represented as a linked list of digits (most significant digit first), add one to the integer and return the resulting linked list.

### Example

```
Input: head = [1,2,3]
Output: [1,2,4]
```

### Constraints

- The number of nodes is in the range `[1, 100]`.
- `0 <= Node.val <= 9`

## Approach

Find the rightmost digit that is not `9` (using a dummy head in case every digit is `9`, so the dummy itself serves as that "non-nine" anchor). Increment that digit by 1, then set every digit after it to `0` (since a run of trailing `9`s all roll over to `0` when incremented). If the dummy head itself needed incrementing (all digits were `9`), its new value becomes the leading `1` of the result.

## C# Solution

```csharp
public class Solution
{
    public ListNode PlusOne(ListNode head)
    {
        var dummyHead = new ListNode(0) { next = head };
        var lastNonNine = dummyHead;
        var current = head;

        while (current != null)
        {
            if (current.val != 9)
                lastNonNine = current;

            current = current.next;
        }

        lastNonNine.val++;
        current = lastNonNine.next;

        while (current != null)
        {
            current.val = 0;
            current = current.next;
        }

        return dummyHead.val == 0 ? dummyHead.next : dummyHead;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` extra, aside from the dummy node.
