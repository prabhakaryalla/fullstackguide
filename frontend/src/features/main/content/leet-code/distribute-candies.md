# 575. Distribute Candies

**Difficulty:** Easy
**Category:** Array, Hash Table

## Problem

Given an even-length integer array `candyType` representing the type of each candy, distribute the candies equally between a sister and brother, and return the maximum number of different candy types the sister can eat.

### Example

```
Input: candyType = [1,1,2,2,3,3]
Output: 3
```

### Constraints

- `n == candyType.length`
- `2 <= n <= 10^4`
- `n` is even.

## Approach

The sister receives exactly `n / 2` candies. She can have at most one of each distinct type, so the number of distinct types she can enjoy is capped both by the number of distinct types available and by how many candies she actually receives — take the smaller of the two.

## C# Solution

```csharp
public class Solution
{
    public int DistributeCandies(int[] candyType)
    {
        var uniqueTypes = new HashSet<int>(candyType).Count;
        return Math.Min(uniqueTypes, candyType.Length / 2);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the set of distinct types.
