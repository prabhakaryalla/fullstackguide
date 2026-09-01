# 2660. Determine the Winner of a Bowling Game

**Difficulty:** Easy
**Category:** Array, Simulation

## Problem

You are given two 0-indexed integer arrays `player1` and `player2`, representing the number of pins knocked down by player 1 and player 2 in a bowling game, respectively.

The bowling game consists of `n` turns, and the score of each player is calculated as follows:

- If a player knocks down all 10 pins in a turn (i.e., makes a strike), the value of that turn is 10 plus the number of pins knocked down in the next two turns.
- Otherwise, the value of that turn is simply the number of pins knocked down.

In this problem, if the player knocked down 10 pins in the turn immediately before the current turn or in the turn before that, then the value of the current turn is doubled.

Return `1` if the score of player 1 is greater than player 2, `2` if the score of player 2 is greater than player 1, and `0` if their scores are equal.

### Example

```
Input: player1 = [4,10,7,9], player2 = [6,5,2,3]
Output: 1
Explanation: Player 1's score is 4 + 10 + 14 + 18 = 46 (turn 2 and 3 doubled).
Player 2's score is 6 + 5 + 2 + 3 = 16.
```

## Approach

Calculate each player's score by iterating through their turns. Check if the previous turn or the turn before that was a 10 to determine if doubling applies. Compare the final scores.

## C# Solution

```csharp
public class Solution
{
    public int IsWinner(int[] player1, int[] player2)
    {
        int score1 = CalculateScore(player1);
        int score2 = CalculateScore(player2);
        
        if (score1 > score2)
            return 1;
        if (score2 > score1)
            return 2;
        return 0;
    }
    
    private int CalculateScore(int[] player)
    {
        int score = 0;
        
        for (int i = 0; i < player.Length; i++)
        {
            bool doubled = (i > 0 && player[i - 1] == 10) || (i > 1 && player[i - 2] == 10);
            score += player[i] * (doubled ? 2 : 1);
        }
        
        return score;
    }
}
```

## Complexity

- **Time:** O(n) — single pass through both arrays
- **Space:** O(1) — constant extra space
