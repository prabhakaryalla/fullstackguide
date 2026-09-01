# 1282. Group the People Given the Group Size They Belong To

**Difficulty:** Medium
**Category:** Array, Hash Table, Greedy

## Problem

There are `n` people numbered `0` to `n-1`, and `groupSizes[i]` gives the size of the group person `i` must belong to. Return a grouping of all people into groups matching these constraints, in any order.

### Example

```
Input: groupSizes = [3,3,3,3,3,1,3]
Output: [[5],[0,1,2],[3,4,6]]
```

## Approach

Bucket people by their required group size. Whenever the bucket for a given size accumulates exactly that many people, it's a complete group — emit it as a finished result and start a fresh bucket for that size. Since every person's required size guarantees the bucket eventually fills exactly (never overflows past the target), this greedy accumulation always produces a valid grouping.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> GroupThePeople(int[] groupSizes)
    {
        var buckets = new Dictionary<int, List<int>>();
        var result = new List<IList<int>>();

        for (int i = 0; i < groupSizes.Length; i++)
        {
            int size = groupSizes[i];
            if (!buckets.TryGetValue(size, out var list))
                buckets[size] = list = new List<int>();

            list.Add(i);

            if (list.Count == size)
            {
                result.Add(new List<int>(list));
                list.Clear();
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of people.
- **Space:** `O(n)`.
