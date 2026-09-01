# 2260. Minimum Consecutive Cards to Pick Up

**Difficulty:** Medium
**Category:** Array, Hash Table, Sliding Window

## Problem

You are given an integer array `cards` where `cards[i]` represents the value of the `i`-th card. A pair of cards are matching if the cards have the same value.

Return the minimum number of consecutive cards you need to pick up to have a matching pair. If it is impossible to have matching pairs, return `-1`.

### Example

```
Input: cards = [3,4,2,3,4,7]
Output: 4
Explanation: Pick cards from index 0 to 3: [3,4,2,3]. The pair at indices 0 and 3 matches.
```

## Approach

Use a hash map to track the last seen index of each card value. When you see a card you've seen before, calculate the distance and update the minimum. This gives the minimum window containing a matching pair.

## C# Solution

```csharp
public class Solution
{
    public int MinimumCardPickup(int[] cards)
    {
        Dictionary<int, int> lastSeen = new Dictionary<int, int>();
        int minLen = int.MaxValue;
        
        for (int i = 0; i < cards.Length; i++)
        {
            if (lastSeen.ContainsKey(cards[i]))
            {
                minLen = Math.Min(minLen, i - lastSeen[cards[i]] + 1);
            }
            lastSeen[cards[i]] = i;
        }
        
        return minLen == int.MaxValue ? -1 : minLen;
    }
}
```

## Complexity

- **Time:** O(n).
- **Space:** O(n) for the hash map.
