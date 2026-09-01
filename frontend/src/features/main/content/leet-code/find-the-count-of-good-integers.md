# 3272. Find the Count of Good Integers

**Difficulty:** Hard
**Category:** Hash Table, Math, Enumeration, Combinatorics

## Problem

You are given two positive integers `n` and `k`. A number is called k-palindromic if it is a palindrome and is divisible by `k`. An integer `x` is called good if `x` has exactly `n` digits (no leading zero) and `x` is a permutation of the digits of some k-palindromic integer that also has exactly `n` digits. Return the count of distinct good integers.

### Example

```
Input: n = 3, k = 5
Output: 27
Explanation: Some k-palindromic integers of length 3 are 505, 515, ..., 595.
Each valid digit multiset contributes all of its distinct non-leading-zero permutations to the answer.
```

## Approach

Generate every palindrome of length `n` by enumerating only its first half (`ceil(n/2)` digits, no leading zero), mirroring it to build the full palindrome, and checking divisibility by `k`. For each valid palindrome, compute the sorted digit signature to deduplicate palindromes that share the same multiset of digits (they would produce the same set of permutations). For each unique digit multiset, count the number of distinct permutations of length `n` with no leading zero: `n! / (product of digit-count factorials)` minus the count of permutations that start with `0` (`(n-1)!` variant with one fewer zero available). Sum these counts across all unique digit multisets.

## C# Solution

```csharp
public class Solution 
{
    public long CountGoodIntegers(int n, int k) 
    {
        var seen = new HashSet<string>();
        long answer = 0;

        long[] factorial = new long[11];
        factorial[0] = 1;
        for (int i = 1; i <= 10; i++) 
        {
            factorial[i] = factorial[i - 1] * i;
        }

        int half = (n + 1) / 2;
        int start = (int)Math.Pow(10, half - 1);
        int end = (int)Math.Pow(10, half) - 1;

        for (int p = start; p <= end; p++) 
        {
            string halfStr = p.ToString();
            string full;

            if (n % 2 == 0) 
            {
                char[] rev = halfStr.ToCharArray();
                Array.Reverse(rev);
                full = halfStr + new string(rev);
            } 
            else 
            {
                char[] rev = halfStr.Substring(0, halfStr.Length - 1).ToCharArray();
                Array.Reverse(rev);
                full = halfStr + new string(rev);
            }

            if (long.Parse(full) % k != 0) continue;

            char[] digits = full.ToCharArray();
            Array.Sort(digits);
            string key = new string(digits);
            if (seen.Contains(key)) continue;
            seen.Add(key);

            int[] count = new int[10];
            foreach (char c in digits) 
            {
                count[c - '0']++;
            }

            long totalPerm = factorial[n];
            foreach (int c in count) 
            {
                totalPerm /= factorial[c];
            }

            long withLeadingZero = 0;
            if (count[0] > 0) 
            {
                count[0]--;
                withLeadingZero = factorial[n - 1];
                foreach (int c in count) 
                {
                    withLeadingZero /= factorial[c];
                }
                count[0]++;
            }

            answer += totalPerm - withLeadingZero;
        }

        return answer;
    }
}
```

## Complexity

- **Time:** O(10^(ceil(n/2)) * n)
- **Space:** O(10^(ceil(n/2)))
