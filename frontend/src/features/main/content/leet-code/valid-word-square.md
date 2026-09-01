# 422. Valid Word Square

**Difficulty:** Easy
**Category:** Array, String, Matrix
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a sequence of words, return `true` if they form a valid word square — the `k`th row and `k`th column read the same string, for every `k`.

### Example

```
Input: words = ["abcd","bnrt","crmy","dtye"]
Output: true
```

### Constraints

- `1 <= words.length <= 500`
- `1 <= words[i].length <= 500`

## Approach

For every character position `(i, j)` in the grid formed by the words, verify that `words[i][j]` equals `words[j][i]`, treating any position beyond a shorter row or column's length as automatically invalid (since a true word square requires both readings to exist and match).

## C# Solution

```csharp
public class Solution
{
    public bool ValidWordSquare(IList<string> words)
    {
        int n = words.Count;

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < words[i].Length; j++)
            {
                if (j >= n || i >= words[j].Length || words[i][j] != words[j][i])
                    return false;
            }
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(1)` extra.
