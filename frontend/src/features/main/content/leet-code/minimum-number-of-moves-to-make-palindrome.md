# 2193. Minimum Number of Moves to Make Palindrome

**Difficulty:** Hard
**Category:** String, Greedy, Two Pointers
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a string `s` consisting of lowercase English letters. In one move, you can select any two adjacent characters of `s` and swap them.

Return the minimum number of moves needed to make `s` a palindrome.

### Example

```
Input: s = "aabb"
Output: 2
Explanation: Swap s[0] with s[1] to get "abab", then swap s[1] with s[2] to get "abba".
```

## Approach

Use a greedy two-pointer approach:
1. Use left and right pointers starting from both ends
2. For each position, find the matching character for the left pointer from the right side
3. Swap the matching character to the right position
4. If a character appears odd times and is in the middle, it requires special handling
5. Count all swaps needed

The key insight: For each character from the left, we find its pair from the right and move it to the correct position by adjacent swaps.

## C# Solution

```csharp
public class Solution
{
    public int MinMovesToMakePalindrome(string s)
    {
        char[] chars = s.ToCharArray();
        int moves = 0;
        int left = 0;
        int right = chars.Length - 1;
        
        while (left < right)
        {
            // Find matching character from right
            int rightMatch = right;
            
            while (rightMatch > left && chars[rightMatch] != chars[left])
            {
                rightMatch--;
            }
            
            if (rightMatch == left)
            {
                // Odd character in middle - swap with next position
                Swap(chars, left, left + 1);
                moves++;
                continue;
            }
            
            // Move the matching character to the right position
            while (rightMatch < right)
            {
                Swap(chars, rightMatch, rightMatch + 1);
                rightMatch++;
                moves++;
            }
            
            left++;
            right--;
        }
        
        return moves;
    }
    
    private void Swap(char[] chars, int i, int j)
    {
        char temp = chars[i];
        chars[i] = chars[j];
        chars[j] = temp;
    }
}
```

## Complexity

- **Time:** O(n^2), where n is the length of the string
- **Space:** O(n) for the character array
