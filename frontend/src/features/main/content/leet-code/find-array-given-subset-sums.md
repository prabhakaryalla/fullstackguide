# 1982. Find Array Given Subset Sums

**Difficulty:** Hard
**Category:** Array, Bit Manipulation, Divide and Conquer

## Problem

An unknown integer array `arr` of length `n` has all `2^n` subset sums given (in arbitrary order) as `sums`. Reconstruct and return any valid array `arr` matching those subset sums.

### Example

```
Input: n = 3, sums = [-3,-2,-1,0,0,1,2,3]
Output: [1,2,-3]
Explanation: All subset sums of [1,2,-3] match the given multiset (after sorting).
```

### Constraints

- `1 <= n <= 15`
- `sums.length == 2^n`
- `-10^4 <= sums[i] <= 10^4`

## Approach

Sort `sums`. The smallest value corresponds to the sum of all negative elements (i.e., the empty-set-relative minimum), and `sums[0]` combined with the fact that `0` must be a valid subset sum lets us process elements one at a time: repeatedly take the two smallest remaining values `a = sums[0]`, `b = sums[1]`; their difference `d = b - a` is a candidate absolute value for the next array element. Partition all remaining sums into two halves based on whether they contain this element or not (split into a multiset assumed not containing it, and one obtained by adding `d`, matching against the current full list) — if the split doesn't yield `0` in the "without" partition, flip the sign of `d` and redo the partition using `-d` instead (swap which half is "with"/"without"). Repeat until all `n` elements are recovered, always halving the candidate sums list at each of the `n` steps.

## C# Solution

```csharp
public class Solution
{
    public int[] RecoverArray(int n, int[] sums) 
    {
        var multiset = new List<int>(sums);
        multiset.Sort();
        var result = new List<int>();

        for (int step = 0; step < n; step++)
        {
            int d = multiset[1] - multiset[0];

            var countMap = new Dictionary<int, int>();
            foreach (int v in multiset) countMap[v] = countMap.GetValueOrDefault(v, 0) + 1;
            var remaining = new Dictionary<int, int>(countMap);

            var groupA = new List<int>();
            var groupB = new List<int>();

            foreach (int v in multiset)
            {
                if (remaining[v] <= 0) continue;

                int partner = v + d;
                if (remaining.ContainsKey(partner) && remaining[partner] > 0 &&
                    !(partner == v && remaining[v] < 2))
                {
                    groupA.Add(v);
                    groupB.Add(partner);
                    remaining[v]--;
                    remaining[partner]--;
                }
            }

            bool zeroInA = groupA.Contains(0);

            if (zeroInA)
            {
                result.Add(d);
                multiset = groupA;
            }
            else
            {
                result.Add(-d);
                multiset = groupB;
            }
        }

        return result.ToArray();
    }
}
```

## Complexity

- **Time:** `O(n * 2^n log(2^n))` — each of the `n` steps processes and sorts a halved multiset.
- **Space:** `O(2^n)` for the multiset copies at each step.
