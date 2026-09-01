# 380. Insert Delete GetRandom O(1)

**Difficulty:** Medium
**Category:** Array, Hash Table, Design, Randomization

## Problem

Implement the `RandomizedSet` class supporting `Insert(val)`, `Remove(val)`, and `GetRandom()` (returns a random element from the current set of elements, with each element having the same probability), all in average `O(1)` time.

### Example

```
Input:
["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
[[], [1], [2], [2], [], [1], [2], []]
Output:
[null, true, false, true, 2, true, false, 2]
```

### Constraints

- `-2^31 <= val <= 2^31 - 1`
- At most `2 * 10^5` calls total will be made to `Insert`, `Remove`, and `GetRandom`.
- There will be at least one element when `GetRandom` is called.

## Approach

Store the values in a list (for `O(1)` random access) alongside a dictionary mapping each value to its index in the list. To remove a value in `O(1)`, swap it with the last element of the list, update the swapped element's index, then pop the last element instead of shifting the whole array.

## C# Solution

```csharp
public class RandomizedSet
{
    private readonly List<int> values = new();
    private readonly Dictionary<int, int> indexByValue = new();
    private readonly Random random = new();

    public bool Insert(int val)
    {
        if (indexByValue.ContainsKey(val)) return false;

        indexByValue[val] = values.Count;
        values.Add(val);
        return true;
    }

    public bool Remove(int val)
    {
        if (!indexByValue.TryGetValue(val, out var index)) return false;

        int lastValue = values[^1];
        values[index] = lastValue;
        indexByValue[lastValue] = index;

        values.RemoveAt(values.Count - 1);
        indexByValue.Remove(val);
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
- **Space:** `O(n)` for the list and index map.
