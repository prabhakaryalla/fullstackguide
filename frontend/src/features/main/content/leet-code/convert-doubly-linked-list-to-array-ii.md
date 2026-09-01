# 3294. Convert Doubly Linked List to Array II

**Difficulty:** Medium
**Category:** Array, Linked List, Doubly-Linked List
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given a node of a doubly linked list, which is not necessarily the head of the list. Each node has a `val`, a `prev` pointer, and a `next` pointer. Return an array containing the values of all nodes in the list, ordered from the true head to the tail.

## Approach
Since the given node may be anywhere in the list, first walk backward using `prev` pointers until reaching the node whose `prev` is `null` — this is the head. Then traverse forward from the head using `next` pointers, appending each node's value, until reaching `null`.

## C# Solution

```csharp
public class Solution 
{
    public int[] ToArray(Node node) 
    {
        Node curr = node;
        while (curr.prev != null) 
        {
            curr = curr.prev;
        }

        List<int> ans = new List<int>();
        while (curr != null) 
        {
            ans.Add(curr.val);
            curr = curr.next;
        }

        return ans.ToArray();
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1) extra (excluding output)
