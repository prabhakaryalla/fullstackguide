# 1236. Web Crawler

**Difficulty:** Medium
**Category:** Depth-First Search, Breadth-First Search, Interactive
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `startUrl` and an `HtmlParser` interface exposing `GetUrls(url)` (the links found on a page), implement a crawler that returns every URL reachable from `startUrl` that shares the same hostname, using any order.

### Example

```
Input: startUrl = "http://news.yahoo.com/news/topics/", 
       urls graph reachable from it (via htmlParser.getUrls)
Output: all "news.yahoo.com" hostname URLs reachable from startUrl
```

## Approach

Extract the hostname once from `startUrl` (the substring after `http://` up to the next `/`). Run a standard breadth-first search: starting from `startUrl`, repeatedly fetch each page's links via `htmlParser.GetUrls`, and enqueue any link whose hostname matches and that hasn't been visited yet. The visited set at the end is the answer.

## C# Solution

```csharp
public class Solution
{
    public IList<string> Crawl(string startUrl, HtmlParser htmlParser)
    {
        string hostname = GetHostname(startUrl);
        var visited = new HashSet<string> { startUrl };
        var queue = new Queue<string>();
        queue.Enqueue(startUrl);

        while (queue.Count > 0)
        {
            string url = queue.Dequeue();
            foreach (string next in htmlParser.GetUrls(url))
            {
                if (GetHostname(next) == hostname && visited.Add(next))
                    queue.Enqueue(next);
            }
        }

        return visited.ToList();
    }

    private string GetHostname(string url)
    {
        string rest = url.Substring("http://".Length);
        int slashIndex = rest.IndexOf('/');
        return slashIndex == -1 ? rest : rest.Substring(0, slashIndex);
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of reachable same-hostname URLs.
- **Space:** `O(n)` for the visited set and queue.
