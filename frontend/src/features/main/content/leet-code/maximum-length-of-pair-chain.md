# 646. Maximum Length of Pair Chain

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Greedy, Sorting

## Problem

Given an array of pairs `pairs` where `pairs[i] = [lefti, righti]`, a pair `(c, d)` can follow `(a, b)` if `b < c`. Return the length of the longest chain that can be formed, selecting pairs in any order.

### Example

```
Input: pairs = [[1,2],[2,3],[3,4]]
Output: 2
```

### Constraints

- `1 <= pairs.length <= 1000`

## Approach

Sort pairs by their ending value ascending. Greedily build the chain: keep track of the end value of the last pair added, and take the next pair (in sorted order) whenever its start value exceeds that end value, updating the tracked end. Choosing the earliest-ending pair at every step leaves the most room for subsequent pairs to also qualify.

## C# Solution

```csharp
public class Solution
{
    public int FindLongestChain(int[][] pairs)
    {
        Array.Sort(pairs, (a, b) => a[1].CompareTo(b[1]));

        int count = 0;
        int currentEnd = int.MinValue;

        foreach (var pair in pairs)
        {
            if (pair[0] > currentEnd)
            {
                count++;
                currentEnd = pair[1];
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort.
- **Space:** `O(1)` extra.
