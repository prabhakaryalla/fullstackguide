# 3175. Find The First Player to win K Games in a Row

**Difficulty:** Easy
**Category:** Array, Simulation

## Problem
`n` players, numbered by position in an array of skill levels, play a tournament where the first two players compete, the winner (higher skill) stays and plays the next player, and so on. Return the index of the first player who wins `k` games in a row. If no player achieves this, the tournament effectively ends when the strongest overall player has beaten everyone else exactly once each, at which point they are guaranteed to be the answer.

## Approach
Simulate the tournament: keep track of the current champion's index and their consecutive win count. Compare each subsequent player's skill to the champion's; if the challenger has a higher skill, they become the new champion with a win streak reset to 1, otherwise the champion's streak increases by 1. Stop as soon as the streak reaches `k`, or once we've compared against every other player (meaning the current champion is unbeatable and is therefore the answer).

## C# Solution
```csharp
public class Solution {
    public int FindWinningPlayer(int[] skills, int k) {
        int ans = 0;
        int wins = 0;

        for (int i = 1; i < skills.Length && wins < k; i++) {
            if (skills[i] > skills[ans]) {
                ans = i;
                wins = 1;
            } else {
                wins++;
            }
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1)
