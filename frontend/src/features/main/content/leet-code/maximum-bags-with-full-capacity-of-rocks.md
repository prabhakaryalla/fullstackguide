# 2279. Maximum Bags With Full Capacity of Rocks

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting

## Problem

You have `n` bags numbered from 0 to `n - 1`. You are given two 0-indexed integer arrays `capacity` and `rocks`, where `capacity[i]` is the maximum number of rocks bag `i` can hold and `rocks[i]` is the current number of rocks in bag `i`.

You are also given an integer `additionalRocks`, the number of additional rocks you can place in any bags. Return the maximum number of bags that can have full capacity after placing the additional rocks.

### Example

```
Input: capacity = [2,3,4,5], rocks = [1,2,4,4], additionalRocks = 2
Output: 3
Explanation:
- Bag 0 needs 1 rock
- Bag 1 needs 1 rock
- Bag 2 needs 0 rocks (already full)
- Bag 3 needs 1 rock
We can fill bags 0, 1 (use 2 rocks), and bag 2 is already full. Total: 3 bags.
```

## Approach

Calculate how many rocks each bag needs to be full. Sort these needs in ascending order. Greedily fill bags starting with those needing the fewest rocks until you run out of additional rocks.

## C# Solution

```csharp
public class Solution
{
    public int MaximumBags(int[] capacity, int[] rocks, int additionalRocks)
    {
        int n = capacity.Length;
        int[] needs = new int[n];
        
        for (int i = 0; i < n; i++)
        {
            needs[i] = capacity[i] - rocks[i];
        }
        
        Array.Sort(needs);
        
        int fullBags = 0;
        
        foreach (int need in needs)
        {
            if (additionalRocks >= need)
            {
                additionalRocks -= need;
                fullBags++;
            }
            else
            {
                break;
            }
        }
        
        return fullBags;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting.
- **Space:** O(n) for the needs array.
