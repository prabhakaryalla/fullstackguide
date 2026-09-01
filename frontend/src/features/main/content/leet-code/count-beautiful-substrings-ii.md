# 2949. Count Beautiful Substrings II

**Difficulty:** Hard
**Category:** String, Hash Table, Prefix Sum, Number Theory

## Problem

Similar to problem 2947 but with larger constraints requiring optimization. Count beautiful substrings where vowel count equals consonant count and their product is divisible by `k`.

### Example

```
Input: s = "baeyh", k = 2
Output: 2
```

## Approach

Use prefix sums with hash maps. Track the balance (vowels - consonants) and use modular arithmetic properties. For the product condition, since count*count must be divisible by k, we need count divisible by sqrt factors of k. Use a hash map to store states (balance, count mod period) where period relates to k's factorization.

## C# Solution

```csharp
public class Solution 
{
    public long BeautifulSubstrings(string s, int k) 
    {
        var vowels = new HashSet<char> { 'a', 'e', 'i', 'o', 'u' };
        int period = 1;
        
        while ((period * period) % k != 0) 
        {
            period++;
        }
        
        var map = new Dictionary<(int, int), long>();
        map[(0, 0)] = 1;
        
        int balance = 0;
        int vCount = 0;
        long result = 0;
        
        for (int i = 0; i < s.Length; i++) 
        {
            if (vowels.Contains(s[i])) 
            {
                balance++;
                vCount++;
            } 
            else 
            {
                balance--;
            }
            
            int mod = vCount % period;
            var key = (balance, mod);
            result += map.GetValueOrDefault(key, 0);
            map[key] = map.GetValueOrDefault(key, 0) + 1;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n * sqrt(k))
- **Space:** O(n * sqrt(k))
