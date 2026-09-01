# 900. RLE Iterator

**Difficulty:** Medium
**Category:** Design, Array, Counting, Iterator

## Problem

Design an iterator over a run-length encoded sequence, given as pairs `[count, value]` flattened into a single array. Implement `Next(n)`, which exhausts the next `n` elements of the decoded sequence and returns the last element exhausted, or `-1` if fewer than `n` elements remain.

### Example

```
Input:
["RLEIterator", "next", "next", "next", "next"]
[[[3, 8, 0, 9]], [2], [1], [1], [2]]
Output:
[null, 8, 8, 0, -1]
```

## Approach

Track a pointer into the encoding array (pointing at the current `[count, value]` pair) and the remaining count at that pointer. For each `Next(n)` call, consume from the current pair as much as possible: if enough remain in the current pair, subtract `n` and return that pair's value; otherwise, subtract the current pair's remaining count from `n` and advance to the next pair, repeating until `n` is satisfied or the encoding is exhausted.

## C# Solution

```csharp
public class RLEIterator
{
    private readonly int[] encoding;
    private int index = 0;
    private int remaining = 0;

    public RLEIterator(int[] encoding)
    {
        this.encoding = encoding;
        if (encoding.Length > 0)
            remaining = encoding[0];
    }

    public int Next(int n)
    {
        while (index < encoding.Length)
        {
            if (remaining >= n)
            {
                remaining -= n;
                return encoding[index + 1];
            }

            n -= remaining;
            index += 2;

            if (index < encoding.Length)
                remaining = encoding[index];
        }

        return -1;
    }
}
```

## Complexity

- **Time:** Amortized `O(1)` per `Next` call across the lifetime of the iterator.
- **Space:** `O(1)` extra, beyond the input encoding.
