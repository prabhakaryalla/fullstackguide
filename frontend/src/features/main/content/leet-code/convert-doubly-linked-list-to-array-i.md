# 3263. Convert Doubly Linked List to Array I

**Difficulty:** Easy
**Category:** Array, Doubly-Linked List, Linked List

## Problem
Given the head of a doubly linked list, return an array containing the values of all its nodes in order from head to tail.

## Approach
Traverse the linked list starting from the head, following the `next` pointers, appending each node's value to a result list until reaching the end (null).

## C# Solution
```csharp
public class Solution {
    public int[] ToArray(Node head) {
        List<int> ans = new List<int>();
        Node curr = head;

        while (curr != null) {
            ans.Add(curr.val);
            curr = curr.next;
        }

        return ans.ToArray();
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1) extra (excluding output)
