# 2663. Lexicographically Smallest Beautiful String

**Difficulty:** Hard
**Category:** String, Greedy, Combinatorics

## Problem

A string is beautiful if:
- It consists of the first `k` letters of the English lowercase alphabet.
- It does not contain any substring of length 2 or more which is a palindrome.

You are given a beautiful string `s` of length `n` and a positive integer `k`.

Return the lexicographically smallest string of length `n` that is larger than `s` and is beautiful. If there is no such string, return an empty string.

### Example

```
Input: s = "abcz", k = 26
Output: "abda"
Explanation: The next lexicographically larger string is "abda", which is beautiful (no palindromic substrings of length >= 2).

Input: s = "dc", k = 4
Output: ""
Explanation: There is no beautiful string lexicographically larger than "dc" with k = 4.
```

## Approach

This is a next permutation-style problem with palindrome constraints. Starting from the rightmost position, try to increment each character. After incrementing, ensure no palindromic substrings exist by checking the previous two characters. Fill remaining positions greedily with the smallest valid characters.

## C# Solution

```csharp
public class Solution
{
    public string SmallestBeautifulString(string s, int k)
    {
        char[] arr = s.ToCharArray();
        int n = arr.Length;
        int i = n - 1;
        
        while (i >= 0)
        {
            arr[i]++;
            
            if (arr[i] >= 'a' + k)
            {
                i--;
                continue;
            }
            
            if ((i > 0 && arr[i] == arr[i - 1]) || (i > 1 && arr[i] == arr[i - 2]))
            {
                continue;
            }
            
            for (int j = i + 1; j < n; j++)
            {
                arr[j] = 'a';
                while ((j > 0 && arr[j] == arr[j - 1]) || (j > 1 && arr[j] == arr[j - 2]))
                {
                    arr[j]++;
                    if (arr[j] >= 'a' + k)
                    {
                        break;
                    }
                }
                
                if (arr[j] >= 'a' + k)
                {
                    break;
                }
            }
            
            if (i + 1 < n && arr[n - 1] >= 'a' + k)
            {
                continue;
            }
            
            return new string(arr);
        }
        
        return "";
    }
}
```

## Complexity

- **Time:** O(n * k) in worst case
- **Space:** O(n) for the character array
