# 705. Design HashSet

**Difficulty:** Easy
**Category:** Array, Hash Table, Linked List, Design, Hash Function

## Problem

Design a HashSet without using any built-in hash table libraries, supporting `Add(key)`, `Remove(key)`, and `Contains(key)`.

### Example

```
Input:
["MyHashSet", "add", "add", "contains", "contains", "add", "contains", "remove", "contains"]
[[], [1], [2], [1], [3], [2], [2], [2], [2]]
Output:
[null, null, null, true, false, null, true, null, false]
```

### Constraints

- `0 <= key <= 10^6`
- At most `10^4` calls total.

## Approach

Since keys are bounded to a fixed, moderate range (`0` to `10^6`), use a direct-address boolean array indexed by the key itself, giving true `O(1)` operations without needing to implement hashing or collision handling.

## C# Solution

```csharp
public class MyHashSet
{
    private readonly bool[] buckets = new bool[1_000_001];

    public void Add(int key) => buckets[key] = true;

    public void Remove(int key) => buckets[key] = false;

    public bool Contains(int key) => buckets[key];
}
```

## Complexity

- **Time:** `O(1)` per operation.
- **Space:** `O(1,000,001)`, a fixed size independent of the number of stored keys.
