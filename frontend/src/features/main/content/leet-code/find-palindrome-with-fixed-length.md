# 2217. Find Palindrome With Fixed Length

**Difficulty:** Medium
**Category:** Array, Math

## Problem

Given an integer array `queries` and a positive integer `intLength`, return an array `answer` where `answer[i]` is either the `queries[i]`-th smallest positive palindrome of length `intLength`, or -1 if no such palindrome exists.

A palindrome is a number that reads the same backward as forward.

### Example

```
Input: queries = [1,2,3,4,5,90], intLength = 3
Output: [101,111,121,131,141,999]
Explanation: The first few 3-digit palindromes are:
101, 111, 121, 131, 141, 151, 161, 171, 181, 191, ...
```

## Approach

For a palindrome of length `intLength`:
- If length is odd, we control the first `(intLength + 1) / 2` digits
- If length is even, we control the first `intLength / 2` digits
- The remaining digits are mirrored

The number of palindromes = 9 * 10^(halfLength - 1), where halfLength = ceil(intLength / 2)

To find the k-th palindrome:
1. Calculate the first half from the query number
2. Mirror it to create the full palindrome

## C# Solution

```csharp
public class Solution
{
    public long[] KthPalindrome(int[] queries, int intLength)
    {
        long[] result = new long[queries.Length];
        
        int halfLength = (intLength + 1) / 2;
        long start = (long)Math.Pow(10, halfLength - 1);
        long totalPalindromes = 9 * (long)Math.Pow(10, halfLength - 1);
        
        for (int i = 0; i < queries.Length; i++)
        {
            int query = queries[i];
            
            if (query > totalPalindromes)
            {
                result[i] = -1;
                continue;
            }
            
            // Find the first half
            long firstHalf = start + query - 1;
            
            // Build the palindrome
            string firstHalfStr = firstHalf.ToString();
            string palindrome;
            
            if (intLength % 2 == 0)
            {
                // Even length: mirror entire first half
                palindrome = firstHalfStr + Reverse(firstHalfStr);
            }
            else
            {
                // Odd length: mirror all but last digit
                palindrome = firstHalfStr + Reverse(firstHalfStr.Substring(0, firstHalfStr.Length - 1));
            }
            
            result[i] = long.Parse(palindrome);
        }
        
        return result;
    }
    
    private string Reverse(string s)
    {
        char[] arr = s.ToCharArray();
        Array.Reverse(arr);
        return new string(arr);
    }
}
```

## Complexity

- **Time:** O(q * intLength), where q is the number of queries
- **Space:** O(intLength), for string operations
