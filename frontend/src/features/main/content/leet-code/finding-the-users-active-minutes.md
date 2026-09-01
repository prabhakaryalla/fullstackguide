# 1817. Finding the Users Active Minutes

**Difficulty:** Medium
**Category:** Array, Hash Table

## Problem

Given `logs[i] = [id_i, time_i]` recording that user `id_i` performed some action at (not-necessarily-distinct) minute `time_i`, and an integer `k`, the User Active Minutes (UAM) for a user is the number of unique minutes in which they performed at least one action. Return an array `result` of size `k` where `result[j-1]` is the number of users whose UAM equals `j`.

### Example

```
Input: logs = [[0,5],[1,2],[0,2],[0,5],[1,3]], k = 5
Output: [0,2,0,0,0]
```

## Approach

Group log entries by user id, storing each user's distinct timestamps in a `HashSet<int>`. Each user's UAM is the size of their set. Tally these UAM values into a histogram of size `k` (1-indexed into a 0-indexed array).

## C# Solution

```csharp
public class Solution
{
    public int[] FindingUsersActiveMinutes(int[][] logs, int k)
    {
        var userTimes = new Dictionary<int, HashSet<int>>();

        foreach (var log in logs)
        {
            int id = log[0], time = log[1];
            if (!userTimes.TryGetValue(id, out var set))
            {
                set = new HashSet<int>();
                userTimes[id] = set;
            }
            set.Add(time);
        }

        var result = new int[k];
        foreach (var set in userTimes.Values)
        {
            int uam = set.Count;
            if (uam >= 1 && uam <= k) result[uam - 1]++;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` where `n` is the number of log entries.
- **Space:** `O(n)` for the per-user timestamp sets.
