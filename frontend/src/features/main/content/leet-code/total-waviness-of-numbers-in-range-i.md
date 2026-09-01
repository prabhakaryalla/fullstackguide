# 3751. Total Waviness of Numbers in Range I

**Difficulty:** Medium
**Category:** Math, Simulation

## Problem

Define the "waviness" of a positive integer as the number of interior digit positions (not the first or last digit) where the digit is either a local peak (strictly greater than both neighbors) or a local valley (strictly less than both neighbors). Given two integers `l` and `r`, return the sum of waviness over all integers from `l` to `r`, inclusive.

### Example

n = 132 → digits 1,3,2: the digit '3' is a peak (1<3>2), waviness = 1.

## Approach

Since the range is small, iterate every number from `l` to `r`, convert it to its digit sequence, and scan interior positions checking the peak/valley condition, summing the counts.

## C# Solution

```csharp
public class Solution 
{
    public long TotalWaviness(int l, int r) 
    {
        long total = 0;
        for (int n = l; n <= r; n++) 
        {
            string digits = n.ToString();
            for (int i = 1; i < digits.Length - 1; i++) 
            {
                int prev = digits[i - 1] - '0';
                int cur = digits[i] - '0';
                int next = digits[i + 1] - '0';
                if ((cur > prev && cur > next) || (cur < prev && cur < next)) 
                {
                    total++;
                }
            }
        }
        return total;
    }
}
```

## Complexity

- **Time:** O((r - l) * d), where d is the number of digits
- **Space:** O(1)
