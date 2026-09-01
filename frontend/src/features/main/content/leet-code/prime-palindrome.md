# 866. Prime Palindrome

**Difficulty:** Medium
**Category:** Math, Enumeration

## Problem

Given an integer `n`, return the smallest prime number that is also a palindrome and is greater than or equal to `n`.

### Example

```
Input: n = 13
Output: 101
```

## Approach

Handle small cases (`n <= 11`) directly by checking the known small primes. For larger `n`, note that any even-length palindrome greater than 11 is always divisible by 11 (by the alternating-digit-sum rule for palindromes of even length), so it can never be prime — meaning only odd-length palindromes need to be generated. For each odd length, generate every palindrome by choosing its first half of digits and mirroring it (dropping the duplicated middle digit), then test each generated palindrome for primality once it reaches or exceeds `n`, returning the first prime found.

## C# Solution

```csharp
public class Solution
{
    public int PrimePalindrome(int n)
    {
        if (n <= 2) return 2;
        if (n <= 3) return 3;
        if (n <= 5) return 5;
        if (n <= 7) return 7;
        if (n <= 11) return 11;

        for (int length = 3; length <= 9; length += 2)
        {
            int halfLength = (length + 1) / 2;
            int start = (int)Math.Pow(10, halfLength - 1);
            int end = (int)Math.Pow(10, halfLength);

            for (int half = start; half < end; half++)
            {
                string halfStr = half.ToString();
                string mirror = new string(halfStr.Reverse().ToArray());
                string fullStr = halfStr + mirror.Substring(1);

                long candidate = long.Parse(fullStr);

                if (candidate >= n && IsPrime(candidate))
                    return (int)candidate;
            }
        }

        return -1;
    }

    private bool IsPrime(long num)
    {
        if (num < 2) return false;
        if (num % 2 == 0) return num == 2;

        for (long i = 3; i * i <= num; i += 2)
        {
            if (num % i == 0) return false;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(sqrt(10^9))` in the worst case for primality checks across generated candidates.
- **Space:** `O(1)` extra.
