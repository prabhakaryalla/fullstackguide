# 2424. Longest Uploaded Prefix

**Difficulty:** Medium
**Category:** Design, Binary Indexed Tree, Segment Tree, Binary Search, Heap (Priority Queue), Ordered Set

## Problem

You are given a stream of `n` videos, each represented by a distinct number from `1` to `n` that you need to "upload" to a server. You need to implement a data structure that calculates the length of the longest uploaded prefix at various points in the upload process.

We consider `i` to be an uploaded prefix if all videos in the range `1` to `i` (inclusive) have been uploaded to the server. The longest uploaded prefix is the maximum value of `i` that satisfies this definition.

Implement the `LUPrefix` class:
- `LUPrefix(int n)` Initializes the object for a stream of `n` videos.
- `void upload(int video)` Uploads video number `video` to the server.
- `int longest()` Returns the length of the longest uploaded prefix defined above.

### Example

```
Input: ["LUPrefix", "upload", "longest", "upload", "longest", "upload", "longest"]
      [[4], [3], [], [1], [], [2], []]
Output: [null, null, 0, null, 1, null, 3]
Explanation:
LUPrefix server = new LUPrefix(4);
server.upload(3);   // Upload video 3
server.longest();   // Return 0 (no prefix yet)
server.upload(1);   // Upload video 1
server.longest();   // Return 1
server.upload(2);   // Upload video 2
server.longest();   // Return 3 (videos 1, 2, 3 uploaded)
```

## Approach

Maintain a set of uploaded videos and a pointer to track the longest prefix. When uploading a video, add it to the set. Then, starting from the current prefix pointer, advance it as long as the next consecutive video exists in the set.

## C# Solution

```csharp
public class LUPrefix
{
    private HashSet<int> uploaded;
    private int longestPrefix;
    
    public LUPrefix(int n)
    {
        uploaded = new HashSet<int>();
        longestPrefix = 0;
    }
    
    public void Upload(int video)
    {
        uploaded.Add(video);
        
        // Extend the prefix as far as possible
        while (uploaded.Contains(longestPrefix + 1))
        {
            longestPrefix++;
        }
    }
    
    public int Longest()
    {
        return longestPrefix;
    }
}
```

## Complexity

- **Upload Time:** O(k) amortized where k is the number of consecutive videos after the current prefix
- **Longest Time:** O(1)
- **Space:** O(n) for the hash set
