# 1242. Web Crawler Multithreaded

**Difficulty:** Medium
**Category:** Concurrency, Interactive
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Same as the single-threaded web crawler (return all URLs sharing the same hostname as `startUrl`, reachable via `htmlParser.GetUrls`), but the crawl should be parallelized across multiple pages at once for speed.

## Approach

Use a thread-safe set (`ConcurrentDictionary` as a set) to track visited URLs so concurrent crawlers never process the same page twice. For each page, fetch its links and spawn a parallel task per unvalidated, same-hostname link, recursively visiting it; wait for all spawned child tasks at each level before returning, ensuring the crawl fully completes before the result is read.

## C# Solution

```csharp
public class Solution
{
    public IList<string> Crawl(string startUrl, HtmlParser htmlParser)
    {
        string hostname = GetHostname(startUrl);
        var visited = new ConcurrentDictionary<string, bool>();
        visited[startUrl] = true;

        Visit(startUrl, hostname, htmlParser, visited);

        return visited.Keys.ToList();
    }

    private void Visit(string url, string hostname, HtmlParser htmlParser, ConcurrentDictionary<string, bool> visited)
    {
        var tasks = new List<Task>();

        foreach (string next in htmlParser.GetUrls(url))
        {
            if (GetHostname(next) == hostname && visited.TryAdd(next, true))
                tasks.Add(Task.Run(() => Visit(next, hostname, htmlParser, visited)));
        }

        Task.WaitAll(tasks.ToArray());
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

- **Time:** `O(n)` page fetches, parallelized across available threads.
- **Space:** `O(n)` for the visited set.
