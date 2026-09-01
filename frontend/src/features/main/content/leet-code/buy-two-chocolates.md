# 2706. Buy Two Chocolates

**Difficulty:** Easy
**Category:** Array, Sorting, Greedy

## Problem

You are given an integer array `prices` representing the prices of various chocolates in a store. You are also given a single integer `money`, which represents your initial amount of money.

You must buy exactly two chocolates in such a way that you still have some non-negative leftover money. You would like to minimize the sum of the prices of the two chocolates you buy.

Return the amount of money you will have leftover after buying the two chocolates. If there is no way for you to buy two chocolates without ending up in debt, return `money`. Note that the leftover must be non-negative.

### Example

```
Input: prices = [1,2,2], money = 3
Output: 0
Explanation: Purchase chocolates priced at 1 and 2, leaving 3 - 1 - 2 = 0.

Input: prices = [3,2,3], money = 3
Output: 3
Explanation: You cannot buy two chocolates without going into debt, so return the original money.
```

## Approach

Find the two minimum prices in the array. If their sum is less than or equal to `money`, return `money` minus their sum. Otherwise, return `money` unchanged.

We can sort the array and take the first two elements, or use a single pass to find the two minimums without sorting.

## C# Solution

```csharp
public class Solution 
{
    public int BuyChoco(int[] prices, int money) 
    {
        int min1 = int.MaxValue;
        int min2 = int.MaxValue;
        
        foreach (int price in prices)
        {
            if (price < min1)
            {
                min2 = min1;
                min1 = price;
            }
            else if (price < min2)
            {
                min2 = price;
            }
        }
        
        int cost = min1 + min2;
        return cost <= money ? money - cost : money;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of prices
- **Space:** O(1)
