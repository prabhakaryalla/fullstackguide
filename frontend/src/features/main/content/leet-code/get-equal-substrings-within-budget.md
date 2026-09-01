# 1208. Get Equal Substrings Within Budget

**Difficulty:** Medium
**Category:** String, Sliding Window, Prefix Sum

## Problem

Given two equal-length strings `s` and `t` and an integer `maxCost`, where changing `s[i]` to `t[i]` costs `|s[i] - t[i]|`, return the maximum length of a substring of `s` that can be changed to the corresponding substring of `t` with a total cost no greater than `maxCost`.

### Example

```
Input: s = "abcd", t = "bcdf", maxCost = 3
Output: 3
```

## Approach

Use a sliding window over the indices. Expand the right edge, adding the conversion cost of the new character; whenever the accumulated cost exceeds `maxCost`, shrink from the left, removing that character's cost, until the window is affordable again. Track the largest window width seen.

## C# Solution

```csharp
public class Solution
{
    public int EqualSubstring(string s, string t, int maxCost)
    {
        int left = 0, currentCost = 0, maxLength = 0;

        for (int right = 0; right < s.Length; right++)
        {
            currentCost += Math.Abs(s[right] - t[right]);

            while (currentCost > maxCost)
            {
                currentCost -= Math.Abs(s[left] - t[left]);
                left++;
            }

            maxLength = Math.Max(maxLength, right - left + 1);
        }

        return maxLength;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the length of `s`.
- **Space:** `O(1)`.
