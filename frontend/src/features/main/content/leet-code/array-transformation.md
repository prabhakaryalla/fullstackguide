# 1243. Array Transformation

**Difficulty:** Easy
**Category:** Array, Simulation
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array, repeatedly apply this transformation until it no longer changes anything: for every interior element that is strictly greater than both its neighbors, decrease it by `1`; for every interior element strictly less than both its neighbors, increase it by `1` (all updates for a round are based on the array's values before that round started). Return the final array.

### Example

```
Input: arr = [6,2,3,4]
Output: [6,3,3,4]
```

## Approach

Simulate the process directly: on each round, build a new array from the current one, checking each interior index against its two neighbors from the *previous* round's values and adjusting by `1` toward them where the strict local peak/valley condition holds. Keep repeating rounds until a full pass produces no changes.

## C# Solution

```csharp
public class Solution
{
    public IList<int> TransformArray(int[] arr)
    {
        var current = (int[])arr.Clone();
        bool changed = true;

        while (changed)
        {
            changed = false;
            var next = (int[])current.Clone();

            for (int i = 1; i < current.Length - 1; i++)
            {
                if (current[i] > current[i - 1] && current[i] > current[i + 1])
                {
                    next[i] = current[i] - 1;
                    changed = true;
                }
                else if (current[i] < current[i - 1] && current[i] < current[i + 1])
                {
                    next[i] = current[i] + 1;
                    changed = true;
                }
            }

            current = next;
        }

        return current;
    }
}
```

## Complexity

- **Time:** `O(n * r)`, where `n` is the array length and `r` is the number of rounds until stability.
- **Space:** `O(n)`.
