# 2399. Check Distances Between Same Letters

**Difficulty:** Easy
**Category:** Array, Hash Table, String

## Problem

You are given a 0-indexed string `s` consisting of only lowercase English letters, where each letter in `s` appears exactly twice. You are also given a 0-indexed integer array `distance` of length 26.

Each letter in the alphabet is numbered from 0 to 25 (i.e., 'a' -> 0, 'b' -> 1, 'c' -> 2, ... , 'z' -> 25).

In a well-spaced string, the number of letters between the two occurrences of the `i`-th letter is `distance[i]`. If the `i`-th letter does not appear in `s`, then `distance[i]` can be ignored.

Return `true` if `s` is a well-spaced string, otherwise return `false`.

### Example

```
Input: s = "abaccb", distance = [1,3,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
Output: true
Explanation:
- 'a' appears at indices 0 and 2, distance = 2 - 0 - 1 = 1 ✓
- 'b' appears at indices 1 and 5, distance = 5 - 1 - 1 = 3 ✓
- 'c' appears at indices 3 and 4, distance = 4 - 3 - 1 = 0 ✓
```

## Approach

Store the first occurrence index of each letter in a map. When encountering a letter for the second time, calculate the distance between occurrences (excluding the letters themselves) and verify it matches the expected distance.

## C# Solution

```csharp
public class Solution
{
    public bool CheckDistances(string s, int[] distance)
    {
        int[] firstOccurrence = new int[26];
        Array.Fill(firstOccurrence, -1);
        
        for (int i = 0; i < s.Length; i++)
        {
            int charIndex = s[i] - 'a';
            
            if (firstOccurrence[charIndex] == -1)
            {
                firstOccurrence[charIndex] = i;
            }
            else
            {
                int actualDistance = i - firstOccurrence[charIndex] - 1;
                if (actualDistance != distance[charIndex])
                {
                    return false;
                }
            }
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the string
- **Space:** O(1) since the alphabet has fixed size
