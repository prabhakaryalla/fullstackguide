# 2483. Minimum Penalty for a Shop

**Difficulty:** Medium
**Category:** String, Prefix Sum

## Problem

You are given a string `customers` where `customers[i]` is either `'Y'` (customer arrives) or `'N'` (no customer arrives) at hour `i`.

A shop owner decides to close the shop at some hour. The penalty is calculated as:
- For every hour when the shop is open and no customer arrives (`'N'`), the penalty increases by 1.
- For every hour when the shop is closed and a customer arrives (`'Y'`), the penalty increases by 1.

Return the earliest hour at which the shop should close to minimize the penalty. If there are multiple hours with minimum penalty, return the earliest one.

### Example

```
Input: customers = "YYNY"
Output: 2
Explanation: Close at hour 2:
- Hours 0-1 open: 0 penalty (both Y)
- Hours 2-3 closed: 1 penalty (hour 3 has Y)
Total: 1 penalty
```

## Approach

Use prefix sums to efficiently compute penalties:
- Track the count of `'N'` from the start (penalty for keeping shop open)
- Track the count of `'Y'` from any point to the end (penalty for closing early)

For each possible closing hour, the penalty is:
- Count of `'N'` before closing hour + Count of `'Y'` after closing hour

## C# Solution

```csharp
public class Solution
{
    public int BestClosingTime(string customers)
    {
        int n = customers.Length;
        int minPenalty = int.MaxValue;
        int bestHour = 0;
        
        int currentPenalty = 0;
        for (int i = 0; i < n; i++)
        {
            if (customers[i] == 'Y') currentPenalty++;
        }
        
        minPenalty = currentPenalty;
        
        for (int hour = 0; hour < n; hour++)
        {
            if (customers[hour] == 'Y')
            {
                currentPenalty--;
            }
            else
            {
                currentPenalty++;
            }
            
            if (currentPenalty < minPenalty)
            {
                minPenalty = currentPenalty;
                bestHour = hour + 1;
            }
        }
        
        return bestHour;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the string
- **Space:** O(1)
