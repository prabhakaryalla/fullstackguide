# 379. Design Phone Directory

**Difficulty:** Medium
**Category:** Array, Hash Table, Design, Queue
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Design a phone directory that manages a set of `maxNumbers` phone numbers. Implement `Get()` (provides an available number, or `-1` if none), `Check(number)` (returns whether a number is available), and `Release(number)` (recycles a number back to being available).

### Example

```
Input:
["PhoneDirectory", "get", "get", "check", "get", "check", "release", "check"]
[[3], [], [], [2], [], [2], [2], [2]]
Output:
[null, 0, 1, true, 2, false, null, true]
```

### Constraints

- `1 <= maxNumbers <= 2 * 10^4`
- At most `2 * 10^4` calls total to `Get`, `Check`, and `Release`.

## Approach

Track availability with a boolean array plus a queue pre-seeded with every number from `0` to `maxNumbers - 1`. `Get` dequeues candidates until it finds one still marked available, assigns it, and returns it; `Release` marks a number available again and re-enqueues it so it can be reused; `Check` is a direct array lookup.

## C# Solution

```csharp
public class PhoneDirectory
{
    private readonly bool[] used;
    private readonly Queue<int> available = new();

    public PhoneDirectory(int maxNumbers)
    {
        used = new bool[maxNumbers];
        for (int i = 0; i < maxNumbers; i++)
            available.Enqueue(i);
    }

    public int Get()
    {
        while (available.Count > 0)
        {
            int number = available.Dequeue();
            if (!used[number])
            {
                used[number] = true;
                return number;
            }
        }

        return -1;
    }

    public bool Check(int number)
    {
        return number >= 0 && number < used.Length && !used[number];
    }

    public void Release(int number)
    {
        if (number < 0 || number >= used.Length || !used[number]) return;

        used[number] = false;
        available.Enqueue(number);
    }
}
```

## Complexity

- **Time:** `O(1)` amortized per call.
- **Space:** `O(maxNumbers)`.
