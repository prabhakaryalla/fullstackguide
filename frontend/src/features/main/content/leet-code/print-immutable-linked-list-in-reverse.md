# 1265. Print Immutable Linked List in Reverse

**Difficulty:** Medium
**Category:** Linked List, Two Pointers, Recursion, Interactive
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the head of a singly linked list exposed only through an `ImmutableListNode` interface (`PrintValue()` and `GetNext()` — no direct field access or list modification), print every node's value in reverse order.

## Approach

Since the list can't be reversed or indexed directly, use recursion to defer printing until the recursive calls unwind: recurse to the end of the list first, and only print the current node's value *after* the recursive call for the rest of the list returns. This naturally visits nodes tail-first without needing extra storage for the whole list.

## C# Solution

```csharp
public class Solution
{
    public void PrintLinkedListInReverse(ImmutableListNode head)
    {
        if (head == null) return;

        PrintLinkedListInReverse(head.GetNext());
        head.PrintValue();
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of nodes.
- **Space:** `O(n)` for the recursion call stack.
