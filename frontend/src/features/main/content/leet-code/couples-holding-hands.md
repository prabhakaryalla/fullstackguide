# 765. Couples Holding Hands

**Difficulty:** Hard
**Category:** Greedy, Array, Union Find, Graph

## Problem

There are `n` couples seated in `2n` consecutive seats represented by `row`, where each person is assigned an integer id and couples have ids `(2i, 2i+1)`. Return the minimum number of swaps of two people needed so that every couple sits side by side.

### Example

```
Input: row = [0,2,1,3]
Output: 1
```

## Approach

Track the current seat position of every person via an index map. Walk through the seats two at a time; for each pair of seats, compute the id of the first person's partner. If the second seat doesn't already hold that partner, swap the actual partner into the second seat (updating the position map accordingly) and count one swap. Because fixing a pair only requires a single swap, this greedy scan produces the minimum number of swaps.

## C# Solution

```csharp
public class Solution
{
    public int MinSwapsCouples(int[] row)
    {
        int n = row.Length;
        var positionOf = new int[n];
        for (int i = 0; i < n; i++)
            positionOf[row[i]] = i;

        int swaps = 0;

        for (int i = 0; i < n; i += 2)
        {
            int partner = row[i] % 2 == 0 ? row[i] + 1 : row[i] - 1;

            if (row[i + 1] != partner)
            {
                int partnerPos = positionOf[partner];

                positionOf[row[i + 1]] = partnerPos;
                positionOf[partner] = i + 1;

                (row[i + 1], row[partnerPos]) = (row[partnerPos], row[i + 1]);

                swaps++;
            }
        }

        return swaps;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the position map.
