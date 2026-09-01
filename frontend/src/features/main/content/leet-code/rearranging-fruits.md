# 2561. Rearranging Fruits

**Difficulty:** Hard
**Category:** Array, Hash Table, Greedy

## Problem

You have two fruit baskets containing `n` fruits each. You are given two 0-indexed integer arrays `basket1` and `basket2` representing the types of fruit in each basket.

You want to make both baskets equal. To do so, you can use the following operation as many times as you want:

- Choose two indices `i` and `j`, and swap `basket1[i]` with `basket2[j]`.
- The cost of this swap is `min(basket1[i], basket2[j])`.

Return the minimum cost to make both baskets equal, or `-1` if impossible.

### Example

```
Input: basket1 = [4,2,2,2], basket2 = [1,4,1,2]
Output: 1
Explanation: Swap basket1[0]=4 with basket2[2]=1. Cost = min(4,1) = 1.
Result: basket1=[1,2,2,2], basket2=[1,4,2,4]
Wait, that doesn't make them equal...

Let me reconsider. The goal is to make the multisets equal.
```

## Approach

1. Count the frequency of each fruit type across both baskets
2. If any fruit has an odd total count, return -1 (impossible)
3. Identify fruits that need to be swapped (excess in one basket, deficit in another)
4. Greedily match largest excesses with smallest deficits, or use the global minimum as an intermediary

The cost: For swapping fruit `a` from basket1 with fruit `b` from basket2:
- Direct swap costs `min(a, b)`
- Indirect swap (via global minimum `m`): costs `2 * m` (swap a with m, then m with b)

Choose the minimum cost strategy for each swap.

## C# Solution

```csharp
public class Solution
{
    public long MinCost(int[] basket1, int[] basket2)
    {
        var freq = new Dictionary<int, int>();
        int globalMin = int.MaxValue;
        
        foreach (int fruit in basket1)
        {
            freq[fruit] = freq.GetValueOrDefault(fruit, 0) + 1;
            globalMin = Math.Min(globalMin, fruit);
        }
        
        foreach (int fruit in basket2)
        {
            freq[fruit] = freq.GetValueOrDefault(fruit, 0) - 1;
            globalMin = Math.Min(globalMin, fruit);
        }
        
        var needSwap1 = new List<int>();
        var needSwap2 = new List<int>();
        
        foreach (var kvp in freq)
        {
            if (kvp.Value % 2 != 0)
                return -1;
            
            int count = Math.Abs(kvp.Value) / 2;
            if (kvp.Value > 0)
            {
                for (int i = 0; i < count; i++)
                    needSwap1.Add(kvp.Key);
            }
            else if (kvp.Value < 0)
            {
                for (int i = 0; i < count; i++)
                    needSwap2.Add(kvp.Key);
            }
        }
        
        needSwap1.Sort();
        needSwap2.Sort();
        
        long cost = 0;
        for (int i = 0; i < needSwap1.Count; i++)
        {
            cost += Math.Min(Math.Min(needSwap1[i], needSwap2[needSwap2.Count - 1 - i]), 2 * globalMin);
        }
        
        return cost;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(n) for the frequency map and swap lists
