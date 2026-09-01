# 1054. Distant Barcodes

**Difficulty:** Medium
**Category:** Array, Hash Table, Sorting, Heap (Priority Queue), Greedy, Counting

## Problem

Given `barcodes` where `barcodes[i]` is the barcode of the `i`-th item on a conveyor belt, rearrange the items so that no two adjacent barcodes are equal. Return any valid arrangement (a valid one is guaranteed to exist).

### Example

```
Input: barcodes = [1,1,1,2,2,2]
Output: [1,2,1,2,1,2]
```

## Approach

Count the frequency of each barcode value, then sort values by descending frequency — the most frequent values are the hardest to space out, so place them first. Fill the result array's even indices (`0, 2, 4, ...`) first, then continue into the odd indices once the even ones are exhausted; because no single value's frequency exceeds half the array (guaranteed by the problem), this even-then-odd placement never puts two equal values adjacent.

## C# Solution

```csharp
public class Solution
{
    public int[] RearrangeBarcodes(int[] barcodes)
    {
        var counts = new Dictionary<int, int>();
        foreach (var code in barcodes)
        {
            counts.TryGetValue(code, out var count);
            counts[code] = count + 1;
        }

        var sortedCodes = counts.Keys.ToList();
        sortedCodes.Sort((a, b) => counts[b].CompareTo(counts[a]));

        int n = barcodes.Length;
        var result = new int[n];
        int index = 0;

        foreach (var code in sortedCodes)
        {
            for (int k = 0; k < counts[code]; k++)
            {
                if (index >= n) index = 1;
                result[index] = code;
                index += 2;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for sorting the distinct values by frequency.
- **Space:** `O(n)` for the counts map and result array.
