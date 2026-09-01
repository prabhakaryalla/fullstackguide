# 2747. Count Zero Request Servers

**Difficulty:** Medium
**Category:** Array, Hash Table, Sorting

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given an integer `n` denoting the total number of servers and a 2D integer array `logs`, where `logs[i] = [server_id, time]` denotes that the server with id `server_id` received a request at time `time`.

You are also given an integer `x` and a 0-indexed integer array `queries`.

Return a 0-indexed integer array `arr` of length `queries.length` where `arr[i]` represents the number of servers that did not receive any requests during the time interval `[queries[i] - x, queries[i]]`.

### Example

```
Input: n = 3, logs = [[1,3],[2,6],[1,5]], x = 5, queries = [10,11]
Output: [1,2]
```

## Approach

Sort logs and queries. For each query, use binary search to find logs in the time range. Track which servers have logs in that range using a set.

## C# Solution

```csharp
public class Solution
{
    public int[] CountServers(int n, int[][] logs, int x, int[] queries)
    {
        int m = queries.Length;
        var result = new int[m];
        
        Array.Sort(logs, (a, b) => a[1].CompareTo(b[1]));
        
        var queryIdx = new List<(int query, int idx)>();
        for (int i = 0; i < m; i++)
        {
            queryIdx.Add((queries[i], i));
        }
        queryIdx.Sort((a, b) => a.query.CompareTo(b.query));
        
        int left = 0, right = 0;
        var serverCount = new Dictionary<int, int>();
        
        foreach (var (query, idx) in queryIdx)
        {
            int start = query - x;
            int end = query;
            
            while (right < logs.Length && logs[right][1] <= end)
            {
                int server = logs[right][0];
                serverCount[server] = serverCount.GetValueOrDefault(server, 0) + 1;
                right++;
            }
            
            while (left < logs.Length && logs[left][1] < start)
            {
                int server = logs[left][0];
                serverCount[server]--;
                if (serverCount[server] == 0)
                {
                    serverCount.Remove(server);
                }
                left++;
            }
            
            result[idx] = n - serverCount.Count;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O((logs.length + m) × log(logs.length))
- **Space:** O(m + n)
