# 432. All O`one Data Structure

**Difficulty:** Hard
**Category:** Design, Hash Table, Linked List, Doubly-Linked List

## Problem

Design a data structure to store strings' counts with the ability to increment/decrement a key's count and, in `O(1)` time, retrieve a key with the maximum and minimum counts. Implement `Inc(key)`, `Dec(key)`, `GetMaxKey()`, and `GetMinKey()`.

### Example

```
Input:
["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey"]
[[], ["hello"], ["hello"], [], [], ["leet"], [], []]
Output:
[null, null, null, "hello", "hello", null, "hello", "leet"]
```

### Constraints

- `1 <= key.length <= 10`
- `key` consists of lowercase English letters.
- At most `5 * 10^4` calls total will be made to `Inc`, `Dec`, `GetMaxKey`, and `GetMinKey`.

## Approach

Maintain a doubly linked list of "buckets," each holding a distinct count value and the set of keys currently at that count, always kept sorted by count. A key's `Inc`/`Dec` moves it from its current bucket to the adjacent bucket for `count ± 1`, creating that neighboring bucket if it doesn't already exist and removing the original bucket if it becomes empty. The minimum and maximum keys are then simply members of the buckets at the head and tail of the list.

## C# Solution

```csharp
public class AllOne
{
    private class Bucket
    {
        public int Count;
        public HashSet<string> Keys = new();
        public Bucket Prev, Next;
    }

    private readonly Dictionary<string, Bucket> bucketByKey = new();
    private readonly Bucket head = new();
    private readonly Bucket tail = new();

    public AllOne()
    {
        head.Next = tail;
        tail.Prev = head;
    }

    public void Inc(string key)
    {
        if (!bucketByKey.TryGetValue(key, out var bucket))
        {
            if (head.Next.Count != 1)
                InsertAfter(head, new Bucket { Count = 1 });

            head.Next.Keys.Add(key);
            bucketByKey[key] = head.Next;
            return;
        }

        var next = bucket.Next;
        if (next == tail || next.Count != bucket.Count + 1)
            next = InsertAfter(bucket, new Bucket { Count = bucket.Count + 1 });

        next.Keys.Add(key);
        bucketByKey[key] = next;

        bucket.Keys.Remove(key);
        if (bucket.Keys.Count == 0) Remove(bucket);
    }

    public void Dec(string key)
    {
        var bucket = bucketByKey[key];

        if (bucket.Count == 1)
        {
            bucketByKey.Remove(key);
        }
        else
        {
            var prev = bucket.Prev;
            if (prev == head || prev.Count != bucket.Count - 1)
                prev = InsertAfter(bucket.Prev, new Bucket { Count = bucket.Count - 1 });

            prev.Keys.Add(key);
            bucketByKey[key] = prev;
        }

        bucket.Keys.Remove(key);
        if (bucket.Keys.Count == 0) Remove(bucket);
    }

    public string GetMaxKey()
    {
        return tail.Prev == head ? "" : tail.Prev.Keys.First();
    }

    public string GetMinKey()
    {
        return head.Next == tail ? "" : head.Next.Keys.First();
    }

    private Bucket InsertAfter(Bucket node, Bucket newBucket)
    {
        var next = node.Next;
        node.Next = newBucket;
        newBucket.Prev = node;
        newBucket.Next = next;
        next.Prev = newBucket;
        return newBucket;
    }

    private void Remove(Bucket bucket)
    {
        bucket.Prev.Next = bucket.Next;
        bucket.Next.Prev = bucket.Prev;
    }
}
```

## Complexity

- **Time:** `O(1)` average for all four operations.
- **Space:** `O(n)` for the buckets and key map.
