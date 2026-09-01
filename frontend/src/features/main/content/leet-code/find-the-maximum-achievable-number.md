# 2769. Find the Maximum Achievable Number

**Difficulty:** Easy
**Category:** Math

## Problem

You are given two integers `num` and `t`. In one operation, you can perform one of the following:
- Increase `num` by 1
- Decrease `num` by 1

You can perform at most `t` operations. Another integer `x` exists, which also undergoes at most `t` operations (increasing or decreasing by 1).

Return the maximum possible value of `x`.

### Example

```
Input: num = 4, t = 1
Output: 6
Explanation: Decrease num to 3 (1 operation), increase x to 6 (1 operation). 
We can make x = 6 since num can reach 3 and x can reach 3 from opposite directions, meeting at 3.
Actually: If num starts at 4 and performs t=1 operations, it can reach [3,5].
If x performs t=1 operations, it can reach [x-1, x+1].
For them to match, we need overlap: x-1 <= 5 and x+1 >= 3.
Maximum x: x-1 = 5, so x = 6.
```

## Approach

With `t` operations each, `num` can reach the range `[num - t, num + t]`, and `x` can reach `[x - t, x + t]`.

For these ranges to overlap (so they can reach the same value), we need:
- `x - t <= num + t` 
- `x + t >= num - t`

The maximum value of `x` occurs when `x - t = num + t`, giving `x = num + 2*t`.

## C# Solution

```csharp
public class Solution
{
    public int TheMaximumAchievableX(int num, int t)
    {
        return num + 2 * t;
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
