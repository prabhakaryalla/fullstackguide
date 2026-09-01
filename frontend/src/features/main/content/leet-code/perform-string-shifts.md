# 1427. Perform String Shifts

**Difficulty:** Easy
**Category:** Array, Math, String, Simulation

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a string `s` and a list of shift operations `shift[i] = [direction, amount]` (`direction = 0` for left, `1` for right), apply all shifts in order and return the final string.

### Example

```
Input: s = "abc", shift = [[0,1],[1,2]]
Output: "cab"
```

## Approach

Instead of simulating each shift individually, combine all shifts into a single net left-shift amount (a right shift of `k` is equivalent to a left shift of `-k`). Normalize the net amount modulo the string length into the range `[0, n)`, then perform one rotation: the result is the substring starting at the shift amount, followed by the prefix that was shifted out.

## C# Solution

```csharp
public class Solution
{
    public string StringShift(string s, int[][] shift)
    {
        int n = s.Length;
        long netLeft = 0;

        foreach (var sh in shift)
            netLeft += sh[0] == 0 ? sh[1] : -sh[1];

        int k = (int)(((netLeft % n) + n) % n);

        return s.Substring(k) + s.Substring(0, k);
    }
}
```

## Complexity

- **Time:** `O(n + m)` where `m` is the number of shift operations.
- **Space:** `O(n)` for the resulting string.
