# 2156. Find Substring With Given Hash Value

**Difficulty:** Hard
**Category:** String, Sliding Window, Rolling Hash

## Problem

You are given a string `s`, integers `power`, `modulo`, `k`, and `hashValue`. A substring is defined by its hash value using a specific polynomial rolling hash function.

Return the substring with length `k` that has hash value equal to `hashValue`. There will be exactly one such substring.

### Example

```
Input: s = "leetcode", power = 7, modulo = 20, k = 2, hashValue = 0
Output: "ee"
```

## Approach

Use rolling hash technique, but compute from right to left to avoid overflow issues with modular inverse. For a substring ending at position `i`:
- Calculate hash using the formula: hash = (val[0] * p^(k-1) + val[1] * p^(k-2) + ... + val[k-1]) % m
- Slide the window by removing the leftmost character and adding a new rightmost character

Computing from right to left allows us to incrementally update the hash without needing modular inverse.

## C# Solution

```csharp
public class Solution
{
    public string SubStrHash(string s, int power, int modulo, int k, int hashValue)
    {
        int n = s.Length;
        long hash = 0;
        long powerK = 1;
        int resultIndex = 0;
        
        // Calculate power^k mod modulo
        for (int i = 0; i < k; i++)
        {
            powerK = (powerK * power) % modulo;
        }
        
        // Start from the end and compute hash
        for (int i = n - 1; i >= 0; i--)
        {
            // Add current character
            hash = (hash * power + (s[i] - 'a' + 1)) % modulo;
            
            if (i + k < n)
            {
                // Remove the character k positions ahead
                hash = (hash - (s[i + k] - 'a' + 1) * powerK % modulo + modulo) % modulo;
            }
            
            if (i + k - 1 < n && hash == hashValue)
            {
                resultIndex = i;
            }
        }
        
        return s.Substring(resultIndex, k);
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the string
- **Space:** O(1)
