# 2135. Count Words Obtained After Adding a Letter

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Sorting

## Problem

You are given two arrays of strings `startWords` and `targetWords`. Each string consists of lowercase English letters only.

For each string in `targetWords`, check if it is possible to choose a string from `startWords` and perform the following operation exactly once to make them equal:

- Add any lowercase letter to the end of the chosen string and rearrange the letters of the result

Return the number of strings in `targetWords` that can be obtained by performing the operations on any string of `startWords`.

### Example

```
Input: startWords = ["ant","act","tack"], targetWords = ["tack","act","acti"]
Output: 2
Explanation:
- "tack" can be formed by "act" + 'k' and rearranging
- "acti" can be formed by "act" + 'i' and rearranging
- "act" cannot be formed (same length as startWords)
```

## Approach

The key observation is that rearranging letters doesn't matter - what matters is the set of characters. We can represent each word by its sorted character sequence or by a bitmask of which letters it contains.

For each target word:
1. Try removing each of its characters one by one
2. Check if the remaining character set exists in startWords
3. Use a hash set of bitmasks for O(1) lookup

## C# Solution

```csharp
public class Solution
{
    public int WordCount(string[] startWords, string[] targetWords)
    {
        var startMasks = new HashSet<int>();
        
        // Convert each start word to bitmask
        foreach (var word in startWords)
        {
            int mask = 0;
            foreach (char c in word)
            {
                mask |= (1 << (c - 'a'));
            }
            startMasks.Add(mask);
        }
        
        int count = 0;
        
        // For each target word, try removing each character
        foreach (var word in targetWords)
        {
            int mask = 0;
            foreach (char c in word)
            {
                mask |= (1 << (c - 'a'));
            }
            
            // Try removing each character in target
            foreach (char c in word)
            {
                int reducedMask = mask ^ (1 << (c - 'a'));
                if (startMasks.Contains(reducedMask))
                {
                    count++;
                    break;
                }
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n * L) where n is total number of words and L is average word length
- **Space:** O(n) for the hash set
