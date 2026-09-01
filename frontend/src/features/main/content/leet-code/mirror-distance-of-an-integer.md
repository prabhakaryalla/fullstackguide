# 3783. Mirror Distance of an Integer

**Difficulty:** Easy
**Category:** Math

## Problem

Given an integer `n`, its mirror distance is `abs(n - reverse(n))`, where `reverse(n)` reverses the digits of `n`. Return the mirror distance.

### Example

Input: `n = 25`
Output: `27`

`reverse(25) = 52`, so `abs(25 - 52) = 27`.

## Approach

Reverse the digits of `n` via repeated division/modulo (naturally dropping trailing zeros as leading zeros of the reversed number), then return the absolute difference.

## C# Solution

```csharp
public class Solution 
{
    public int MirrorDistance(int n) 
    {
        long reversed = 0;
        long x = n;
        while (x > 0)
        {
            reversed = reversed * 10 + x % 10;
            x /= 10;
        }
        return (int)Math.Abs(n - reversed);
    }
}
```

## Complexity

- **Time:** O(log n)
- **Space:** O(1)
