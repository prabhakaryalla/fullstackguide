# 2287. Rearrange Characters to Make Target String

**Difficulty:** Easy
**Category:** Hash Table, String, Counting

## Problem

You are given two strings `s` and `target`. You can take some letters from `s` and rearrange them to form new strings. Return the maximum number of copies of `target` that can be formed by taking letters from `s` and rearranging them.

### Example

```
Input: s = "ilovecodingonleetcode", target = "code"
Output: 2
Explanation: "code" requires c:1, o:1, d:1, e:1. In s: c:2, o:3, d:2, e:3. Can make 2 copies.
```

## Approach

Count frequency of each character in both strings. For each character in `target`, calculate how many complete copies can be made based on available characters in `s`. The minimum across all characters is the answer.

## C# Solution

```csharp
public class Solution
{
    public int RearrangeCharacters(string s, string target)
    {
        int[] countS = new int[26];
        int[] countT = new int[26];
        
        foreach (char c in s)
        {
            countS[c - 'a']++;
        }
        
        foreach (char c in target)
        {
            countT[c - 'a']++;
        }
        
        int minCopies = int.MaxValue;
        
        for (int i = 0; i < 26; i++)
        {
            if (countT[i] > 0)
            {
                minCopies = Math.Min(minCopies, countS[i] / countT[i]);
            }
        }
        
        return minCopies == int.MaxValue ? 0 : minCopies;
    }
}
```

## Complexity

- **Time:** O(n + m) where n = s.length, m = target.length.
- **Space:** O(1) since we only track 26 letters.
