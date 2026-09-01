# 2177. Find Three Consecutive Integers That Sum to a Given Number

**Difficulty:** Medium
**Category:** Math

## Problem

Given an integer `num`, return three consecutive integers (as an array) that sum to `num`. If no such integers exist, return an empty array.

### Example

```
Input: num = 33
Output: [10,11,12]
Explanation: 10 + 11 + 12 = 33

Input: num = 4
Output: []
Explanation: No three consecutive integers sum to 4
```

## Approach

Let the three consecutive integers be `x`, `x+1`, `x+2`. Their sum is:
```
x + (x+1) + (x+2) = 3x + 3 = num
```

Solving for x:
```
3x = num - 3
x = (num - 3) / 3
```

For a valid solution, `num - 3` must be divisible by 3.

## C# Solution

```csharp
public class Solution
{
    public long[] SumOfThree(long num)
    {
        if ((num - 3) % 3 != 0)
            return new long[0];
        
        long x = (num - 3) / 3;
        return new long[] { x, x + 1, x + 2 };
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
