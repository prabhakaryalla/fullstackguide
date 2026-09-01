# 1742. Maximum Number of Balls in a Box

**Difficulty:** Easy
**Category:** Math, Hash Table

## Problem

Balls numbered from `lowLimit` to `highLimit` are placed into boxes, where a ball goes into the box whose number equals the digit sum of the ball's number. Return the number of balls in the box that contains the most balls.

### Example

```
Input: lowLimit = 1, highLimit = 10
Output: 2
```

## Approach

For every ball number, compute its digit sum and increment a counter for that digit-sum "box" using a hash map, tracking the maximum count seen.

## C# Solution

```csharp
public class Solution
{
    public int CountBalls(int lowLimit, int highLimit)
    {
        var count = new Dictionary<int, int>();
        int best = 0;

        for (int i = lowLimit; i <= highLimit; i++)
        {
            int sum = 0, x = i;
            while (x > 0)
            {
                sum += x % 10;
                x /= 10;
            }

            count[sum] = count.GetValueOrDefault(sum, 0) + 1;
            best = Math.Max(best, count[sum]);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n log(max))` where `n = highLimit - lowLimit + 1`.
- **Space:** `O(log(max))` distinct digit-sum boxes.
