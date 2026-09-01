# 479. Largest Palindrome Product

**Difficulty:** Hard
**Category:** Math

## Problem

Given an integer `n`, return the largest palindromic number that can be represented as the product of two `n`-digit integers, modulo `1337` (since it can be very large).

### Example

```
Input: n = 2
Output: 987
Explanation: 91 * 99 = 9009, 9009 % 1337 = 987
```

### Constraints

- `1 <= n <= 8`

## Approach

Construct candidate palindromes directly rather than checking every product: iterate the "left half" of a `2 * n`-digit palindrome from the largest possible value downward, mirror it to form a full palindrome, and check whether that palindrome can be expressed as a product of two `n`-digit factors by testing candidate factors from the largest `n`-digit number downward. The first palindrome found this way (checked in decreasing order) is the answer.

## C# Solution

```csharp
public class Solution
{
    public int LargestPalindrome(int n)
    {
        if (n == 1) return 9;

        long upperBound = (long)Math.Pow(10, n) - 1;
        long lowerBound = (long)Math.Pow(10, n - 1);

        for (long half = upperBound; half >= lowerBound; half--)
        {
            long palindrome = BuildPalindrome(half);

            for (long factor = upperBound; factor * factor >= palindrome; factor--)
            {
                if (palindrome % factor == 0 && palindrome / factor <= upperBound)
                    return (int)(palindrome % 1337);
            }
        }

        return -1;
    }

    private long BuildPalindrome(long half)
    {
        var halfStr = half.ToString();
        var reversed = new string(halfStr.Reverse().ToArray());
        return long.Parse(halfStr + reversed);
    }
}
```

## Complexity

- **Time:** Bounded but exponential in the worst case with respect to `n`; feasible since `n <= 8`.
- **Space:** `O(n)` for the string construction.
