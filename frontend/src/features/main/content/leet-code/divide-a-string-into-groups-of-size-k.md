# 2138. Divide a String Into Groups of Size k

**Difficulty:** Easy
**Category:** String, Simulation

## Problem

A string `s` is divided into groups of size `k`. The last group may have fewer than `k` characters if `s.length` is not divisible by `k`.

Given the string `s` and integer `k`, as well as a character `fill`, return a string array denoting the composition of every group `s` has been divided into. If the last group has fewer than `k` characters, fill the remaining positions with the character `fill`.

### Example

```
Input: s = "abcdefghi", k = 3, fill = "x"
Output: ["abc","def","ghi"]

Input: s = "abcdefgh", k = 3, fill = "x"
Output: ["abc","def","ghx"]
```

## Approach

Simply iterate through the string in chunks of size `k`. For the last group, if it has fewer than `k` characters, pad it with the fill character.

## C# Solution

```csharp
public class Solution
{
    public string[] DivideString(string s, int k, char fill)
    {
        var result = new List<string>();
        int i = 0;
        
        while (i < s.Length)
        {
            if (i + k <= s.Length)
            {
                result.Add(s.Substring(i, k));
            }
            else
            {
                // Last group - need to fill
                string lastGroup = s.Substring(i);
                int fillCount = k - lastGroup.Length;
                lastGroup += new string(fill, fillCount);
                result.Add(lastGroup);
            }
            i += k;
        }
        
        return result.ToArray();
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the string
- **Space:** O(n) for the result array
