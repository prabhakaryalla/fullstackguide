# 2110. Number of Smooth Descent Periods of a Stock

**Difficulty:** Medium
**Category:** Array, Math, Dynamic Programming

## Problem

A smooth descent period is a subarray where prices decrease by exactly 1 each day. Return the number of smooth descent periods in the given price array.

### Example

```
Input: prices = [3,2,1,4]
Output: 7
Explanation: [3], [2], [1], [4], [3,2], [2,1], [3,2,1]
```

## Approach

For each position, track the length of the current descending sequence. If `prices[i] = prices[i-1] - 1`, extend the sequence; otherwise, restart. A sequence of length k contributes k*(k+1)/2 subarrays to the answer.

## C# Solution

```csharp
public class Solution
{
    public long GetDescentPeriods(int[] prices)
    {
        long total = 0;
        int len = 1;
        
        for (int i = 0; i < prices.Length; i++)
        {
            if (i > 0 && prices[i] == prices[i - 1] - 1)
                len++;
            else
                len = 1;
            
            total += len;
        }
        
        return total;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
