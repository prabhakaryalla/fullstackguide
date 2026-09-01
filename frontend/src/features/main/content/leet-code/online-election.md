# 911. Online Election

**Difficulty:** Medium
**Category:** Array, Hash Table, Binary Search, Design

## Problem

Given arrays `persons` and `times`, where `persons[i]` voted for a candidate at `times[i]` (strictly increasing), implement `TopVotedCandidate` with a `Q(t)` method that returns the candidate leading the election at time `t` (a tie keeps the most recently-tied leader).

### Example

```
persons = [0,1,1,0,0,1,0], times = [0,5,10,15,20,25,30]
Q(3)  -> 0
Q(12) -> 1
Q(25) -> 1
Q(15) -> 0
Q(24) -> 0
Q(8)  -> 1
```

## Approach

Precompute, for every vote index, who the leader is immediately after that vote (a candidate becomes/stays leader when its running tally is `>=` the current leader's). Store the corresponding `times` array too, then answer each query with a binary search for the latest vote time `<= t` and return that vote's precomputed leader.

## C# Solution

```csharp
public class TopVotedCandidate
{
    private readonly List<int> times;
    private readonly List<int> leaders;

    public TopVotedCandidate(int[] persons, int[] times)
    {
        this.times = times.ToList();
        leaders = new List<int>();
        var count = new Dictionary<int, int>();
        int leader = -1;

        foreach (var p in persons)
        {
            count[p] = count.GetValueOrDefault(p) + 1;
            if (leader == -1 || count[p] >= count[leader]) leader = p;
            leaders.Add(leader);
        }
    }

    public int Q(int t)
    {
        int lo = 0, hi = times.Count - 1;

        while (lo < hi)
        {
            int mid = (lo + hi + 1) / 2;
            if (times[mid] <= t) lo = mid; else hi = mid - 1;
        }

        return leaders[lo];
    }
}
```

## Complexity

- **Time:** `O(n)` to build, `O(log n)` per query.
- **Space:** `O(n)`.
