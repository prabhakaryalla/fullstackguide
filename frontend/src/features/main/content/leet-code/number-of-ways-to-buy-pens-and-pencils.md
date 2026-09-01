# 2240. Number of Ways to Buy Pens and Pencils

**Difficulty:** Medium
**Category:** Math, Enumeration

## Problem

You are given an integer `total` representing the amount of money you have, and two integers `cost1` and `cost2` representing the price of a pen and a pencil respectively.

Return the number of distinct ways you can buy some number of pens and pencils (possibly zero of each) such that the total cost does not exceed `total`.

### Example

```
Input: total = 20, cost1 = 10, cost2 = 5
Output: 9
Explanation: The 9 ways are:
- 0 pens, 0 pencils: cost 0
- 0 pens, 1 pencil: cost 5
- 0 pens, 2 pencils: cost 10
- 0 pens, 3 pencils: cost 15
- 0 pens, 4 pencils: cost 20
- 1 pen, 0 pencils: cost 10
- 1 pen, 1 pencil: cost 15
- 1 pen, 2 pencils: cost 20
- 2 pens, 0 pencils: cost 20
```

## Approach

Iterate through all possible counts of pens (from 0 to `total / cost1`). For each pen count, calculate the remaining money and determine how many pencils can be bought with that remaining amount. Sum all possibilities.

## C# Solution

```csharp
public class Solution
{
    public long WaysToBuyPensPencils(int total, int cost1, int cost2)
    {
        long ways = 0;
        
        for (int pens = 0; pens * cost1 <= total; pens++)
        {
            int remaining = total - pens * cost1;
            int maxPencils = remaining / cost2;
            ways += maxPencils + 1;
        }
        
        return ways;
    }
}
```

## Complexity

- **Time:** O(total / cost1).
- **Space:** O(1).
