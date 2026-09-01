# 3664. Two Letter Card Game

**Difficulty:** Easy
**Category:** Array, Hash Table, String, Counting, Sorting

## Problem
You are given a list of two-letter strings `cards`, where each card contains exactly two distinct (or possibly equal) uppercase/lowercase letters, and a character `x`. In one round of the game you may pick any number of cards that all contain the letter `x`, and score one point per selected card, but you may not select more cards containing `x` than the number of cards not containing `x` that you also discard/set aside in that round (a balance constraint from the original game rules). Determine the maximum number of cards containing the letter `x` that can be selected/scored, subject to the constraint that the count of selected cards containing `x` cannot exceed the number of remaining cards that do not contain `x`. Return this maximum count.

## Approach
Count `countWithX`, the number of cards that contain the character `x`, and `countWithoutX`, the number of cards that do not contain `x`. Since you can score at most one point per card containing `x`, but the total scored cannot exceed the count of cards not containing `x` (the balancing constraint), the answer is `min(countWithX, countWithoutX)`.

## C# Solution

```csharp
public class Solution 
{
    public int ScoreOfCards(string[] cards, char x) 
    {
        int countWithX = 0;
        int countWithoutX = 0;

        foreach (var card in cards)
        {
            if (card.Length >= 1 && (card[0] == x || (card.Length > 1 && card[1] == x)))
            {
                countWithX++;
            }
            else
            {
                countWithoutX++;
            }
        }

        return Math.Min(countWithX, countWithoutX);
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of cards
- **Space:** O(1)
