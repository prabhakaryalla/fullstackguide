# 1348. Tweet Counts Per Frequency

**Difficulty:** Medium
**Category:** Array, Hash Table, Design, Binary Search, Sorting

## Problem

Design a system that records tweets by name and time, and can query the number of tweets for a name in `[startTime, endTime]`, bucketed by `"minute"` (60s), `"hour"` (3600s), or `"day"` (86400s) intervals.

### Example

```
Input: ["TweetCounts","recordTweet","recordTweet","recordTweet","getTweetCountsPerFrequency","getTweetCountsPerFrequency"]
[[],["tweet3",0],["tweet3",60],["tweet3",10],["minute",0,59],["minute",0,60]]
Output: [null,null,null,null,[2],[2,1]]
```

## Approach

Store each name's tweet timestamps in a sorted list. To answer a query, compute the bucket size from the frequency string, then iterate over each bucket boundary within `[startTime, endTime]`, using binary search on the sorted timestamp list to count how many timestamps fall inside that bucket.

## C# Solution

```csharp
public class TweetCounts
{
    private readonly Dictionary<string, List<int>> tweets = new();

    public void RecordTweet(string tweetName, int time)
    {
        if (!tweets.ContainsKey(tweetName)) tweets[tweetName] = new List<int>();

        var list = tweets[tweetName];
        int idx = list.BinarySearch(time);
        if (idx < 0) idx = ~idx;
        list.Insert(idx, time);
    }

    public IList<int> GetTweetCountsPerFrequency(string freq, string tweetName, int startTime, int endTime)
    {
        int bucketSize = freq == "minute" ? 60 : freq == "hour" ? 3600 : 86400;
        int buckets = (endTime - startTime) / bucketSize + 1;
        var result = new int[buckets];

        if (!tweets.ContainsKey(tweetName)) return result;

        var list = tweets[tweetName];
        int lo = LowerBound(list, startTime);

        for (int i = lo; i < list.Count && list[i] <= endTime; i++)
        {
            int bucket = (list[i] - startTime) / bucketSize;
            result[bucket]++;
        }

        return result;
    }

    private int LowerBound(List<int> list, int value)
    {
        int lo = 0, hi = list.Count;
        while (lo < hi)
        {
            int mid = (lo + hi) / 2;
            if (list[mid] < value) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
```

## Complexity

- **Time:** `O(log n)` per record, `O(log n + buckets + k)` per query.
- **Space:** `O(n)` for stored tweet times.
