# 2275. Largest Combination With Bitwise AND Greater Than Zero

**Difficulty:** Medium
**Category:** Array, Hash Table, Bit Manipulation, Counting

## Problem

Given an array of positive integers `candidates`, return the size of the largest combination of candidates with a bitwise AND greater than 0.

### Example

```
Input: candidates = [16,17,71,62,12,24,14]
Output: 4
Explanation: 16, 62, 24, and 14 share the 4th bit
```

## Approach

For each bit position (0 to 30), count how many numbers have that bit set. The maximum count across all bit positions is the answer, as all numbers with a common bit set will have AND > 0.

## C# Solution

```csharp
public class Solution
{
    public int LargestCombination(int[] candidates)
    {
        int maxCount = 0;
        for (int bit = 0; bit < 30; bit++)
        {
            int count = 0;
            foreach (var num in candidates)
            {
                if ((num & (1 << bit)) != 0)
                {
                    count++;
                }
            }
            maxCount = Math.Max(maxCount, count);
        }
        return maxCount;
    }
}
```

## Complexity

- **Time:** O(n * 30) = O(n)
- **Space:** O(1)
