# 381. Insert Delete GetRandom O(1) - Duplicates allowed

**Difficulty:** Hard
**Category:** Array, Hash Table, Design, Randomization

## Problem

Implement the `RandomizedCollection` class supporting `Insert(val)`, `Remove(val)`, and `GetRandom()`, all in average `O(1)` time, where the collection may contain duplicate elements. `GetRandom()` must return an element with probability proportional to how many times it appears.

### Example

```
Input:
["RandomizedCollection", "insert", "insert", "insert", "getRandom", "remove", "getRandom"]
[[], [1], [1], [2], [], [1], []]
Output:
[null, true, false, true, 1, true, 2]
```

### Constraints

- `-2^31 <= val <= 2^31 - 1`
- At most `2 * 10^5` calls total will be made to `Insert`, `Remove`, and `GetRandom`.
- There will be at least one element when `GetRandom` is called.

## Approach

Extend the single-value randomized set to track a *set of indices* per value (since duplicates can occupy multiple positions in the backing list). Removing a value picks any one of its stored indices, swaps the element there with the last list element (updating that swapped value's index set), then pops the last element.

## C# Solution

```csharp
public class RandomizedCollection
{
    private readonly List<int> values = new();
    private readonly Dictionary<int, HashSet<int>> indicesByValue = new();
    private readonly Random random = new();

    public bool Insert(int val)
    {
        if (!indicesByValue.TryGetValue(val, out var indices))
        {
            indices = new HashSet<int>();
            indicesByValue[val] = indices;
        }

        indices.Add(values.Count);
        values.Add(val);
        return indices.Count == 1;
    }

    public bool Remove(int val)
    {
        if (!indicesByValue.TryGetValue(val, out var indices) || indices.Count == 0) return false;

        int index = indices.First();
        indices.Remove(index);

        int lastIndex = values.Count - 1;
        int lastValue = values[lastIndex];
        values[index] = lastValue;

        if (index != lastIndex)
        {
            indicesByValue[lastValue].Remove(lastIndex);
            indicesByValue[lastValue].Add(index);
        }

        values.RemoveAt(lastIndex);
        if (indices.Count == 0) indicesByValue.Remove(val);

        return true;
    }

    public int GetRandom()
    {
        return values[random.Next(values.Count)];
    }
}
```

## Complexity

- **Time:** `O(1)` average for all three operations.
- **Space:** `O(n)` for the list and index sets.
