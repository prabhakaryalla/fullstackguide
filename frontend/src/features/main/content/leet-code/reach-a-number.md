# 754. Reach a Number

**Difficulty:** Medium
**Category:** Math, Binary Search

## Problem

Starting at position `0` on an infinite number line, on the `i`-th move you may move either left or right by exactly `i` units. Given an integer `target`, return the minimum number of moves required to reach exactly `target`.

### Example

```
Input: target = 2
Output: 3
```

## Approach

By symmetry, only the absolute value of `target` matters. Keep taking steps `1, 2, 3, ...` and accumulating the sum until the running sum is at least `target` and the difference `sum - target` is even. The evenness condition matters because flipping any single step from `+i` to `-i` changes the total sum by `2i` (an even number), so the parity of `sum - target` must be even for some subset of sign flips to exactly cancel the excess.

## C# Solution

```csharp
public class Solution
{
    public int ReachNumber(int target)
    {
        target = Math.Abs(target);
        int steps = 0;
        int sum = 0;

        while (sum < target || (sum - target) % 2 != 0)
        {
            steps++;
            sum += steps;
        }

        return steps;
    }
}
```

## Complexity

- **Time:** `O(sqrt(target))`.
- **Space:** `O(1)`.
