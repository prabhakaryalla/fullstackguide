# 2081. Sum of k-Mirror Numbers

**Difficulty:** Hard
**Category:** Math, Enumeration

## Problem

A **k-mirror number** is a positive integer that reads the same forwards and backwards in both base 10 and base `k` (without leading zeros in either representation). Given `k` and `n`, return *the sum of the `n` smallest k-mirror numbers*.

## Approach

Generate decimal palindromes in strictly increasing order using the classic "half generator" technique: for each length, build a palindrome from its first half by mirroring it (handling odd and even total lengths separately), and increment the half to produce the next candidate. For every generated decimal palindrome, convert it to base `k` and check whether that representation is also a palindrome. Collect candidates until `n` k-mirror numbers are found, summing them as we go (using `long` to accommodate potentially large sums).

## C# Solution

```csharp
public class Solution
{
    public long KMirror(int k, int n)
    {
        long sum = 0;
        int found = 0;
        long half = 1;

        while (found < n)
        {
            foreach (var candidate in NextPalindromes(ref half))
            {
                if (IsPalindromeInBase(candidate, k))
                {
                    sum += candidate;
                    found++;
                    if (found == n) return sum;
                }
            }
        }

        return sum;
    }

    private IEnumerable<long> NextPalindromes(ref long half)
    {
        string halfStr = half.ToString();

        string oddPalindrome = halfStr + new string(halfStr.Reverse().Skip(1).ToArray());
        string evenPalindrome = halfStr + new string(halfStr.Reverse().ToArray());

        yield return long.Parse(oddPalindrome);
        yield return long.Parse(evenPalindrome);

        half++;
    }

    private bool IsPalindromeInBase(long number, int baseK)
    {
        var digits = new List<int>();
        long n = number;
        while (n > 0)
        {
            digits.Add((int)(n % baseK));
            n /= baseK;
        }

        int left = 0, right = digits.Count - 1;
        while (left < right)
        {
            if (digits[left] != digits[right]) return false;
            left++;
            right--;
        }

        return true;
    }
}
```

## Complexity

- **Time:** Each candidate palindrome check is `O(log_k(value))`; the number of decimal palindromes examined to find `n` k-mirror numbers is small in practice.
- **Space:** `O(log_k(value))` for the digit list per check.
