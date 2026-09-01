# 355. Design Twitter

**Difficulty:** Medium
**Category:** Hash Table, Linked List, Design, Heap

## Problem

Design a simplified version of Twitter with `PostTweet(userId, tweetId)`, `GetNewsFeed(userId)` (the 10 most recent tweet ids in the user's news feed, from users they follow and themselves), `Follow(followerId, followeeId)`, and `Unfollow(followerId, followeeId)`.

### Example

```
Input:
["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]
[[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]
Output:
[null, null, [5], null, null, [6, 5], null, [5]]
```

### Constraints

- `1 <= userId, followerId, followeeId <= 500`
- `0 <= tweetId <= 10^4`
- At most `3 * 10^4` calls will be made to the four methods.

## Approach

Store each user's tweets as a list of `(timestamp, tweetId)` pairs, and each user's followees in a hash set. `GetNewsFeed` gathers the tweets of the user plus all followees, sorts them by timestamp descending, and takes the first 10.

## C# Solution

```csharp
public class Twitter
{
    private int timestamp = 0;
    private readonly Dictionary<int, List<(int Time, int TweetId)>> tweetsByUser = new();
    private readonly Dictionary<int, HashSet<int>> followeesByUser = new();

    public void PostTweet(int userId, int tweetId)
    {
        if (!tweetsByUser.TryGetValue(userId, out var tweets))
        {
            tweets = new List<(int, int)>();
            tweetsByUser[userId] = tweets;
        }

        tweets.Add((timestamp++, tweetId));
    }

    public IList<int> GetNewsFeed(int userId)
    {
        var candidates = new List<(int Time, int TweetId)>();

        if (tweetsByUser.TryGetValue(userId, out var own))
            candidates.AddRange(own);

        if (followeesByUser.TryGetValue(userId, out var followees))
        {
            foreach (var followee in followees)
            {
                if (tweetsByUser.TryGetValue(followee, out var tweets))
                    candidates.AddRange(tweets);
            }
        }

        return candidates
            .OrderByDescending(t => t.Time)
            .Take(10)
            .Select(t => t.TweetId)
            .ToList();
    }

    public void Follow(int followerId, int followeeId)
    {
        if (followerId == followeeId) return;

        if (!followeesByUser.TryGetValue(followerId, out var followees))
        {
            followees = new HashSet<int>();
            followeesByUser[followerId] = followees;
        }

        followees.Add(followeeId);
    }

    public void Unfollow(int followerId, int followeeId)
    {
        if (followeesByUser.TryGetValue(followerId, out var followees))
            followees.Remove(followeeId);
    }
}
```

## Complexity

- **Time:** `O(1)` for `PostTweet`, `Follow`, and `Unfollow`; `O(k log k)` for `GetNewsFeed`, where `k` is the total tweets from the user and followees.
- **Space:** `O(n)` for stored tweets and follow relationships.
