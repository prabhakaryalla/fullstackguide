# 2434. Design a Number Container System

**Difficulty:** Medium
**Category:** Hash Table, Design, Heap (Priority Queue), Ordered Set

## Problem

Design a number container system that can do the following:

- Insert or Replace a number at the given index in the system.
- Return the smallest index for the given number in the system.

Implement the `NumberContainers` class:

- `NumberContainers()` Initializes the number container system.
- `void change(int index, int number)` Fills the container at `index` with the `number`. If there is already a number at that `index`, replace it.
- `int find(int number)` Returns the smallest index for the given `number`, or `-1` if there is no index that is filled by `number` in the system.

### Example

```
Input: ["NumberContainers", "find", "change", "change", "change", "change", "find", "change", "find"]
[[], [10], [2, 10], [1, 10], [3, 10], [5, 10], [10], [1, 20], [10]]
Output: [null, -1, null, null, null, null, 1, null, 2]
```

## Approach

Use two data structures:
- A hash map from index to number
- A hash map from number to a sorted set of indices

## C# Solution

```csharp
public class NumberContainers
{
    private Dictionary<int, int> indexToNumber;
    private Dictionary<int, SortedSet<int>> numberToIndices;

    public NumberContainers()
    {
        indexToNumber = new Dictionary<int, int>();
        numberToIndices = new Dictionary<int, SortedSet<int>>();
    }
    
    public void Change(int index, int number)
    {
        if (indexToNumber.ContainsKey(index))
        {
            int oldNumber = indexToNumber[index];
            numberToIndices[oldNumber].Remove(index);
        }
        
        indexToNumber[index] = number;
        
        if (!numberToIndices.ContainsKey(number))
        {
            numberToIndices[number] = new SortedSet<int>();
        }
        numberToIndices[number].Add(index);
    }
    
    public int Find(int number)
    {
        if (!numberToIndices.ContainsKey(number) || numberToIndices[number].Count == 0)
        {
            return -1;
        }
        
        return numberToIndices[number].Min;
    }
}
```

## Complexity

- **Time:** O(log n) per operation where n is the number of indices for a given number
- **Space:** O(k) where k is the number of unique (index, number) pairs
