# 1732. Find the Highest Altitude

**Difficulty:** Easy
**Category:** Array, Prefix Sum

## Problem

A biker travels a road with `n + 1` points at different altitudes, starting at altitude `0`. Given `gain` where `gain[i]` is the net altitude change between point `i` and point `i + 1`, return the highest altitude reached.

### Example

```
Input: gain = [-5,1,5,0,-7]
Output: 1
```

## Approach

Maintain a running altitude by accumulating `gain` values, tracking the maximum seen along the way.

## C# Solution

```csharp
public class Solution
{
    public int LargestAltitude(int[] gain)
    {
        int current = 0, best = 0;
        foreach (int g in gain)
        {
            current += g;
            best = Math.Max(best, current);
        }
        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
