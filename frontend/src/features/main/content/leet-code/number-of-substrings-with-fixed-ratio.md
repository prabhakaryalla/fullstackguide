# 2489. Number of Substrings With Fixed Ratio

**Difficulty:** Medium
**Category:** Hash Table, Math, String, Prefix Sum

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a binary string `s` and two integers `num1` and `num2`. A substring is good if the ratio of the number of 0's to the number of 1's equals `num1 / num2`.

Return the number of non-empty good substrings in `s`.

### Example

```
Input: s = "0110011", num1 = 1, num2 = 2
Output: 4
Explanation: Good substrings where ratio of 0's to 1's is 1:2
```

## Approach

Use prefix sums with a hash map:
1. Transform the problem: for each position, track `count0 * num2 - count1 * num1`
2. If this value is the same at two positions, the substring between them has the required ratio
3. Use a hash map to count occurrences of each transformed value

## C# Solution

```csharp
public class Solution
{
    public long FixedRatio(string s, int num1, int num2)
    {
        var map = new Dictionary<long, int>();
        map[0] = 1;
        
        long result = 0;
        int count0 = 0;
        int count1 = 0;
        
        foreach (char c in s)
        {
            if (c == '0')
            {
                count0++;
            }
            else
            {
                count1++;
            }
            
            long balance = (long)count0 * num2 - (long)count1 * num1;
            
            if (map.ContainsKey(balance))
            {
                result += map[balance];
                map[balance]++;
            }
            else
            {
                map[balance] = 1;
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the string
- **Space:** O(n) for the hash map
