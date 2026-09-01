# 822. Card Flipping Game

**Difficulty:** Medium
**Category:** Array, Hash Table

## Problem

Each card has a number on its `front` and `back`. You may choose any card and either keep it face up or flip it, then pick a number that is showing on exactly one chosen card and matches no other showing card's number. Return the smallest such "good" number, or `0` if none exists.

### Example

```
Input: fronts = [1,2,4,4,7], backs = [1,3,4,1,3]
Output: 2
```

## Approach

A number can never be a valid answer if it appears on both the front and back of the same card, since that card would always show it no matter how it's flipped. Collect all such "blocked" numbers into a set, then scan every value across all fronts and backs, keeping the minimum value not found in the blocked set.

## C# Solution

```csharp
public class Solution
{
    public int Flipgame(int[] fronts, int[] backs)
    {
        var sameValues = new HashSet<int>();

        for (int i = 0; i < fronts.Length; i++)
        {
            if (fronts[i] == backs[i])
                sameValues.Add(fronts[i]);
        }

        int best = int.MaxValue;

        foreach (var num in fronts.Concat(backs))
        {
            if (!sameValues.Contains(num))
                best = Math.Min(best, num);
        }

        return best == int.MaxValue ? 0 : best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the blocked-value set.
