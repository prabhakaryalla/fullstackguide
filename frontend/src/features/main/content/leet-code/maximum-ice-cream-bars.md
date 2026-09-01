# 1833. Maximum Ice Cream Bars

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting

## Problem

Given `costs[i]`, the price of the `i`-th ice cream bar, and a budget `coins`, return the maximum number of bars that can be bought.

### Example

```
Input: costs = [1,3,2,4,1], coins = 7
Output: 4
```

## Approach

Sort the costs ascending and greedily buy the cheapest remaining bar as long as the budget allows — buying cheaper items first always allows at least as many total purchases as any other order.

## C# Solution

```csharp
public class Solution
{
    public int MaxIceCream(int[] costs, int coins)
    {
        Array.Sort(costs);
        int count = 0;

        foreach (int cost in costs)
        {
            if (coins < cost) break;
            coins -= cost;
            count++;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort.
- **Space:** `O(1)` extra (sort is in place).
