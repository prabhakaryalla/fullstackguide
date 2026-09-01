# 2847. Smallest Number With Given Digit Product

**Difficulty:** Medium
**Category:** Math, Greedy
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a positive integer `n`, return the smallest positive integer (as a string) whose digits multiply together to equal `n`. If no such integer exists, return `"-1"`.

### Example

Input: n = 105
Output: "357"
Explanation: 3 × 5 × 7 = 105, and no smaller arrangement or shorter digit sequence produces the same product.

## Approach

Greedily factor `n` using digits from 9 down to 2 (largest digits first minimizes the number of digits used, which minimizes the resulting number's length). For each digit `d` from 9 down to 2, repeatedly divide `n` by `d` while it divides evenly, recording `d` each time. After trying all digits down to 2, if `n` isn't reduced to exactly 1, no valid digit product exists, so return `"-1"`. Otherwise, sort the collected digits in ascending order (smallest digits first minimizes the numeric value for a fixed multiset of digits, since there are never any zeros) and join them into the result string. The special case `n = 1` returns `"1"` directly.

## C# Solution

```csharp
public class Solution 
{
    public string SmallestNumber(long n) 
    {
        if (n == 1) return "1";

        var digits = new List<int>();

        for (int d = 9; d >= 2; d--) 
        {
            while (n % d == 0) 
            {
                digits.Add(d);
                n /= d;
            }
        }

        if (n != 1) return "-1";

        digits.Sort();
        var sb = new System.Text.StringBuilder();
        foreach (int d in digits) sb.Append(d);

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** O(log n)
- **Space:** O(log n)
