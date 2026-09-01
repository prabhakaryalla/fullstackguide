# 1868. Product of Two Run-Length Encoded Arrays

**Difficulty:** Medium
**Category:** Array, Two Pointers, Simulation

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

A run-length encoded (RLE) array is a list of `[value, count]` pairs. Given two RLE arrays `encoded1` and `encoded2` representing arrays of the same length, return the RLE encoding of their element-wise product.

### Example

```
Input: encoded1 = [[1,3],[2,3]], encoded2 = [[6,3],[3,3]]
Output: [[6,3],[6,3]]
```

## Approach

Walk both RLE lists with two pointers, tracking how much of the current run is left to consume on each side. At each step, the product for the overlapping portion is `encoded1[i][0] * encoded2[j][0]`, applied for `min(remaining1, remaining2)` positions. Append this to the result, merging with the previous run if the product value is unchanged (to keep the encoding compact), then subtract the consumed amount from both remaining counters and advance whichever pointer has exhausted its current run.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> FindRLEArray(int[][] encoded1, int[][] encoded2)
    {
        var result = new List<IList<int>>();
        int i = 0, j = 0;
        int count1Remaining = encoded1[0][1];
        int count2Remaining = encoded2[0][1];

        while (i < encoded1.Length && j < encoded2.Length)
        {
            int product = encoded1[i][0] * encoded2[j][0];
            int count = Math.Min(count1Remaining, count2Remaining);

            if (result.Count > 0 && result[^1][0] == product)
            {
                result[^1][1] += count;
            }
            else
            {
                result.Add(new List<int> { product, count });
            }

            count1Remaining -= count;
            count2Remaining -= count;

            if (count1Remaining == 0 && ++i < encoded1.Length) count1Remaining = encoded1[i][1];
            if (count2Remaining == 0 && ++j < encoded2.Length) count2Remaining = encoded2[j][1];
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(len(encoded1) + len(encoded2))`.
- **Space:** `O(len(encoded1) + len(encoded2))` for the output in the worst case.
