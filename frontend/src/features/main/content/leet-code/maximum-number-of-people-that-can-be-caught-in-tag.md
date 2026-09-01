# 1989. Maximum Number of People That Can Be Caught in Tag

**Difficulty:** Medium
**Category:** Array, Greedy, Two Pointers
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a binary string-like array `team` (`1` for taggers, `0` for regular players) and an integer `dist`, each tagger can catch at most one untagged player within `dist` positions of them (and each player can be caught by at most one tagger). Return the maximum number of players that can be caught.

### Example

```
Input: team = [0,1,0,1,0], dist = 3
Output: 2
Explanation: Both taggers (indices 1 and 3) can each catch a nearby untagged player.
```

### Constraints

- `1 <= team.length <= 10^5`
- `0 <= dist <= team.length`
- `team[i]` is `0` or `1`.

## Approach

Use a two-pointer greedy sweep: iterate over taggers in order, and for each tagger try to match it with the earliest not-yet-caught player within its catch range `[taggerIndex - dist, taggerIndex + dist]`. Maintain a pointer over player indices that only moves forward, so once a player is considered (either matched or skipped as out of range on the left) it is never revisited: advance the player pointer past any player index that is too far to the left of the current tagger, then if the next available player index is within `dist` to the right as well, match it (increment caught count and advance the player pointer); otherwise this tagger catches no one.

## C# Solution

```csharp
public class Solution
{
    public int CatchMaximumAmountofPeople(int[] team, int dist)
    {
        int n = team.Length;
        var taggers = new List<int>();
        var players = new List<int>();

        for (int i = 0; i < n; i++)
        {
            if (team[i] == 1) taggers.Add(i);
            else players.Add(i);
        }

        int caught = 0;
        int playerPtr = 0;

        foreach (int tagger in taggers)
        {
            while (playerPtr < players.Count && players[playerPtr] < tagger - dist)
            {
                playerPtr++;
            }

            if (playerPtr < players.Count && players[playerPtr] <= tagger + dist)
            {
                caught++;
                playerPtr++;
            }
        }

        return caught;
    }
}
```

## Complexity

- **Time:** `O(n)` — each tagger and player index is processed a constant number of times.
- **Space:** `O(n)` for the taggers and players lists.
