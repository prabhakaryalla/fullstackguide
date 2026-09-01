# 3556. Sum of Largest Prime Substrings

**Difficulty:** Medium
**Category:** String, Math, Hash Table

## Problem

Given a string `s` consisting of digits, consider every substring of `s`, interpret each one as an integer (leading zeros simply reduce the value), and identify the substrings whose integer value is prime. Collect the **distinct** prime values found among all substrings, and return the sum of the three largest distinct prime values. If fewer than three distinct primes exist, return the sum of however many are available (or `0` if none exist).

### Example

`s = "13"`. Substrings: `"1" -> 1` (not prime), `"3" -> 3` (prime), `"13" -> 13` (prime). Distinct primes found: `{3, 13}`. Since fewer than three exist, the answer is `3 + 13 = 16`.

## Approach

Enumerate all substrings of `s` using two nested loops, building each substring's numeric value incrementally as a `long` while extending the end index. Test each resulting value for primality with trial division up to its square root, and collect the distinct prime values in a set. Finally, sort the distinct primes in descending order and sum up to the first three.

## C# Solution

```csharp
public class Solution 
{
    public long SumOfLargestPrimes(string s) 
    {
        int n = s.Length;
        HashSet<long> primes = new HashSet<long>();

        for (int i = 0; i < n; i++)
        {
            long value = 0;
            for (int j = i; j < n; j++)
            {
                value = value * 10 + (s[j] - '0');
                if (value > 1_000_000_000_000L) break;
                if (IsPrime(value))
                {
                    primes.Add(value);
                }
            }
        }

        List<long> sorted = new List<long>(primes);
        sorted.Sort();
        sorted.Reverse();

        long sum = 0;
        for (int i = 0; i < Math.Min(3, sorted.Count); i++)
        {
            sum += sorted[i];
        }

        return sum;
    }

    private bool IsPrime(long value) 
    {
        if (value < 2) return false;
        if (value < 4) return true;
        if (value % 2 == 0) return false;
        for (long d = 3; d * d <= value; d += 2)
        {
            if (value % d == 0) return false;
        }
        return true;
    }
}
```

## Complexity

- **Time:** O(n^2 * sqrt(maxValue))
- **Space:** O(n^2)
