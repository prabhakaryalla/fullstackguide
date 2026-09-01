# 2766. Partition String Into Substrings With Values at Most K

**Difficulty:** Medium
**Category:** String, Greedy, Dynamic Programming

## Problem

You are given a string `s` consisting of digits from 1 to 9 and an integer `k`.

A partition of string `s` is called good if:
- Each digit of `s` is part of exactly one substring.
- The value of each substring is less than or equal to `k`.

Return the minimum number of substrings in a good partition of `s`. If no good partition of `s` exists, return `-1`.

### Example

```
Input: s = "165462", k = 60
Output: 4
Explanation: Partition into "16", "54", "6", "2"
```

## Approach

Use a greedy approach: try to make each partition as large as possible while keeping its value ≤ k. Form a number by adding digits one by one until adding the next digit would exceed k, then start a new partition.

## C# Solution

```csharp
public class Solution
{
    public int MinimumPartition(string s, int k)
    {
        int count = 0;
        long current = 0;
        
        foreach (char c in s)
        {
            int digit = c - '0';
            
            if (digit > k)
            {
                return -1;
            }
            
            if (current * 10 + digit > k)
            {
                count++;
                current = digit;
            }
            else
            {
                current = current * 10 + digit;
            }
        }
        
        return count + 1;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
