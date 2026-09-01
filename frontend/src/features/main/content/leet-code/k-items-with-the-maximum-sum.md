# 2600. K Items With the Maximum Sum

**Difficulty:** Easy
**Category:** Math, Greedy

## Problem

There is a bag that consists of items, each item has a number 1, 0, or -1 written on it. You are given four non-negative integers `numOnes`, `numZeros`, `numNegOnes`, and `k`.

The bag initially contains `numOnes` items with 1s, `numZeros` items with 0s, and `numNegOnes` items with -1s. You want to pick exactly `k` items from the bag.

Return the maximum possible sum of the numbers on the picked items.

### Example

```
Input: numOnes = 3, numZeros = 2, numNegOnes = 0, k = 2
Output: 2
Explanation: Pick 2 items with 1 written on them, sum = 2
```

## Approach

Greedily pick items in order of their value: first take as many 1s as possible, then 0s, then -1s. The maximum sum is achieved by taking the highest-value items first.

## C# Solution

```csharp
public class Solution
{
    public int KItemsWithMaximumSum(int numOnes, int numZeros, int numNegOnes, int k)
    {
        int sum = 0;
        
        int takesOnes = Math.Min(k, numOnes);
        sum += takesOnes;
        k -= takesOnes;
        
        if (k > 0)
        {
            int takeZeros = Math.Min(k, numZeros);
            k -= takeZeros;
        }
        
        if (k > 0)
        {
            int takeNegOnes = Math.Min(k, numNegOnes);
            sum -= takeNegOnes;
        }
        
        return sum;
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
