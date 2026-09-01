# 2516. Take K of Each Character From Left and Right

**Difficulty:** Medium
**Category:** Hash Table, String, Sliding Window

## Problem

You are given a string `s` consisting of the characters 'a', 'b', and 'c' and a non-negative integer `k`. Each minute, you can take either the leftmost or rightmost character of `s`.

Return the minimum number of minutes needed to take at least `k` of each character, or return -1 if it is not possible.

### Example

```
Input: s = "aabaaaacaabc", k = 2
Output: 8
Explanation: Take 3 characters from the left ("aab") and 5 from the right ("caabc"). This gives us 5 'a', 2 'b', and 2 'c'.
```

## Approach

Use sliding window to find the maximum length substring that can be excluded while still having at least k of each character in the remaining parts. The answer is `n - max_window_size`. First, check if we have at least k of each character in the entire string. Then use a sliding window to find the longest middle section we can skip.

## C# Solution

```csharp
public class Solution
{
    public int TakeCharacters(string s, int k)
    {
        int[] count = new int[3];
        int n = s.Length;
        
        foreach (char c in s)
        {
            count[c - 'a']++;
        }
        
        if (count[0] < k || count[1] < k || count[2] < k)
        {
            return -1;
        }
        
        int[] window = new int[3];
        int left = 0;
        int maxWindow = 0;
        
        for (int right = 0; right < n; right++)
        {
            window[s[right] - 'a']++;
            
            while (left <= right && 
                   (count[0] - window[0] < k || 
                    count[1] - window[1] < k || 
                    count[2] - window[2] < k))
            {
                window[s[left] - 'a']--;
                left++;
            }
            
            maxWindow = Math.Max(maxWindow, right - left + 1);
        }
        
        return n - maxWindow;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of string s
- **Space:** O(1)
