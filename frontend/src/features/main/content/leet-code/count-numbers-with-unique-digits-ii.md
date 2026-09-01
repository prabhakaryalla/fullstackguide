# 3032. Count Numbers With Unique Digits II

**Difficulty:** Easy
**Category:** Math, Dynamic Programming, Hash Table

## Problem

Given two positive integers `a` and `b`, return the count of integers in the inclusive range `[a, b]` whose digits are all distinct (no digit repeats).

### Example

```
Input: a = 1, b = 20
Output: 19
Explanation: Every number from 1 to 20 has all-unique digits except 11, so the count is 20 - 1 = 19.
```

## Approach

The constraints are small enough to check every number in the range directly: for each candidate, repeatedly peel off its last digit and track which digits have been seen with a boolean array of size 10; if a digit repeats, the number is disqualified.

## C# Solution

```csharp
public class Solution {
    public int NumberCount(int a, int b) {
        int ans = 0;
        for (int num = a; num <= b; num++)
            if (IsUniqueDigits(num))
                ans++;
        return ans;
    }

    private bool IsUniqueDigits(int num) {
        bool[] seen = new bool[10];
        while (num > 0) {
            int digit = num % 10;
            if (seen[digit])
                return false;
            seen[digit] = true;
            num /= 10;
        }
        return true;
    }
}
```

## Complexity

- Time: O((b - a) * log(b)) — each number is checked digit by digit.
- Space: O(1) — the seen-digits array has a fixed size of 10.
