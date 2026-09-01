# 1521. Find a Value of a Mysterious Function Closest to Target

**Difficulty:** Hard
**Category:** Array, Bit Manipulation, Binary Search

## Problem

Define `func(arr, l, r)` as the bitwise AND of all elements `arr[l..r]`. Given an array `arr` and a `target`, find the minimum possible value of `|func(arr, l, r) - target|` over all valid `(l, r)` pairs.

### Example

```
Input: arr = [9,12,3,7,15], target = 5
Output: 2
```

## Approach

Bitwise AND only ever turns bits off, so as a window's right endpoint extends, the set of distinct AND values ending at that position shrinks or stays the same — there are at most `O(log(max value))` distinct AND results ending at any index. Maintain that small set while scanning left to right: for each new element, AND it with every value from the previous set (plus the element itself), track the minimum absolute difference to `target` across all values ever produced.

## C# Solution

```csharp
public class Solution
{
    public int ClosestToTarget(int[] arr, int target)
    {
        int best = Math.Abs(arr[0] - target);
        var previous = new HashSet<int> { arr[0] };

        foreach (int num in arr)
        {
            var current = new HashSet<int> { num };

            foreach (int prev in previous)
            {
                current.Add(prev & num);
            }

            foreach (int value in current)
            {
                best = Math.Min(best, Math.Abs(value - target));
            }

            previous = current;
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n log(max value))` — each position maintains at most `O(log(max value))` distinct AND results.
- **Space:** `O(log(max value))` for the set of AND values at each step.
