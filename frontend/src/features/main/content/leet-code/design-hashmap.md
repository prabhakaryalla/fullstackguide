# 706. Design HashMap

**Difficulty:** Easy
**Category:** Array, Hash Table, Linked List, Design, Hash Function

## Problem

Design a HashMap without using any built-in hash table libraries, supporting `Put(key, value)`, `Get(key)` (returns `-1` if the key doesn't exist), and `Remove(key)`.

### Example

```
Input:
["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"]
[[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]
Output:
[null, null, null, 1, -1, null, 1, null, -1]
```

### Constraints

- `0 <= key, value <= 10^6`
- At most `10^4` calls total.

## Approach

Since keys are bounded to a fixed, moderate range (`0` to `10^6`), use a direct-address array indexed by the key itself, initialized to a sentinel `-1` value representing "absent," giving true `O(1)` operations without needing hashing or collision handling.

## C# Solution

```csharp
public class MyHashMap
{
    private readonly int[] buckets = new int[1_000_001];

    public MyHashMap()
    {
        Array.Fill(buckets, -1);
    }

    public void Put(int key, int value) => buckets[key] = value;

    public int Get(int key) => buckets[key];

    public void Remove(int key) => buckets[key] = -1;
}
```

## Complexity

- **Time:** `O(1)` per operation.
- **Space:** `O(1,000,001)`, a fixed size independent of the number of stored keys.
