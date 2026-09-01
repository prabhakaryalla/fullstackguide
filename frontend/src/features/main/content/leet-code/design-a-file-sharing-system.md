# 1500. Design a File Sharing System

**Difficulty:** Medium
**Category:** Hash Table, Design, Heap (Priority Queue), Sorting

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Design a `FileSharing` system for a file split into `m` chunks. Support: `Join(ownedChunks)` — connects a new user (assigned the smallest available, previously unused user ID) who already owns the given chunks, returning the assigned ID; `Leave(userID)` — disconnects a user, freeing their ID for reuse; `Request(userID, chunkID)` — returns the sorted list of user IDs (other than the requester) currently owning `chunkID`, and the requester then also owns that chunk going forward.

## Approach

Maintain a map from active user ID to their set of owned chunks, and a sorted set of freed IDs available for reuse. Joining reuses the smallest freed ID if one exists, otherwise allocates a new incrementing ID. Leaving removes the user's entry and returns their ID to the free set. Requesting a chunk scans all currently connected users' owned-chunk sets for matches (excluding the requester), sorts the resulting IDs, and — if any owners were found — adds the chunk to the requester's own set.

## C# Solution

```csharp
public class FileSharing
{
    private readonly Dictionary<int, HashSet<int>> userChunks = new();
    private readonly SortedSet<int> freeIds = new();
    private int nextId = 1;

    public FileSharing(int m) { }

    public int Join(IList<int> ownedChunks)
    {
        int id;
        if (freeIds.Count > 0)
        {
            id = freeIds.Min;
            freeIds.Remove(id);
        }
        else
        {
            id = nextId++;
        }

        userChunks[id] = new HashSet<int>(ownedChunks);
        return id;
    }

    public void Leave(int userID)
    {
        userChunks.Remove(userID);
        freeIds.Add(userID);
    }

    public IList<int> Request(int userID, int chunkID)
    {
        var owners = new List<int>();

        foreach (var (id, chunks) in userChunks)
        {
            if (id != userID && chunks.Contains(chunkID))
                owners.Add(id);
        }

        owners.Sort();

        if (owners.Count > 0)
            userChunks[userID].Add(chunkID);

        return owners;
    }
}
```

## Complexity

- **Time:** `O(1)` for `Join`/`Leave`; `O(u log u)` for `Request`, where `u` is the number of connected users.
- **Space:** `O(u * c)` for the owned-chunk sets across all users.
