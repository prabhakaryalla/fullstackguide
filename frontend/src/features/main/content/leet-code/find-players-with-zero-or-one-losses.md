# 2225. Find Players With Zero or One Losses

**Difficulty:** Medium
**Category:** Array, Hash Table, Sorting, Counting

## Problem

You are given an integer array `matches` where `matches[i] = [winneri, loseri]` indicates that the player `winneri` defeated player `loseri` in a match.

Return a list `answer` of size 2 where:
- `answer[0]` is a list of all players that have not lost any matches
- `answer[1]` is a list of all players that have lost exactly one match

The values in the two lists should be returned in increasing order.

### Example

```
Input: matches = [[1,3],[2,3],[3,6],[5,6],[5,7],[4,5],[4,8],[4,9],[10,4],[10,9]]
Output: [[1,2,10],[4,5,7,8]]
Explanation:
Players 1, 2, and 10 have not lost any matches.
Players 4, 5, 7, and 8 each lost exactly one match.
```

## Approach

1. Track the number of losses for each player
2. Identify all players who have participated (winners or losers)
3. Filter players with 0 losses and 1 loss
4. Sort and return the results

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> FindWinners(int[][] matches)
    {
        Dictionary<int, int> losses = new Dictionary<int, int>();
        HashSet<int> allPlayers = new HashSet<int>();
        
        foreach (var match in matches)
        {
            int winner = match[0];
            int loser = match[1];
            
            allPlayers.Add(winner);
            allPlayers.Add(loser);
            
            losses[loser] = losses.GetValueOrDefault(loser, 0) + 1;
        }
        
        List<int> zeroLosses = new List<int>();
        List<int> oneLoss = new List<int>();
        
        foreach (int player in allPlayers)
        {
            int lossCount = losses.GetValueOrDefault(player, 0);
            
            if (lossCount == 0)
            {
                zeroLosses.Add(player);
            }
            else if (lossCount == 1)
            {
                oneLoss.Add(player);
            }
        }
        
        zeroLosses.Sort();
        oneLoss.Sort();
        
        return new List<IList<int>> { zeroLosses, oneLoss };
    }
}
```

## Complexity

- **Time:** O(n + m log m), where n is matches and m is unique players
- **Space:** O(m), for tracking players and losses
