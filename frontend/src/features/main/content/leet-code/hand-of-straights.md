# 846. Hand of Straights

**Difficulty:** Medium
**Category:** Array, Hash Table, Sorting, Greedy, Ordered Map

## Problem

Given an array `hand` of card values and an integer `groupSize`, return `true` if the cards can be rearranged into groups of `groupSize` consecutive values each.

### Example

```
Input: hand = [1,2,3,6,2,3,4,7,8], groupSize = 3
Output: true
```

## Approach

If the total number of cards isn't divisible by `groupSize`, it's immediately impossible. Otherwise, count occurrences of each card value in an ordered map (sorted by value). Repeatedly take the smallest remaining value as the start of a new group, and consume one occurrence each of it and the next `groupSize - 1` consecutive values — if any required value is missing, the arrangement is impossible. Removing exhausted values from the map keeps the "smallest remaining value" lookup efficient.

## C# Solution

```csharp
public class Solution
{
    public bool IsNStraightHand(int[] hand, int groupSize)
    {
        if (hand.Length % groupSize != 0) return false;

        var counts = new SortedDictionary<int, int>();
        foreach (var card in hand)
            counts[card] = counts.GetValueOrDefault(card) + 1;

        while (counts.Count > 0)
        {
            var first = counts.First();
            int start = first.Key;

            for (int i = 0; i < groupSize; i++)
            {
                int card = start + i;

                if (!counts.ContainsKey(card)) return false;

                counts[card]--;
                if (counts[card] == 0) counts.Remove(card);
            }
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the ordered map.
