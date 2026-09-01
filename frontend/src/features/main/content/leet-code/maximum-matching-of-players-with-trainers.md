# 2410. Maximum Matching of Players With Trainers

**Difficulty:** Medium
**Category:** Array, Two Pointers, Greedy, Sorting

## Problem

You are given a 0-indexed integer array `players`, where `players[i]` represents the ability of the `i`-th player. You are also given a 0-indexed integer array `trainers`, where `trainers[j]` represents the training capacity of the `j`-th trainer.

The `i`-th player can match with the `j`-th trainer if the player's ability is less than or equal to the trainer's training capacity. Additionally, the `i`-th player can be matched with at most one trainer, and the `j`-th trainer can be matched with at most one player.

Return the maximum number of matchings between players and trainers.

### Example

```
Input: players = [4,7,9], trainers = [8,2,5,8]
Output: 2
Explanation:
- players[0] can be matched with trainers[0] (4 <= 8)
- players[1] cannot be matched with trainers[1] (7 > 2)
- players[1] can be matched with trainers[3] (7 <= 8)
Maximum matchings = 2
```

## Approach

Sort both arrays. Use two pointers: try to match each player with the smallest available trainer that has sufficient capacity. If a match is found, move both pointers forward; otherwise, move only the trainer pointer forward.

## C# Solution

```csharp
public class Solution
{
    public int MatchPlayersAndTrainers(int[] players, int[] trainers)
    {
        Array.Sort(players);
        Array.Sort(trainers);
        
        int matches = 0;
        int j = 0;
        
        for (int i = 0; i < players.Length && j < trainers.Length; i++)
        {
            while (j < trainers.Length && trainers[j] < players[i])
            {
                j++;
            }
            
            if (j < trainers.Length)
            {
                matches++;
                j++;
            }
        }
        
        return matches;
    }
}
```

## Complexity

- **Time:** O(n log n + m log m) where n and m are the lengths of the arrays
- **Space:** O(1) excluding space for sorting
