# 3663. Find The Least Frequent Digit

**Difficulty:** Easy
**Category:** Math, Hash Table

## Problem

Given a positive integer `n`, find the digit that appears the fewest times in it. If multiple digits tie for the fewest occurrences, return the smallest such digit.

### Example

`n = 1223`: digit `1` appears once, `2` appears twice, `3` appears once. The digits tied for fewest (1 and 3) — the smallest is `1`.

## Approach

Count the occurrences of each digit 0-9 in `n`, then scan digits in ascending order and pick the first one with the minimum non-zero count.

## C# Solution

```csharp
public class Solution 
{
    public int FindLeastFrequentDigit(int n) 
    {
        int[] freq = new int[10];
        while (n > 0) 
        {
            freq[n % 10]++;
            n /= 10;
        }

        int best = -1;
        int bestCount = int.MaxValue;
        for (int d = 0; d <= 9; d++) 
        {
            if (freq[d] > 0 && freq[d] < bestCount) 
            {
                bestCount = freq[d];
                best = d;
            }
        }
        return best;
    }
}
```

## Complexity

- **Time:** O(log n)
- **Space:** O(1)
