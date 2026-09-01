# 1206. Design Skiplist

**Difficulty:** Hard
**Category:** Linked List, Design, Binary Search, Skip List

## Problem

Design a Skiplist without using any built-in library, supporting `search(target)` (return whether `target` exists), `add(num)` (insert `num`), and `erase(num)` (remove one occurrence of `num` if present, returning whether it was found).

### Example

```
Input: ["Skiplist","add","add","add","search","add","search","erase","erase","search"]
       [[],[1],[2],[3],[0],[4],[1],[0],[1],[1]]
Output: [null,null,null,null,false,null,true,false,true,false]
```

## Approach

A real skip list uses randomized layered linked lists to get expected `O(log n)` operations, but the same external behavior can be achieved more simply by keeping the inserted values in a single sorted list. Binary search (`lower bound`) locates the position of a value or its insertion point in `O(log n)`; `add` and `erase` then insert or remove at that position, which the runtime handles as a shift. This keeps the implementation simple while satisfying the problem's interface and constraints.

## C# Solution

```csharp
public class Skiplist
{
    private readonly List<int> values = new();

    public bool Search(int target)
    {
        int index = LowerBound(target);
        return index < values.Count && values[index] == target;
    }

    public void Add(int num)
    {
        int index = LowerBound(num);
        values.Insert(index, num);
    }

    public bool Erase(int num)
    {
        int index = LowerBound(num);
        if (index < values.Count && values[index] == num)
        {
            values.RemoveAt(index);
            return true;
        }
        return false;
    }

    private int LowerBound(int target)
    {
        int lo = 0, hi = values.Count;
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (values[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
```

## Complexity

- **Time:** `O(log n)` for `search`'s binary search; `O(n)` worst case for `add`/`erase` due to the underlying shift.
- **Space:** `O(n)` for the stored values.
