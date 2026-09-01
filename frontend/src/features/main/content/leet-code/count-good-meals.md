# 1711. Count Good Meals

**Difficulty:** Medium
**Category:** Array, Hash Table, Bit Manipulation

## Problem

A good meal is a combination of exactly two dishes such that the sum of their deliciousness values is a power of two. Given an array `deliciousness`, return the number of different good meals you can make from any two distinct items, modulo `10^9 + 7`.

### Example

```
Input: deliciousness = [1,3,5,7,9]
Output: 4
```

## Approach

Process items one at a time while maintaining a frequency map of items seen so far. For each new item, check every power of two up to the maximum possible sum and look up how many previously seen items would complete that sum; add those counts to the running total, then record the current item in the map.

## C# Solution

```csharp
public class Solution
{
    public int CountPairs(int[] deliciousness)
    {
        const int Mod = 1_000_000_007;
        const int MaxSum = 1 << 21; // deliciousness[i] < 2^20, so sums stay below 2^21

        var count = new Dictionary<int, int>();
        long result = 0;

        foreach (int d in deliciousness)
        {
            for (int sum = 1; sum <= MaxSum; sum <<= 1)
            {
                int complement = sum - d;
                if (complement >= 0 && count.TryGetValue(complement, out int c))
                    result = (result + c) % Mod;
            }

            count[d] = count.GetValueOrDefault(d, 0) + 1;
        }

        return (int)result;
    }
}
```

## Complexity

- **Time:** `O(n log(max))`.
- **Space:** `O(n)` for the frequency map.
