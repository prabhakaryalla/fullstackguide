# 1684. Count the Number of Consistent Strings

**Difficulty:** Easy
**Category:** Array, Hash Table, String, Bit Manipulation

## Problem

Given a string `allowed` of distinct characters and an array of `words`, return the number of words that are "consistent" — every character in the word also appears in `allowed`.

### Example

```
Input: allowed = "ab", words = ["ad","bd","aaab","baa","badab"]
Output: 2
```

## Approach

Encode `allowed` as a 26-bit bitmask of permitted letters. For each word, check that every character's corresponding bit is set in the mask; count the words that pass.

## C# Solution

```csharp
public class Solution
{
    public int CountConsistentStrings(string allowed, string[] words)
    {
        int mask = 0;

        foreach (char c in allowed)
        {
            mask |= 1 << (c - 'a');
        }

        int count = 0;

        foreach (string word in words)
        {
            bool consistent = true;

            foreach (char c in word)
            {
                if ((mask & (1 << (c - 'a'))) == 0)
                {
                    consistent = false;
                    break;
                }
            }

            if (consistent)
            {
                count++;
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(total characters across all words)`.
- **Space:** `O(1)`.
