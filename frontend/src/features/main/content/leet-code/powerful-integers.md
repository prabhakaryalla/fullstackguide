# 970. Powerful Integers

**Difficulty:** Medium
**Category:** Hash Table, Math

## Problem

Given integers `x`, `y`, and `bound`, return a list of all distinct integers `<= bound` that can be written as `x^i + y^j` for non-negative integers `i` and `j`.

### Example

```
Input: x = 2, y = 3, bound = 10
Output: [2,3,4,5,7,9,10]
```

## Approach

Enumerate every combination of `x^i` and `y^j` that stays within `bound`, stopping the exponent growth once a power exceeds `bound`. Guard against infinite loops when `x` or `y` equals `1` (its powers never grow) by breaking after considering the single power-of-1 case. Collect all valid sums into a set to naturally deduplicate.

## C# Solution

```csharp
public class Solution
{
    public IList<int> PowerfulIntegers(int x, int y, int bound)
    {
        var set = new HashSet<int>();

        for (long a = 1; a < bound; a *= x)
        {
            for (long b = 1; a + b <= bound; b *= y)
            {
                set.Add((int)(a + b));
                if (y == 1) break;
            }

            if (x == 1) break;
        }

        return set.ToList();
    }
}
```

## Complexity

- **Time:** `O(log_x(bound) * log_y(bound))`.
- **Space:** `O(result size)`.
