# 672. Bulb Switcher II

**Difficulty:** Medium
**Category:** Math, Bit Manipulation, Brainteaser

## Problem

There are `n` bulbs in a row, all initially on. There are 4 buttons that can flip: all bulbs, even-indexed bulbs, odd-indexed bulbs, or bulbs at indices `3k + 1`. Given `n` bulbs and exactly `presses` button presses (each press picks one of the 4 buttons, possibly repeating), return the number of distinct possible bulb configurations.

### Example

```
Input: n = 1, presses = 1
Output: 2
```

### Constraints

- `0 <= n <= 1000`
- `0 <= presses <= 1000`

## Approach

Since each button's effect only depends on a bulb's index modulo a small period, the first 3 bulbs fully determine every other bulb's state (patterns repeat every 3 or fewer positions), so cap the effective `n` at 3. With that reduction, only a handful of distinct reachable configurations exist, distinguished by whether `presses` is 0, exactly 1, exactly 2, or 3 or more (since after enough presses, effects can cancel out or combine to reach every remaining reachable state), letting the result be determined directly from these small cases.

## C# Solution

```csharp
public class Solution
{
    public int FlipLights(int n, int presses)
    {
        n = Math.Min(n, 3);

        if (presses == 0) return 1;
        if (presses == 1) return n == 1 ? 2 : (n == 2 ? 3 : 4);
        if (presses == 2) return n == 1 ? 2 : (n == 2 ? 4 : 4);

        return n == 1 ? 2 : (n == 2 ? 4 : 8);
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
