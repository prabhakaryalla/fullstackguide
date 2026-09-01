# 1172. Dinner Plate Stacks

**Difficulty:** Hard
**Category:** Stack, Design, Heap (Priority Queue), Ordered Set

## Problem

Design a `DinnerPlates` structure that manages an unlimited number of stacks, each holding at most `capacity` plates. `Push(val)` inserts onto the leftmost stack with room (creating a new stack if needed), `Pop()` removes and returns the top plate of the rightmost non-empty stack, and `PopAtStack(index)` removes and returns the top plate of the given stack.

### Example

```
Input:
["DinnerPlates","push","push","push","push","push","popAtStack","push","push","popAtStack","popAtStack","pop","pop","pop","pop","pop"]
[[2],[1],[2],[3],[4],[5],[0],[20],[21],[0],[2],[],[],[],[],[]]
Output:
[null,null,null,null,null,null,2,null,null,20,21,5,4,3,1,-1]
```

## Approach

Maintain the stacks as a list, plus a sorted set of indices for stacks that currently have room. `Push` always targets the smallest such index (creating a new stack at the end if none has room), removing that index from the set once it becomes full. `PopAtStack` pops the given stack and, since it now has room, adds its index back into the set. `Pop` first discards any trailing empty stacks, then delegates to `PopAtStack` on the last remaining one.

## C# Solution

```csharp
public class DinnerPlates
{
    private readonly int capacity;
    private readonly List<Stack<int>> stacks = new();
    private readonly SortedSet<int> availableForPush = new();

    public DinnerPlates(int capacity)
    {
        this.capacity = capacity;
    }

    public void Push(int val)
    {
        int targetIndex = availableForPush.Count > 0 ? availableForPush.Min : stacks.Count;

        if (targetIndex == stacks.Count) stacks.Add(new Stack<int>());

        stacks[targetIndex].Push(val);
        if (stacks[targetIndex].Count < capacity) availableForPush.Add(targetIndex);
        else availableForPush.Remove(targetIndex);
    }

    public int Pop()
    {
        while (stacks.Count > 0 && stacks[^1].Count == 0)
        {
            stacks.RemoveAt(stacks.Count - 1);
        }

        if (stacks.Count == 0) return -1;

        return PopAtStack(stacks.Count - 1);
    }

    public int PopAtStack(int index)
    {
        if (index >= stacks.Count || stacks[index].Count == 0) return -1;

        int value = stacks[index].Pop();
        availableForPush.Add(index);
        return value;
    }
}
```

## Complexity

- **Time:** `O(log n)` for `Push`/`PopAtStack`; `O(n)` amortized worst case for `Pop`.
- **Space:** `O(total plates + number of stacks)`.
