# 1196. How Many Apples Can You Put into the Basket

**Difficulty:** Easy
**Category:** Array, Greedy, Sorting

## Problem

Given an array of apple `weight`s and a basket with a weight capacity of `5000`, return the maximum number of apples that can fit in the basket.

### Example

```
Input: weight = [100,200,150,1000]
Output: 4
```

## Approach

Sort the weights ascending and greedily add the lightest apples first, since maximizing count favors picking the smallest weights until the capacity would be exceeded.

## C# Solution

```csharp
public class Solution
{
    public int MaxNumberOfApples(int[] weight)
    {
        Array.Sort(weight);
        int total = 0, count = 0;

        foreach (int w in weight)
        {
            if (total + w > 5000) break;
            total += w;
            count++;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(1)` (excluding the sort).
