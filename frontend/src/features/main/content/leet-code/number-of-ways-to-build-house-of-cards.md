# 2189. Number of Ways to Build House of Cards

**Difficulty:** Medium
**Category:** Dynamic Programming, Backtracking
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given an integer `n` representing the number of playing cards you have. A house of cards meets the following conditions:

- The house consists of one or more rows
- Each row has a number of triangular "rooms"
- The first row has some number of rooms
- Each subsequent row has one less room than the previous row
- Each triangular room requires 2 cards
- The base of each room (except the first row) requires 1 card

Return the number of distinct house of cards structures that can be built using exactly `n` cards.

### Example

```
Input: n = 16
Output: 2
Explanation: Two possible structures using exactly 16 cards.
```

## Approach

Use dynamic programming with backtracking. For each possible first row size, recursively try to build subsequent rows.

A row with k rooms requires:
- 2k cards for the triangular rooms
- (k-1) cards for the base (horizontal cards between rooms)
- Total: 3k - 1 cards

For the first row, we don't need the base, so it's 2k cards.

Recursively try all possible row sizes and count valid complete structures.

## C# Solution

```csharp
public class Solution
{
    private Dictionary<(int, int), int> memo;
    
    public int HouseOfCards(int n)
    {
        memo = new Dictionary<(int, int), int>();
        return CountWays(n, -1);
    }
    
    private int CountWays(int remaining, int prevRowSize)
    {
        if (remaining == 0) return 1;
        if (remaining < 0) return 0;
        
        var key = (remaining, prevRowSize);
        if (memo.ContainsKey(key)) return memo[key];
        
        int count = 0;
        int maxRooms = prevRowSize == -1 ? remaining / 2 : prevRowSize - 1;
        
        for (int rooms = 1; rooms <= maxRooms; rooms++)
        {
            int cardsNeeded;
            if (prevRowSize == -1)
            {
                // First row
                cardsNeeded = 2 * rooms;
            }
            else
            {
                // Subsequent rows
                cardsNeeded = 3 * rooms - 1;
            }
            
            if (cardsNeeded <= remaining)
            {
                count += CountWays(remaining - cardsNeeded, rooms);
            }
        }
        
        memo[key] = count;
        return count;
    }
}
```

## Complexity

- **Time:** O(n^2), with memoization
- **Space:** O(n^2), for the memoization cache
