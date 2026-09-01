# 2167. Minimum Time to Remove All Cars Containing Illegal Goods

**Difficulty:** Hard
**Category:** String, Dynamic Programming, Greedy

## Problem

You are given a binary string `s` where '1' represents a car with illegal goods and '0' represents a regular car.

You can remove cars using:
- Remove from left end: 1 unit of time
- Remove from right end: 1 unit of time
- Remove from middle: 2 units of time

Return the minimum time to remove all cars containing illegal goods.

### Example

```
Input: s = "1100101"
Output: 5
Explanation: Remove first two from left (2), last one from right (1), middle one costs 2. Total = 5.
```

## Approach

For each position, decide whether to:
1. Remove all illegal cars up to this point from the left
2. Remove them individually from the middle
3. Or remove everything after this point from the right

Use dynamic programming: `dp[i]` = minimum cost to remove all illegal cars in `s[0...i]`.

The answer considers three scenarios for each position: left removal, middle removal, or right removal.

## C# Solution

```csharp
public class Solution
{
    public int MinimumTime(string s)
    {
        int n = s.Length;
        
        // leftCost[i] = min cost to remove all '1's in s[0..i] by removing from left or middle
        var leftCost = new int[n];
        leftCost[0] = s[0] == '1' ? 1 : 0;
        
        for (int i = 1; i < n; i++)
        {
            if (s[i] == '1')
            {
                // Either remove from left (i+1 cars) or remove this one from middle (2) + previous cost
                leftCost[i] = Math.Min(i + 1, leftCost[i - 1] + 2);
            }
            else
            {
                leftCost[i] = leftCost[i - 1];
            }
        }
        
        int minTime = leftCost[n - 1];
        
        // Consider removing suffix from right
        int rightCost = 0;
        for (int i = n - 1; i >= 0; i--)
        {
            rightCost++;
            int totalCost = (i > 0 ? leftCost[i - 1] : 0) + rightCost;
            minTime = Math.Min(minTime, totalCost);
        }
        
        return minTime;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the string
- **Space:** O(n) for the DP array
