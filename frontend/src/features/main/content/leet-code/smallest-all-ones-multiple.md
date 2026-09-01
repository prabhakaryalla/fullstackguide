# 3790. Smallest All-Ones Multiple

**Difficulty:** Medium
**Category:** Hash Table, Math

## Problem

Given a positive integer `k`, find the smallest integer `n` divisible by `k` that consists only of the digit 1 (a repunit: 1, 11, 111, ...). Return the number of digits of `n`, or `-1` if no such `n` exists.

### Example

Input: `k = 3`
Output: `3`

`111` is divisible by 3; `1` and `11` are not.

## Approach

Build the repunit digit by digit while tracking only its remainder modulo `k`: `rem = (rem * 10 + 1) % k`. If `rem` ever becomes `0`, the current digit count is the answer. If a remainder repeats before reaching `0`, a cycle has formed and no such number exists — return `-1`.

## C# Solution

```csharp
public class Solution 
{
    public int SmallestRepunitLength(int k) 
    {
        long rem = 1 % k;
        int count = 1;
        if (rem == 0) return count;

        var seen = new bool[k];
        seen[rem] = true;
        while (true)
        {
            rem = (rem * 10 + 1) % k;
            count++;
            if (rem == 0) return count;
            if (seen[rem]) return -1;
            seen[rem] = true;
        }
    }
}
```

## Complexity

- **Time:** O(k)
- **Space:** O(k)
