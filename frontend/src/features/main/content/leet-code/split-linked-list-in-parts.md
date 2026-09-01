# 725. Split Linked List in Parts

**Difficulty:** Medium
**Category:** Linked List, Array

## Problem

Given the `head` of a linked list and an integer `k`, split the list into `k` consecutive parts with lengths as equal as possible (earlier parts get any extra nodes), and return an array of the `k` part heads (some may be `null` if there are fewer nodes than `k`).

### Example

```
Input: head = [1,2,3], k = 5
Output: [[1],[2],[3],[],[]]
```

## Approach

First count the total number of nodes to compute each part's base size (`length / k`) and how many leading parts get one extra node (`length % k`). Then walk the list once, cutting off a segment of the appropriate size for each of the `k` parts by advancing a pointer and severing its `next` link at the end of each segment.

## C# Solution

```csharp
public class Solution
{
    public ListNode[] SplitListToParts(ListNode head, int k)
    {
        int length = 0;
        var current = head;
        while (current != null)
        {
            length++;
            current = current.next;
        }

        int baseSize = length / k;
        int extra = length % k;

        var result = new ListNode[k];
        current = head;

        for (int i = 0; i < k; i++)
        {
            if (current == null) break;

            result[i] = current;
            int partSize = baseSize + (i < extra ? 1 : 0);

            for (int j = 0; j < partSize - 1; j++)
                current = current.next;

            var next = current.next;
            current.next = null;
            current = next;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n + k)`.
- **Space:** `O(k)` for the result array.
