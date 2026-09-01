# 3771. Total Score of Dungeon Runs

**Difficulty:** Medium
**Category:** Array, Binary Search, Prefix Sum

## Problem

Given `hp` and 1-indexed arrays `damage` and `requirement` (length `n`), entering room `i` reduces health by `damage[i]`; if remaining health is `>= requirement[i]`, one point is earned for that room. `score(j)` is the total points earned starting from room `j` through room `n`. Return `score(1) + score(2) + ... + score(n)`.

### Example

Input: `hp = 11, damage = [3,6,7], requirement = [4,2,5]`
Output: `3`

## Approach

Let `D[t]` be the prefix sum of damage (0-indexed, `D[0]=0`). Starting at room `j`, the condition at room `i >= j` is `hp - (D[i]-D[j-1]) >= requirement[i]`, i.e. `D[j-1] >= requirement[i] - hp + D[i]`. For each room `i`, count how many earlier prefix values `D[0..i-1]` satisfy this threshold, using coordinate compression and a Fenwick tree so each room is processed in `O(log n)`, and sum these counts over all rooms.

## C# Solution

```csharp
public class Solution 
{
    public long TotalScore(int hp, int[] damage, int[] requirement) 
    {
        int n = damage.Length;
        var D = new long[n + 1];
        for (int t = 1; t <= n; t++) D[t] = D[t - 1] + damage[t - 1];

        var threshold = new long[n + 1];
        var coordsSet = new SortedSet<long>();
        for (int t = 0; t <= n; t++) coordsSet.Add(D[t]);
        for (int i = 1; i <= n; i++)
        {
            threshold[i] = requirement[i - 1] - hp + D[i];
            coordsSet.Add(threshold[i]);
        }
        var coords = coordsSet.ToArray();
        int m = coords.Length;

        var bit = new int[m + 1];
        void Update(int idx1Based)
        {
            for (int i = idx1Based; i <= m; i += i & (-i)) bit[i]++;
        }
        int Query(int idx1Based)
        {
            int sum = 0;
            for (int i = idx1Based; i > 0; i -= i & (-i)) sum += bit[i];
            return sum;
        }
        int LowerBound(long value)
        {
            int lo = 0, hi = m;
            while (lo < hi)
            {
                int mid = (lo + hi) / 2;
                if (coords[mid] < value) lo = mid + 1; else hi = mid;
            }
            return lo;
        }

        long answer = 0;
        for (int i = 1; i <= n; i++)
        {
            int rank = Array.BinarySearch(coords, D[i - 1]);
            Update(rank + 1);

            int idx = LowerBound(threshold[i]);
            int countLess = Query(idx);
            long countGE = i - countLess;
            answer += countGE;
        }
        return answer;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
