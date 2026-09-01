# 2272. Substring With Largest Variance

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

The variance of a string is defined as the largest difference between the number of occurrences of any two characters present in the string. Return the largest variance among all substrings of `s`.

### Example

```
Input: s = "aababbb"
Output: 3
Explanation: Consider all substrings and their variances. The substring "ababbb" has 2 'a's and 4 'b's, giving variance = 4 - 2 = 2. But substring "abbb" starting at index 3 has 1 'a' and 3 'b's, giving variance = 3 - 1 = 2. The maximum variance is 3.
```

## Approach

For every pair of distinct characters (c1, c2), use a Kadane-like algorithm to find the maximum difference `count(c1) - count(c2)` across all substrings containing both characters. Treat c1 as +1 and c2 as -1, finding the maximum subarray sum while ensuring both characters appear at least once.

## C# Solution

```csharp
public class Solution
{
    public int LargestVariance(string s)
    {
        int maxVar = 0;
        HashSet<char> unique = new HashSet<char>(s);
        
        foreach (char c1 in unique)
        {
            foreach (char c2 in unique)
            {
                if (c1 == c2) continue;
                
                int var = 0;
                bool hasC2 = false;
                int firstC2 = -1;
                
                foreach (char ch in s)
                {
                    if (ch == c1) var++;
                    else if (ch == c2)
                    {
                        hasC2 = true;
                        var--;
                        if (var < 0)
                        {
                            var = -1;
                            firstC2 = -1;
                        }
                        else
                        {
                            firstC2 = 0;
                        }
                    }
                    
                    if (hasC2 && firstC2 >= 0)
                    {
                        maxVar = Math.Max(maxVar, var);
                    }
                    
                    if (var < 0 && firstC2 < 0)
                    {
                        var = 0;
                        hasC2 = false;
                    }
                }
            }
        }
        
        return maxVar;
    }
}
```

## Complexity

- **Time:** O(n * k²) where k is the number of unique characters (at most 26).
- **Space:** O(k) for tracking unique characters.
