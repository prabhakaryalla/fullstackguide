# 1753. Maximum Score From Removing Stones

**Difficulty:** Medium
**Category:** Math, Greedy

## Problem

You have three piles of stones with `a`, `b`, and `c` stones. In one move, choose two different non-empty piles and remove one stone from each, scoring one point. Return the maximum score achievable.

### Example

```
Input: a = 2, b = 4, c = 6
Output: 6
```

## Approach

Always take from the two currently largest piles — this is always optimal. If the largest pile is at least the sum of the other two, you can only ever pair the smaller two piles against it, so the answer is the sum of the two smaller piles. Otherwise, the piles can be paired down until at most one stone remains, giving `sum / 2` (integer division).

## C# Solution

```csharp
public class Solution
{
    public int MaximumScore(int a, int b, int c)
    {
        int[] piles = { a, b, c };
        Array.Sort(piles);

        if (piles[2] >= piles[0] + piles[1]) return piles[0] + piles[1];
        return (piles[0] + piles[1] + piles[2]) / 2;
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
