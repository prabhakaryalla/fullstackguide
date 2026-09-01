# 2539. Count the Number of Good Subsequences

**Difficulty:** Medium
**Category:** String, Hash Table, Math
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a string `s`. A subsequence of `s` is considered good if the absolute difference between the maximum and minimum frequency of any character in the subsequence is at most `1`.

Return the number of good subsequences of `s`. Since the answer may be too large, return it modulo `10^9 + 7`.

### Example

```
Input: s = "aabb"
Output: 11
Explanation: Good subsequences include "", "a", "aa", "ab", "abb", "b", "bb", etc.

Input: s = "leet"
Output: 12
```

## Approach

Group characters by frequency. For a subsequence to be good, all included characters must appear with frequencies that differ by at most 1.

Use combinatorics:
1. For each possible (min_freq, max_freq) pair where max_freq - min_freq ≤ 1:
   - Count how many ways to select characters with these frequencies
   - Use combinations: choose which characters appear min_freq times and which appear max_freq times
2. Sum all possibilities

Handle the modular arithmetic carefully for factorials and combinations.

## C# Solution

```csharp
public class Solution
{
    public int CountGoodSubsequences(string s)
    {
        const int MOD = 1_000_000_007;
        var freq = new Dictionary<char, int>();
        
        foreach (char c in s)
            freq[c] = freq.GetValueOrDefault(c, 0) + 1;
        
        // Group characters by frequency
        var freqCount = new Dictionary<int, int>();
        foreach (var count in freq.Values)
            freqCount[count] = freqCount.GetValueOrDefault(count, 0) + 1;
        
        long result = 0;
        
        // For each frequency k, compute number of subsequences
        for (int k = 1; k <= s.Length; k++)
        {
            long ways = 1;
            
            foreach (var kvp in freqCount)
            {
                int charFreq = kvp.Key;
                int charCount = kvp.Value;
                
                if (charFreq >= k)
                {
                    // Choose k occurrences from this character
                    long choose = Combination(charFreq, k, MOD);
                    // Decide whether to include this character
                    ways = (ways * (ModPow(2, charCount, MOD) - 1 + choose * charCount % MOD)) % MOD;
                }
            }
            
            result = (result + ways) % MOD;
        }
        
        return (int)result;
    }
    
    private long Combination(int n, int k, long mod)
    {
        if (k > n) return 0;
        long result = 1;
        for (int i = 0; i < k; i++)
        {
            result = result * (n - i) % mod;
            result = result * ModInverse(i + 1, mod) % mod;
        }
        return result;
    }
    
    private long ModPow(long b, int exp, long mod)
    {
        long result = 1;
        while (exp > 0)
        {
            if (exp % 2 == 1) result = result * b % mod;
            b = b * b % mod;
            exp /= 2;
        }
        return result;
    }
    
    private long ModInverse(long a, long mod)
    {
        return ModPow(a, (int)(mod - 2), mod);
    }
}
```

## Complexity

- **Time:** O(n + k²) where k is the max frequency
- **Space:** O(n) for frequency maps
