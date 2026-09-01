# 830. Positions of Large Groups

**Difficulty:** Easy
**Category:** Array, String, Two Pointers

## Problem

Given a string `s`, a "large group" is a maximal run of three or more consecutive identical characters. Return the start and end indices of every large group, in order of appearance.

### Example

```
Input: s = "abbxxxxzzy"
Output: [[3,6]]
```

## Approach

Scan through the string, identifying each maximal run of identical characters by advancing a second pointer until the character changes. Whenever a run's length is `3` or more, record its start and inclusive end index.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> LargeGroupPositions(string s)
    {
        var result = new List<IList<int>>();
        int n = s.Length;
        int i = 0;

        while (i < n)
        {
            int j = i;
            while (j < n && s[j] == s[i]) j++;

            if (j - i >= 3)
                result.Add(new List<int> { i, j - 1 });

            i = j;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` extra, excluding the output.
