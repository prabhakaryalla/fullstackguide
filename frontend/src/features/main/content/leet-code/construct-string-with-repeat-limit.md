# 2182. Construct String With Repeat Limit

**Difficulty:** Medium
**Category:** String, Greedy, Heap (Priority Queue)

## Problem

You are given a string `s` and an integer `repeatLimit`. Construct a new string using characters from `s` such that no character appears more than `repeatLimit` times consecutively. You do not have to use all characters from `s`.

Return the lexicographically largest string possible.

### Example

```
Input: s = "cczazcc", repeatLimit = 3
Output: "zzcccac"
Explanation: We use all of the characters from s to construct "zzcccac".
The letter 'a' appears at most 1 time consecutively.
The letter 'c' appears at most 3 times consecutively.
The letter 'z' appears at most 2 times consecutively.
```

## Approach

To build the lexicographically largest string:
1. Count the frequency of each character
2. Use a greedy approach, always picking the largest available character
3. Add up to `repeatLimit` consecutive occurrences of the largest character
4. If we still have more of that character, we must add one occurrence of the next largest character before continuing
5. Continue until all characters are used

We can use a max heap (or process characters in descending order) to efficiently get the largest available character.

## C# Solution

```csharp
public class Solution
{
    public string RepeatLimitedString(string s, int repeatLimit)
    {
        int[] freq = new int[26];
        foreach (char c in s)
        {
            freq[c - 'a']++;
        }
        
        StringBuilder result = new StringBuilder();
        int currentChar = 25; // Start from 'z'
        
        while (currentChar >= 0)
        {
            if (freq[currentChar] == 0)
            {
                currentChar--;
                continue;
            }
            
            int use = Math.Min(freq[currentChar], repeatLimit);
            for (int i = 0; i < use; i++)
            {
                result.Append((char)('a' + currentChar));
            }
            freq[currentChar] -= use;
            
            if (freq[currentChar] > 0)
            {
                // Need to insert a different character
                int nextChar = currentChar - 1;
                while (nextChar >= 0 && freq[nextChar] == 0)
                {
                    nextChar--;
                }
                
                if (nextChar < 0) break; // No more characters available
                
                result.Append((char)('a' + nextChar));
                freq[nextChar]--;
            }
        }
        
        return result.ToString();
    }
}
```

## Complexity

- **Time:** O(n), where n is the length of the string
- **Space:** O(1), constant space for the frequency array
