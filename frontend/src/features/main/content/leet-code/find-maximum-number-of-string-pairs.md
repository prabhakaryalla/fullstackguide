# 2744. Find Maximum Number of String Pairs

**Difficulty:** Easy
**Category:** Array, Hash Table, String, Simulation

## Problem

You are given an array of strings `words` where each word consists of exactly two lowercase English letters.

Return the maximum number of pairs that can be formed from the array, where a pair consists of two strings `words[i]` and `words[j]` (i < j) such that `words[i]` is the reverse of `words[j]`.

### Example

```
Input: words = ["cd","ac","dc","ca","zz"]
Output: 2
Explanation: We can form 2 pairs: ("cd","dc") and ("ac","ca").

Input: words = ["ab","ba","cc"]
Output: 1
Explanation: We can form 1 pair: ("ab","ba").

Input: words = ["aa","ab"]
Output: 0
Explanation: No pairs can be formed.
```

## Approach

Use a hash set to track words we've seen. For each word, check if its reverse exists in the set:
- If yes, we found a pair (remove the reverse from the set to avoid double counting)
- If no, add the current word to the set

## C# Solution

```csharp
public class Solution 
{
    public int MaximumNumberOfStringPairs(string[] words) 
    {
        var seen = new HashSet<string>();
        int pairs = 0;
        
        foreach (string word in words)
        {
            string reversed = new string(word.Reverse().ToArray());
            
            if (seen.Contains(reversed))
            {
                pairs++;
                seen.Remove(reversed);
            }
            else
            {
                seen.Add(word);
            }
        }
        
        return pairs;
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of words
- **Space:** O(n) for the hash set
