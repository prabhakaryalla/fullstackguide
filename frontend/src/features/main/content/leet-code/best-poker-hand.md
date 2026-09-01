# 2347. Best Poker Hand

**Difficulty:** Easy
**Category:** Array, Hash Table, Counting

## Problem

You are given an integer array `ranks` and a character array `suits`. You have `5` cards where the `i-th` card has a rank of `ranks[i]` and a suit of `suits[i]`.

The following are the types of poker hands you can make from best to worst:

1. "Flush": Five cards of the same suit.
2. "Three of a Kind": Three cards of the same rank.
3. "Pair": Two cards of the same rank.
4. "High Card": Any single card.

Return a string representing the best type of poker hand you can make with the given cards.

### Example

```
Input: ranks = [13,2,3,1,9], suits = ["a","a","a","a","a"]
Output: "Flush"
```

## Approach

Check conditions in order from best to worst: first check if all suits are the same (flush), then check maximum rank frequency for three of a kind or pair.

## C# Solution

```csharp
public class Solution
{
    public string BestHand(int[] ranks, char[] suits)
    {
        var suitSet = new HashSet<char>(suits);
        if (suitSet.Count == 1)
            return "Flush";
        
        var rankCount = new Dictionary<int, int>();
        foreach (int rank in ranks)
        {
            if (!rankCount.ContainsKey(rank))
                rankCount[rank] = 0;
            rankCount[rank]++;
        }
        
        int maxCount = rankCount.Values.Max();
        
        if (maxCount >= 3)
            return "Three of a Kind";
        if (maxCount == 2)
            return "Pair";
        
        return "High Card";
    }
}
```

## Complexity

- **Time:** O(1) since we always process exactly 5 cards
- **Space:** O(1)
