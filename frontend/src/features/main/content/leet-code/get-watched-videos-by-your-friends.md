# 1311. Get Watched Videos by Your Friends

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Breadth-First Search

## Problem

Given `watchedVideos` (each person's list of watched videos) and a `friends` adjacency list, return the videos watched by people exactly `level` friends away from `id`, sorted first by frequency of occurrence and then alphabetically.

### Example

```
Input: watchedVideos = [["A","B"],["C"],["B","C"],["D"]], friends = [[1,2],[0,3],[0,3],[1,2]], id = 0, level = 1
Output: ["B","C"]
```

## Approach

Run a breadth-first search from `id`, tracking visited nodes, until reaching exactly the people at distance `level`. Collect every video watched by those people into a frequency map, then sort the distinct titles by ascending frequency and, for ties, alphabetically.

## C# Solution

```csharp
public class Solution
{
    public IList<string> WatchedVideosByFriends(IList<IList<string>> watchedVideos, int[][] friends, int id, int level)
    {
        int n = friends.Length;
        var visited = new bool[n];
        visited[id] = true;
        var queue = new Queue<int>();
        queue.Enqueue(id);
        int currentLevel = 0;

        while (queue.Count > 0 && currentLevel < level)
        {
            int size = queue.Count;
            for (int i = 0; i < size; i++)
            {
                int person = queue.Dequeue();
                foreach (int friend in friends[person])
                {
                    if (!visited[friend])
                    {
                        visited[friend] = true;
                        queue.Enqueue(friend);
                    }
                }
            }
            currentLevel++;
        }

        var freq = new Dictionary<string, int>();
        foreach (int person in queue)
        {
            foreach (var video in watchedVideos[person])
            {
                freq[video] = freq.GetValueOrDefault(video, 0) + 1;
            }
        }

        var titles = new List<string>(freq.Keys);
        titles.Sort((a, b) => freq[a] != freq[b] ? freq[a] - freq[b] : string.CompareOrdinal(a, b));

        return titles;
    }
}
```

## Complexity

- **Time:** `O(V + E + k log k)` where `k` is the number of distinct videos at the target level.
- **Space:** `O(V + k)`.
