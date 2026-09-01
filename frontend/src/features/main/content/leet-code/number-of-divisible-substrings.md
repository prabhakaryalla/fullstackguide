# 2950. Number of Divisible Substrings

**Difficulty:** Medium
**Category:** String, Hash Table
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a string `word` containing only digits. A substring is divisible if when you map each digit to its corresponding value and sum them, the sum is divisible by the substring's length. Return the count of divisible substrings.

### Example

```
Input: word = "1248"
Output: 4
Explanation: Substrings "1", "2", "4", "8" have sum = length.
```

## Approach

Use a brute force approach to check all substrings. For each substring, calculate the sum of digit values and check if it's divisible by the substring length. Count valid substrings.

## C# Solution

```csharp
public class Solution 
{
    public int CountDivisibleSubstrings(string word) 
    {
        int count = 0;
        int n = word.Length;
        
        for (int i = 0; i < n; i++) 
        {
            int sum = 0;
            for (int j = i; j < n; j++) 
            {
                sum += word[j] - '0';
                int len = j - i + 1;
                
                if (sum % len == 0) 
                {
                    count++;
                }
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n^2)
- **Space:** O(1)
