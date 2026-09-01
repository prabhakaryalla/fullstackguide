# 898. Bitwise ORs of Subarrays

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Bit Manipulation

## Problem

Given an integer array `arr`, return the number of distinct values obtainable by taking the bitwise OR of some contiguous, non-empty subarray.

### Example

```
Input: arr = [1,1,2]
Output: 3
```

## Approach

Maintain a rolling set of all possible OR values for subarrays ending at the current position. When moving to a new element, the new set of "ending here" values is formed by OR-ing the new element with every value in the previous set, plus the new element by itself (a subarray of length 1). Since OR-ing only ever sets bits (never unsets them), the size of this rolling set stays bounded (by the number of distinct bit patterns, at most ~30 for typical integer ranges), keeping the algorithm efficient. Accumulate every value seen across all positions into an overall result set, and return its size.

## C# Solution

```csharp
public class Solution
{
    public int SubarrayBitwiseORs(int[] arr)
    {
        var result = new HashSet<int>();
        var current = new HashSet<int>();

        foreach (var num in arr)
        {
            var next = new HashSet<int> { num };

            foreach (var prev in current)
                next.Add(prev | num);

            current = next;
            result.UnionWith(current);
        }

        return result.Count;
    }
}
```

## Complexity

- **Time:** `O(n * log(maxValue))`.
- **Space:** `O(n * log(maxValue))` for the result set.
