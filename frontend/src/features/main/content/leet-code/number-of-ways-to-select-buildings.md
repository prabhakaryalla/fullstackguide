# 2222. Number of Ways to Select Buildings

**Difficulty:** Medium
**Category:** String, Dynamic Programming, Prefix Sum

## Problem

You are given a 0-indexed binary string `s` which represents the types of buildings along a street where:
- `s[i] = '0'` denotes that the i-th building is an office
- `s[i] = '1'` denotes that the i-th building is a restaurant

As a city official, you would like to select 3 buildings for random inspection. However, to ensure variety, no two consecutive buildings can be of the same type.

Return the number of valid ways to select 3 buildings.

### Example

```
Input: s = "001101"
Output: 6
Explanation: Valid selections:
- "001101" (indices 0,2,4)
- "001101" (indices 0,2,5)
- "001101" (indices 0,3,4)
- "001101" (indices 0,3,5)
- "001101" (indices 1,3,5)
- "001101" (indices 2,4,5)
```

## Approach

We need to count subsequences of pattern "010" or "101".

For each position, count:
- How many "0"s before it
- How many "1"s before it
- How many "0"s after it
- How many "1"s after it

For pattern "010": if s[i] == '1', count = (zeros before) * (zeros after)
For pattern "101": if s[i] == '0', count = (ones before) * (ones after)

## C# Solution

```csharp
public class Solution
{
    public long NumberOfWays(string s)
    {
        int n = s.Length;
        
        // Count zeros and ones before each position
        int[] zerosBefore = new int[n];
        int[] onesBefore = new int[n];
        
        int zeros = 0, ones = 0;
        for (int i = 0; i < n; i++)
        {
            zerosBefore[i] = zeros;
            onesBefore[i] = ones;
            
            if (s[i] == '0') zeros++;
            else ones++;
        }
        
        // Count zeros and ones after each position
        int[] zerosAfter = new int[n];
        int[] onesAfter = new int[n];
        
        zeros = 0;
        ones = 0;
        for (int i = n - 1; i >= 0; i--)
        {
            zerosAfter[i] = zeros;
            onesAfter[i] = ones;
            
            if (s[i] == '0') zeros++;
            else ones++;
        }
        
        long count = 0;
        
        for (int i = 0; i < n; i++)
        {
            if (s[i] == '0')
            {
                // Pattern 101
                count += (long)onesBefore[i] * onesAfter[i];
            }
            else
            {
                // Pattern 010
                count += (long)zerosBefore[i] * zerosAfter[i];
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n), where n is the length of the string
- **Space:** O(n), for the count arrays
