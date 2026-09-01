# 991. Broken Calculator

**Difficulty:** Medium
**Category:** Math, Greedy

## Problem

A calculator display starts at `startValue`. In one operation you can either double the display or subtract 1 from it. Return the minimum number of operations to reach `target`.

### Example

```
Input: startValue = 2, target = 3
Output: 2
```

## Approach

Work backward from `target` toward `startValue`: while `target` is still bigger, if it's even, the last forward operation must have been a doubling, so undo it by halving; if it's odd, the last operation must have been a subtraction, so undo it by incrementing. Once `target` drops to `startValue` or below, any remaining gap is closed with plain subtractions (each forward `-1` maps directly).

## C# Solution

```csharp
public class Solution
{
    public int BrokenCalc(int startValue, int target)
    {
        int operations = 0;

        while (target > startValue)
        {
            if (target % 2 == 0) target /= 2;
            else target++;

            operations++;
        }

        return operations + (startValue - target);
    }
}
```

## Complexity

- **Time:** `O(log(target))`.
- **Space:** `O(1)`.
