# 2145. Count the Hidden Sequences

**Difficulty:** Medium
**Category:** Array, Prefix Sum

## Problem

You are given an array of integers `differences` of length `n` where `differences[i]` represents the difference between the `(i+1)-th` and `i-th` element of a hidden sequence.

You are also given integers `lower` and `upper` representing the inclusive range of values the hidden sequence can have.

Return the number of possible hidden sequences. If no such sequence exists, return 0.

### Example

```
Input: differences = [1,-3,4], lower = 1, upper = 6
Output: 2
Explanation: Hidden sequences: [3,4,1,5] or [4,5,2,6]
```

## Approach

Build the relative sequence starting from 0. Find the minimum and maximum values in this sequence. The actual sequence can be shifted by any amount such that:
- `min_value + shift >= lower`
- `max_value + shift <= upper`

The number of valid shifts is the range where both conditions are satisfied.

## C# Solution

```csharp
public class Solution
{
    public int NumberOfArrays(int[] differences, int lower, int upper)
    {
        long current = 0;
        long minVal = 0;
        long maxVal = 0;
        
        // Build relative sequence and track min/max
        foreach (int diff in differences)
        {
            current += diff;
            minVal = Math.Min(minVal, current);
            maxVal = Math.Max(maxVal, current);
        }
        
        // Calculate valid shift range
        long minShift = lower - minVal;
        long maxShift = upper - maxVal;
        
        // Number of valid shifts
        long result = maxShift - minShift + 1;
        
        return result > 0 ? (int)result : 0;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of differences
- **Space:** O(1)
