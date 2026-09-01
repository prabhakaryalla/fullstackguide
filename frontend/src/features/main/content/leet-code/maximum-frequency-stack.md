# 895. Maximum Frequency Stack

**Difficulty:** Hard
**Category:** Array, Hash Table, Stack, Design, Ordered Set

## Problem

Design a stack-like data structure `FreqStack` where `Pop()` removes and returns the most frequently occurring element pushed so far; if there's a tie, the most recently pushed among the tied elements is removed.

### Example

```
Input:
["FreqStack", "push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop"]
[[], [5], [7], [5], [7], [4], [5], [], [], [], []]
Output:
[null, null, null, null, null, null, null, 5, 7, 5, 4]
```

## Approach

Track each value's current frequency in a map, and maintain a separate stack of values for every frequency level (a "group" of values that have been pushed exactly that many times so far). Pushing a value increments its frequency and pushes it onto the stack for its new frequency level, updating the running maximum frequency. Popping always removes from the stack at the current maximum frequency level (naturally respecting most-recent-first order within that level via the stack itself), decrements that value's frequency, and drops the maximum frequency level if its stack becomes empty.

## C# Solution

```csharp
public class FreqStack
{
    private readonly Dictionary<int, int> freq = new();
    private readonly Dictionary<int, Stack<int>> group = new();
    private int maxFreq = 0;

    public void Push(int val)
    {
        int f = freq.GetValueOrDefault(val) + 1;
        freq[val] = f;

        maxFreq = Math.Max(maxFreq, f);

        if (!group.ContainsKey(f))
            group[f] = new Stack<int>();

        group[f].Push(val);
    }

    public int Pop()
    {
        int val = group[maxFreq].Pop();
        freq[val]--;

        if (group[maxFreq].Count == 0)
            maxFreq--;

        return val;
    }
}
```

## Complexity

- **Time:** `O(1)` per operation.
- **Space:** `O(n)` for the frequency map and group stacks.
