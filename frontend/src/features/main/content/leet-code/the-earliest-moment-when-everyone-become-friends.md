# 1101. The Earliest Moment When Everyone Become Friends

**Difficulty:** Medium
**Category:** Array, Union Find, Sorting

## Problem

There are `n` people numbered `0` to `n - 1`. Given `logs[i] = [timestamp, x, y]` meaning `x` and `y` became friends at `timestamp`, return the earliest timestamp at which every person is connected to every other person through some chain of friendships, or `-1` if it never happens.

### Example

```
Input: logs = [[20190101,0,1],[20190104,3,4],[20190107,2,3],[20190211,1,5],[20190224,2,4],[20190301,0,3],[20190312,1,2],[20190322,4,5]], n = 6
Output: 20190301
```

## Approach

Sort the logs by timestamp, then process them in order with a union-find structure, merging the components of `x` and `y` for each log. Track the number of remaining connected components; as soon as a union reduces the count to `1`, that log's timestamp is the answer. If the logs run out first, return `-1`.

## C# Solution

```csharp
public class Solution
{
    public int EarliestAcq(int[][] logs, int n)
    {
        Array.Sort(logs, (a, b) => a[0].CompareTo(b[0]));
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        int components = n;

        int Find(int x) => parent[x] == x ? x : (parent[x] = Find(parent[x]));

        foreach (var log in logs)
        {
            int time = log[0], a = Find(log[1]), b = Find(log[2]);
            if (a != b)
            {
                parent[a] = b;
                components--;
                if (components == 1) return time;
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(m log m + m·α(n))`, where `m` is the number of logs.
- **Space:** `O(n)` for the union-find structure.
