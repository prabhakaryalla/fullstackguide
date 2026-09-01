# 1217. Minimum Cost to Move Chips to The Same Position

**Difficulty:** Easy
**Category:** Array, Math, Greedy

## Problem

There are chips at given positions on the x-axis. Moving a chip by `2` positions is free, but moving it by `1` position costs `1`. Return the minimum total cost to move all chips to the same position.

### Example

```
Input: position = [1,2,3]
Output: 1
```

## Approach

Free moves of `2` let any chip slide to any other position with the same parity at no cost, so every chip effectively collapses to one of two "buckets": even positions or odd positions. Moving all chips into a single bucket is free; the only cost is bridging the one chip left in the other (smaller) bucket, one unit at a time. The answer is simply the smaller of the even-position count and the odd-position count.

## C# Solution

```csharp
public class Solution
{
    public int MinCostToMoveChips(int[] position)
    {
        int evenCount = 0, oddCount = 0;

        foreach (int p in position)
        {
            if (p % 2 == 0) evenCount++;
            else oddCount++;
        }

        return Math.Min(evenCount, oddCount);
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of chips.
- **Space:** `O(1)`.
