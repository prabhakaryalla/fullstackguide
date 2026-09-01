# 3063. Linked List Frequency

**Difficulty:** Easy
**Category:** Hash Table, Linked List

## Problem

Given the head of a linked list containing integer values, return the head of a new linked list where each node holds the frequency of one distinct value from the original list. The order of the resulting nodes does not matter.

### Example

```
Input: head = [1,1,2,1,2,3]
Output: [3,2,1]
Explanation: 1 occurs 3 times, 2 occurs 2 times, and 3 occurs 1 time (order may vary).
```

## Approach

Traverse the list once, tallying occurrences of each value in a hash map. Then build a new linked list, appending one node per distinct value holding its frequency.

## C# Solution

```csharp
public class Solution {
    public ListNode FrequenciesOfElements(ListNode head) {
        var count = new Dictionary<int, int>();
        ListNode curr = head;

        while (curr != null) {
            count[curr.val] = count.GetValueOrDefault(curr.val) + 1;
            curr = curr.next;
        }

        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        foreach (int freq in count.Values) {
            tail.next = new ListNode(freq);
            tail = tail.next;
        }

        return dummy.next;
    }
}
```

## Complexity

- Time: O(n) — one pass to count, one pass to build the result list.
- Space: O(n) — the frequency map and the new list.
