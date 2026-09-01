# 2514. Count Anagrams

**Difficulty:** Hard
**Category:** Math, String, Combinatorics

## Problem

You are given a string `s` containing one or more words. Every consecutive pair of words is separated by a single space `' '`.

A string `t` is an anagram of string `s` if the `i-th` word of `t` is a permutation of the `i-th` word of `s`.

Return the number of distinct anagrams of `s`. Since the answer may be very large, return it modulo `10^9 + 7`.

### Example

```
Input: s = "too hot"
Output: 18
Explanation: "too" has 3!/2! = 3 distinct permutations, "hot" has 3! = 6 distinct permutations. Total = 3 × 6 = 18.
```

## Approach

For each word, calculate the number of distinct permutations using the formula: `n! / (count1! × count2! × ... × countk!)` where n is the length of the word and counti is the frequency of each character. Multiply the results for all words together.

## C# Solution

```csharp
public class Solution
{
    private const int MOD = 1000000007;
    
    public int CountAnagrams(string s)
    {
        string[] words = s.Split(' ');
        long result = 1;
        
        foreach (string word in words)
        {
            result = (result * CountPermutations(word)) % MOD;
        }
        
        return (int)result;
    }
    
    private long CountPermutations(string word)
    {
        int n = word.Length;
        Dictionary<char, int> freq = new Dictionary<char, int>();
        
        foreach (char c in word)
        {
            freq[c] = freq.GetValueOrDefault(c, 0) + 1;
        }
        
        long numerator = Factorial(n);
        long denominator = 1;
        
        foreach (int count in freq.Values)
        {
            denominator = (denominator * Factorial(count)) % MOD;
        }
        
        return (numerator * ModInverse(denominator, MOD)) % MOD;
    }
    
    private long Factorial(int n)
    {
        long result = 1;
        for (int i = 2; i <= n; i++)
        {
            result = (result * i) % MOD;
        }
        return result;
    }
    
    private long ModInverse(long a, long mod)
    {
        return ModPow(a, mod - 2, mod);
    }
    
    private long ModPow(long baseVal, long exp, long mod)
    {
        long result = 1;
        baseVal %= mod;
        
        while (exp > 0)
        {
            if (exp % 2 == 1)
            {
                result = (result * baseVal) % mod;
            }
            baseVal = (baseVal * baseVal) % mod;
            exp /= 2;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n) where n is the total length of the string
- **Space:** O(k) where k is the number of unique characters
