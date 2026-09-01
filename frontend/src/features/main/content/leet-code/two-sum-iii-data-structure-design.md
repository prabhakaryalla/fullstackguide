# 170. Two Sum III - Data Structure Design

**Difficulty:** Easy
**Category:** Array, Hash Table, Design, Two Pointers, Data Stream

## Problem

Design a data structure that supports adding numbers one at a time (`Add(number)`) and, at any point, checking whether any two numbers already added sum to a given `value` (`Find(value)`).

### Example

```
Add(1); Add(3); Add(5);
Find(4) -> true  (1 + 3)
Find(7) -> false
```

## Approach

Maintain a dictionary mapping each added number to how many times it has been added. For `Find(value)`, iterate over the distinct numbers stored: for each number `num`, check whether `value - num` also exists — with the special case that if `num` equals its own complement (`value - num == num`), there must be at least two copies of it stored.

## C# Solution

```csharp
public class TwoSum
{
    private readonly Dictionary<int, int> counts = new();

    public void Add(int number)
    {
        counts[number] = counts.GetValueOrDefault(number) + 1;
    }

    public bool Find(int value)
    {
        foreach (var num in counts.Keys)
        {
            int complement = value - num;

            if (complement == num)
            {
                if (counts[num] > 1) return true;
            }
            else if (counts.ContainsKey(complement))
            {
                return true;
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(1)` for `Add`; `O(n)` for `Find`, where `n` is the number of distinct values stored.
- **Space:** `O(n)` — for the counts dictionary.
