# 3345. Smallest Divisible Digit Product I

**Difficulty:** Easy
**Category:** Math, Enumeration

## Problem

Given two integers `n` and `t`, return the smallest number greater than or equal to `n` such that the product of its digits is divisible by `t`.

### Example

Input: `n = 15, t = 3`

Output: `16`

Explanation: The digit product of 16 is 6, which is divisible by 3.

## Approach

Since the constraints are tiny (`n <= 100`, `t <= 10`), simply check candidates starting from `n` upward: compute the product of digits of each candidate and return the first one whose digit product is divisible by `t`.

## C# Solution

```csharp
public class Solution 
{
    public int SmallestNumber(int n, int t) 
    {
        int cur = n;
        while (true)
        {
            int product = 1;
            foreach (char c in cur.ToString())
            {
                product *= (c - '0');
            }
            if (product % t == 0) return cur;
            cur++;
        }
    }
}
```

## Complexity

- **Time:** O(k * log(k)) where k is the number of candidates checked (at most a handful given the small bound).
- **Space:** O(1) extra space.
