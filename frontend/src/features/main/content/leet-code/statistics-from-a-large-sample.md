# 1093. Statistics from a Large Sample

**Difficulty:** Hard
**Category:** Array, Math, Sampling

## Problem

Given a `count` array of length `256` where `count[k]` is the number of times the value `k` appears in a large sample, return `[minimum, maximum, mean, median, mode]` of the sample.

### Example

```
Input: count = [0,1,3,4,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
Output: [1.00000,3.00000,2.37500,2.50000,3.00000]
```

## Approach

Scan the `count` array once, tracking: the smallest and largest value with non-zero count (min/max), the running weighted sum and total count (to compute the mean), and the value with the highest count seen (the mode). For the median, scan again accumulating a running total; the "lower-middle" and "upper-middle" positions (`(total+1)/2` and `(total+2)/2` using integer arithmetic, which coincide when `total` is odd) locate the middle value(s) directly from the cumulative counts, and averaging them gives the median.

## C# Solution

```csharp
public class Solution
{
    public double[] SampleStats(int[] count)
    {
        long total = 0;
        int minValue = -1, maxValue = -1;
        long sum = 0;
        int modeValue = 0;
        int modeCount = 0;

        for (int value = 0; value < count.Length; value++)
        {
            if (count[value] == 0) continue;

            if (minValue == -1) minValue = value;
            maxValue = value;

            total += count[value];
            sum += (long)value * count[value];

            if (count[value] > modeCount)
            {
                modeCount = count[value];
                modeValue = value;
            }
        }

        double mean = (double)sum / total;

        long lowerMid = (total + 1) / 2;
        long upperMid = (total + 2) / 2;
        int foundLower = -1, foundUpper = -1;
        long cumulative = 0;

        for (int value = 0; value < count.Length; value++)
        {
            if (count[value] == 0) continue;

            cumulative += count[value];

            if (foundLower == -1 && cumulative >= lowerMid) foundLower = value;
            if (foundUpper == -1 && cumulative >= upperMid) foundUpper = value;

            if (foundLower != -1 && foundUpper != -1) break;
        }

        double median = (foundLower + foundUpper) / 2.0;

        return new double[] { minValue, maxValue, mean, median, modeValue };
    }
}
```

## Complexity

- **Time:** `O(256)` — two passes over the fixed-size count array.
- **Space:** `O(1)`.
