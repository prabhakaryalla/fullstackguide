# 2447. Most Popular Video Creator

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Sorting, Heap (Priority Queue)

## Problem

You are given two string arrays `creators` and `ids`, and an integer array `views`, all of the same length. The `i`-th video was made by `creators[i]`, has an id of `ids[i]`, and has `views[i]` views.

A creator's popularity is the sum of views across all of their videos. For each creator with the highest popularity, find the id of their most viewed video. If multiple videos have the highest view count, return the lexicographically smallest id.

Return a list of `[creator, id]` pairs for each creator with maximum popularity.

### Example

```
Input: creators = ["alice","bob","alice","chris"], ids = ["one","two","three","four"], views = [5,10,5,4]
Output: [["alice","one"],["bob","two"]]
Explanation: Alice's popularity = 5 + 5 = 10. Bob's popularity = 10. They are tied for highest.
Alice's most viewed video is "one" and "three" both with 5 views. "one" is lexicographically smaller.
Bob's most viewed video is "two" with 10 views.
```

## Approach

Use a hash map to track each creator's total views and their best video (highest views, lexicographically smallest id). Find the maximum popularity, then collect all creators with that popularity.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<string>> MostPopularCreator(string[] creators, string[] ids, int[] views)
    {
        var creatorStats = new Dictionary<string, (long totalViews, int maxViews, string bestId)>();
        
        for (int i = 0; i < creators.Length; i++)
        {
            string creator = creators[i];
            string id = ids[i];
            int view = views[i];
            
            if (!creatorStats.ContainsKey(creator))
            {
                creatorStats[creator] = (0, -1, "");
            }
            
            var stats = creatorStats[creator];
            stats.totalViews += view;
            
            if (view > stats.maxViews || (view == stats.maxViews && string.Compare(id, stats.bestId) < 0))
            {
                stats.maxViews = view;
                stats.bestId = id;
            }
            
            creatorStats[creator] = stats;
        }
        
        long maxPopularity = creatorStats.Values.Max(s => s.totalViews);
        
        var result = new List<IList<string>>();
        foreach (var kvp in creatorStats)
        {
            if (kvp.Value.totalViews == maxPopularity)
            {
                result.Add(new List<string> { kvp.Key, kvp.Value.bestId });
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of videos
- **Space:** O(k) where k is the number of unique creators
