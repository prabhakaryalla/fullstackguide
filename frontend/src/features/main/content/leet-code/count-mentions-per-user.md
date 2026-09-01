# 3433. Count Mentions Per User

**Difficulty:** Medium
**Category:** Array, Simulation, Sorting

## Problem

You are given an integer `numberOfUsers` and a list of `events`, where each event is one of:

- `["MESSAGE", timestamp, mentions]`: a message sent at `timestamp`. `mentions` is either `"ALL"` (every user is mentioned), `"HERE"` (every currently **online** user is mentioned), or a space-separated list of tokens like `"id1 id2"` (specific user IDs are mentioned regardless of online status).
- `["OFFLINE", timestamp, userId]`: the given user goes offline and automatically comes back online exactly 60 time units later.

All users start online. If multiple events share the same timestamp, `OFFLINE` events are processed **before** `MESSAGE` events.

Return an array where the `i`-th value is the total number of times user `i` was mentioned.

### Example

`numberOfUsers = 2`, `events = [["OFFLINE","10","0"],["MESSAGE","10","0 1"]]`

At timestamp `10`, user `0` goes offline first, then the message mentions both `0` and `1` by ID (which counts regardless of online status). Result: `[1, 1]`.

## Approach

Sort events by `(timestamp, isOffline ? 0 : 1)` so `OFFLINE` events at the same timestamp are applied first. Track, for each user, the timestamp at which they come back online (`onlineAt[user]`, default `0` meaning always online). Process events in order:

- `OFFLINE`: set `onlineAt[user] = timestamp + 60`.
- `MESSAGE`: if `"ALL"`, increment every user's count; if `"HERE"`, increment counts only for users with `onlineAt[user] <= timestamp`; otherwise, parse each `idX` token and increment that specific user's count.

## C# Solution

```csharp
public class Solution 
{
    public int[] CountMentions(int numberOfUsers, IList<IList<string>> events) 
    {
        int[] mentionCount = new int[numberOfUsers];
        long[] onlineAt = new long[numberOfUsers];

        var sortedEvents = new List<(long timestamp, int typeOrder, IList<string> data)>();
        foreach (var e in events) 
        {
            long timestamp = long.Parse(e[1]);
            int typeOrder = e[0] == "OFFLINE" ? 0 : 1;
            sortedEvents.Add((timestamp, typeOrder, e));
        }
        sortedEvents.Sort((a, b) => 
        {
            if (a.timestamp != b.timestamp) 
            {
                return a.timestamp.CompareTo(b.timestamp);
            }
            return a.typeOrder.CompareTo(b.typeOrder);
        });

        foreach (var (timestamp, typeOrder, data) in sortedEvents) 
        {
            if (data[0] == "OFFLINE") 
            {
                int userId = int.Parse(data[2]);
                onlineAt[userId] = timestamp + 60;
            } 
            else 
            {
                string mentions = data[2];
                if (mentions == "ALL") 
                {
                    for (int u = 0; u < numberOfUsers; u++) 
                    {
                        mentionCount[u]++;
                    }
                } 
                else if (mentions == "HERE") 
                {
                    for (int u = 0; u < numberOfUsers; u++) 
                    {
                        if (onlineAt[u] <= timestamp) 
                        {
                            mentionCount[u]++;
                        }
                    }
                } 
                else 
                {
                    var ids = mentions.Split(' ', StringSplitOptions.RemoveEmptyEntries);
                    foreach (var idToken in ids) 
                    {
                        int userId = int.Parse(idToken.Substring(2));
                        mentionCount[userId]++;
                    }
                }
            }
        }
        return mentionCount;
    }
}
```

## Complexity

- **Time:** O(E log E + E * numberOfUsers) in the worst case (for `ALL`/`HERE` events)
- **Space:** O(numberOfUsers + E)
