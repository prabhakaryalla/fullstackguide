# 2682. Find the Losers of the Circular Game

**Difficulty:** Easy
**Category:** Array, Hash Table, Simulation

## Problem

There are `n` friends playing a game in a circular arrangement numbered from `1` to `n`.

The game proceeds as follows:
1. Start at friend `1`.
2. Count `k` friends in the clockwise direction including the friend you started at. The counting wraps around and may count some friends more than once.
3. The last friend counted receives the ball.
4. If a friend receives the ball for the second time, they are out of the game.
5. Repeat from step 2 until all but one friend is out.

Return an array of all friends who lost the game in the order they lost, sorted in ascending order.

### Example

```
Input: n = 5, k = 2
Output: [4,1,5,2]
Explanation:
Pass 1: Start at 1, count 2, friend 2 gets the ball (1st time).
Pass 2: Start at 2, count 2, friend 3 gets the ball (1st time).
Pass 3: Start at 3, count 2, friend 4 gets the ball (1st time).
Pass 4: Start at 4, count 2, friend 5 gets the ball (1st time).
Pass 5: Start at 5, count 2, friend 1 gets the ball (1st time).
Pass 6: Start at 1, count 2, friend 2 gets the ball (2nd time, loses).
... and so on.

Input: n = 4, k = 4
Output: [2,3,4]
```

## Approach

Simulate the game using a set to track who has received the ball once. Continue passing the ball in a circular manner, marking friends who receive it for the second time as losers.

## C# Solution

```csharp
public class Solution
{
    public int[] CircularGameLosers(int n, int k)
    {
        var receivedOnce = new HashSet<int>();
        var losers = new List<int>();
        
        int current = 0;
        int pass = 1;
        
        while (true)
        {
            current = (current + pass * k) % n;
            
            if (receivedOnce.Contains(current))
            {
                losers.Add(current + 1);
                if (losers.Count == n - 1)
                {
                    break;
                }
            }
            else
            {
                receivedOnce.Add(current);
            }
            
            pass++;
        }
        
        var allFriends = new HashSet<int>(Enumerable.Range(1, n));
        foreach (int loser in losers)
        {
            allFriends.Remove(loser);
        }
        
        var result = allFriends.ToList();
        result.AddRange(losers);
        result.Sort();
        result.RemoveAt(result.Count - 1);
        
        return result.ToArray();
    }
}
```

## Complexity

- **Time:** O(n * k)
- **Space:** O(n)
