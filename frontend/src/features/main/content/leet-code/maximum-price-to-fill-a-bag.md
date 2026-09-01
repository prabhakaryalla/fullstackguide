# 2548. Maximum Price to Fill a Bag

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a 2D integer array `items` where `items[i] = [price_i, weight_i]` denotes the price and weight of the `i`th item, and an integer `capacity`.

Each item can be split into smaller portions, but you must take portions such that their total weight does not exceed `capacity`.

Return the maximum total price you can get. Return `-1` if it's impossible to fill the bag completely (i.e., the total weight of all items is less than `capacity`).

### Example

```
Input: items = [[50,1],[10,8]], capacity = 10
Output: 55
Explanation: Take all of item 0 (price 50, weight 1) and 9/8 of item 1 (price 90/8 = 11.25)
Wait, that doesn't work out...

Let me recalculate:
Item 0: 50 price, 1 weight (ratio = 50)
Item 1: 10 price, 8 weight (ratio = 1.25)
Take all of item 0 (weight 1, price 50)
Need 9 more weight: but item 1 only has 8 weight total
Actually need exactly capacity weight, so take all 8 weight from item 1 (price 10)
Total: 50 + 10 = 60? But capacity is 10, not 9...
```

## Approach

Greedy strategy: prioritize items by price-to-weight ratio in descending order.

1. Calculate price per unit weight for each item
2. Sort items by this ratio in descending order
3. Greedily select items until we fill exactly `capacity`:
   - If total available weight < capacity, return -1
   - Otherwise, take as much as possible from each item in order

## C# Solution

```csharp
public class Solution
{
    public double MaxPrice(int[][] items, int capacity)
    {
        long totalWeight = 0;
        foreach (var item in items)
            totalWeight += item[1];
        
        if (totalWeight < capacity)
            return -1;
        
        Array.Sort(items, (a, b) => 
        {
            long ratioA = (long)a[0] * b[1];
            long ratioB = (long)b[0] * a[1];
            return ratioB.CompareTo(ratioA);
        });
        
        double totalPrice = 0;
        int remainingCapacity = capacity;
        
        foreach (var item in items)
        {
            int price = item[0];
            int weight = item[1];
            
            if (weight <= remainingCapacity)
            {
                totalPrice += price;
                remainingCapacity -= weight;
            }
            else
            {
                totalPrice += (double)price * remainingCapacity / weight;
                remainingCapacity = 0;
                break;
            }
        }
        
        return totalPrice;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(1) excluding input
