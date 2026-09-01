# 1431. Kids With the Greatest Number of Candies

**Difficulty:** Easy
**Category:** Array

## Problem

Given `candies[i]` representing candies each kid has and an integer `extraCandies`, return a boolean array where entry `i` is `true` if giving kid `i` all `extraCandies` would make them have the greatest number of candies among all kids (ties allowed).

### Example

```
Input: candies = [2,3,5,1,3], extraCandies = 3
Output: [true,true,true,false,true]
```

## Approach

Find the current maximum candy count. For each kid, check whether their candies plus `extraCandies` reaches or exceeds that maximum.

## C# Solution

```csharp
public class Solution
{
    public IList<bool> KidsWithCandies(int[] candies, int extraCandies)
    {
        int max = candies.Max();
        return candies.Select(c => c + extraCandies >= max).ToList();
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the result list.
