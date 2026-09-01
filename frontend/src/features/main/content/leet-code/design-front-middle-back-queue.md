# 1670. Design Front Middle Back Queue

**Difficulty:** Medium
**Category:** Array, Design, Linked List, Queue

## Problem

Design a queue supporting `PushFront`, `PushMiddle`, `PushBack`, `PopFront`, `PopMiddle`, and `PopBack` (pop operations return `-1` when the queue is empty). When the size is even, "middle" refers to the position closer to the front for pushes and pops that need a specific side.

### Example

```
Input: ["FrontMiddleBackQueue","pushFront","pushBack","pushMiddle","pushMiddle","popFront","popMiddle","popMiddle","popBack","popFront"]
       [[],[1],[2],[3],[4],[],[],[],[],[]]
Output: [null,null,null,null,null,1,3,4,2,-1]
```

## Approach

Maintain two doubly linked lists, `left` and `right`, split so that `left.Count` is always equal to `right.Count` or exactly one more. After every push or pop, rebalance by moving a single element between the two halves if the invariant is violated. `PushMiddle` appends to the end of `left`; `PopMiddle` removes from the end of `left` when `left` has as many or one more element than `right`, otherwise from the front of `right`.

## C# Solution

```csharp
public class FrontMiddleBackQueue
{
    private readonly LinkedList<int> left = new LinkedList<int>();
    private readonly LinkedList<int> right = new LinkedList<int>();

    private void Rebalance()
    {
        if (left.Count > right.Count + 1)
        {
            right.AddFirst(left.Last.Value);
            left.RemoveLast();
        }
        else if (right.Count > left.Count)
        {
            left.AddLast(right.First.Value);
            right.RemoveFirst();
        }
    }

    public void PushFront(int val)
    {
        left.AddFirst(val);
        Rebalance();
    }

    public void PushMiddle(int val)
    {
        left.AddLast(val);
        Rebalance();
    }

    public void PushBack(int val)
    {
        right.AddLast(val);
        Rebalance();
    }

    public int PopFront()
    {
        if (left.Count == 0 && right.Count == 0)
        {
            return -1;
        }

        int value;

        if (left.Count > 0)
        {
            value = left.First.Value;
            left.RemoveFirst();
        }
        else
        {
            value = right.First.Value;
            right.RemoveFirst();
        }

        Rebalance();
        return value;
    }

    public int PopMiddle()
    {
        if (left.Count == 0 && right.Count == 0)
        {
            return -1;
        }

        int value;

        if (left.Count == right.Count || left.Count == right.Count + 1)
        {
            value = left.Last.Value;
            left.RemoveLast();
        }
        else
        {
            value = right.First.Value;
            right.RemoveFirst();
        }

        Rebalance();
        return value;
    }

    public int PopBack()
    {
        if (left.Count == 0 && right.Count == 0)
        {
            return -1;
        }

        int value;

        if (right.Count > 0)
        {
            value = right.Last.Value;
            right.RemoveLast();
        }
        else
        {
            value = left.Last.Value;
            left.RemoveLast();
        }

        Rebalance();
        return value;
    }
}
```

## Complexity

- **Time:** `O(1)` for every operation.
- **Space:** `O(n)` for the stored elements.
