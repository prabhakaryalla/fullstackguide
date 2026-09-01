# 710. Random Pick with Blacklist

**Difficulty:** Hard
**Category:** Hash Table, Math, Binary Search, Sorting, Randomization

## Problem

Given an integer `n` and an array `blacklist` of distinct blacklisted numbers in the range `[0, n)`, implement `Pick()` which returns a uniformly random integer in `[0, n)` that is not in `blacklist`, minimizing the number of calls to the random number generator.

### Example

```
Input:
["Solution", "pick", "pick", "pick"]
[[7, [2, 3, 5]], [], [], []]
Output:
[null, 0, 4, 1] (values may vary, always excluding 2, 3, 5)
```

## Approach

Let `bound = n - blacklist.Length` be the count of valid (non-blacklisted) numbers. Any blacklisted number that falls below `bound` needs to be remapped to some valid number at or above `bound` (since numbers `>= bound` are never directly picked); build this remapping once in the constructor by scanning upward from `bound` for the next available (non-blacklisted) number for each such case. Then `Pick()` simply generates a uniformly random index in `[0, bound)` and looks up its remapped value if one exists.

## C# Solution

```csharp
public class Solution
{
    private readonly int bound;
    private readonly Dictionary<int, int> remap = new();
    private readonly Random random = new();

    public Solution(int n, int[] blacklist)
    {
        bound = n - blacklist.Length;
        var blacklistSet = new HashSet<int>(blacklist);

        int nextAvailable = bound;

        foreach (var b in blacklist)
        {
            if (b < bound)
            {
                while (blacklistSet.Contains(nextAvailable))
                    nextAvailable++;

                remap[b] = nextAvailable;
                nextAvailable++;
            }
        }
    }

    public int Pick()
    {
        int index = random.Next(bound);
        return remap.GetValueOrDefault(index, index);
    }
}
```

## Complexity

- **Time:** `O(blacklist.Length)` construction, `O(1)` per `Pick` call.
- **Space:** `O(blacklist.Length)` for the remap table.
