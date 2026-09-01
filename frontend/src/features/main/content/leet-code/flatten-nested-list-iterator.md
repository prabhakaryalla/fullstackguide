# 341. Flatten Nested List Iterator

**Difficulty:** Medium
**Category:** Stack, Tree, Depth-First Search, Design, Queue, Iterator

## Problem

Given a nested list of integers, where each element is either an integer or a list whose elements may also be integers or other lists, implement an iterator to flatten it. Implement the `NestedIterator` class with `HasNext()` and `Next()` methods.

### Example

```
Input: nestedList = [[1,1],2,[1,1]]
Output: [1,1,2,1,1]
```

### Constraints

- `1 <= nestedList.length <= 500`
- The values of the integers in the nested list are in the range `[-10^6, 10^6]`.

## Approach

Recursively walk the nested structure once up front (depth-first), pushing every integer encountered into a queue in order. `HasNext` and `Next` then simply check and dequeue from this pre-flattened queue in constant time.

## C# Solution

```csharp
public class NestedIterator
{
    private readonly Queue<int> queue = new();

    public NestedIterator(IList<NestedInteger> nestedList)
    {
        Flatten(nestedList);
    }

    public bool HasNext() => queue.Count > 0;

    public int Next() => queue.Dequeue();

    private void Flatten(IList<NestedInteger> nestedList)
    {
        foreach (var item in nestedList)
        {
            if (item.IsInteger())
                queue.Enqueue(item.GetInteger());
            else
                Flatten(item.GetList());
        }
    }
}
```

## Complexity

- **Time:** `O(n)` total to flatten during construction, `O(1)` per `HasNext`/`Next` call.
- **Space:** `O(n)` for the flattened queue.
