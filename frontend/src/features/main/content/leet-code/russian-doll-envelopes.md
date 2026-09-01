# 354. Russian Doll Envelopes

**Difficulty:** Hard
**Category:** Array, Binary Search, Sorting

## Problem

Given a 2D array of `envelopes` where `envelopes[i] = [wi, hi]` represents the width and height of an envelope, one envelope can fit into another if and only if both its width and height are strictly smaller. Return the maximum number of envelopes that can be Russian dolled (nested inside each other, one inside the other).

### Example

```
Input: envelopes = [[5,4],[6,4],[6,7],[2,3]]
Output: 3
Explanation: [2,3] => [5,4] => [6,7]
```

### Constraints

- `1 <= envelopes.length <= 10^5`
- `envelopes[i].length == 2`
- `1 <= wi, hi <= 10^5`

## Approach

Sort envelopes by width ascending, breaking ties by height descending (so same-width envelopes can never nest with each other in the resulting subsequence). The problem then reduces to finding the longest strictly increasing subsequence of heights, solved with the standard patience-sorting technique: maintain a `tails` array of the smallest tail height for each subsequence length, using binary search to place each height.

## C# Solution

```csharp
public class Solution
{
    public int MaxEnvelopes(int[][] envelopes)
    {
        Array.Sort(envelopes, (a, b) => a[0] != b[0] ? a[0] - b[0] : b[1] - a[1]);

        var tails = new List<int>();
        foreach (var envelope in envelopes)
        {
            int height = envelope[1];
            int index = tails.BinarySearch(height);
            if (index < 0) index = ~index;

            if (index == tails.Count) tails.Add(height);
            else tails[index] = height;
        }

        return tails.Count;
    }
}
```

## Complexity

- **Time:** `O(n log n)` — sorting plus a binary search per envelope.
- **Space:** `O(n)` for the tails array.
