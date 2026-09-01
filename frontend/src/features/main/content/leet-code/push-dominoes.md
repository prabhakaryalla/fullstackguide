# 838. Push Dominoes

**Difficulty:** Medium
**Category:** Two Pointers, String

## Problem

Given a string `dominoes` representing a row of dominoes (`'L'`, `'R'`, or `'.'` for standing), simulate the effect of simultaneously pushing all `'L'` and `'R'` dominoes: each pushes its neighbors in its fall direction, and a domino pushed from both sides stays standing. Return the final state.

### Example

```
Input: dominoes = "RR.L"
Output: "RR.L"
```

## Approach

Add virtual `'L'` and `'R'` sentinels at the very start and end (since an implicit wall on each side behaves like a domino already fallen inward), then scan for consecutive pairs of non-`'.'` characters. Between each pair, the standing dominoes are resolved based on the two boundary characters: if both are the same, every domino between them falls that direction; if the left is `'R'` and the right is `'L'`, dominoes are pulled toward the center from both sides (using two pointers moving inward); if the left is `'L'` and the right is `'R'`, the gap is stable and stays standing.

## C# Solution

```csharp
public class Solution
{
    public string PushDominoes(string dominoes)
    {
        var s = "L" + dominoes + "R";
        var result = new StringBuilder(s);
        int prev = 0;

        for (int i = 1; i < s.Length; i++)
        {
            if (s[i] == '.') continue;

            char left = s[prev];
            char right = s[i];

            if (left == right)
            {
                for (int j = prev + 1; j < i; j++)
                    result[j] = left;
            }
            else if (left == 'R' && right == 'L')
            {
                int l = prev + 1, r = i - 1;
                while (l < r)
                {
                    result[l] = 'R';
                    result[r] = 'L';
                    l++;
                    r--;
                }
            }

            prev = i;
        }

        return result.ToString().Substring(1, dominoes.Length);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the working string.
