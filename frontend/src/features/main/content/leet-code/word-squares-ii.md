# 3799. Word Squares II

**Difficulty:** Medium
**Category:** Array, String, Backtracking, Sorting, Enumeration

## Problem

Given a string array `words` of distinct 4-letter strings, a word square consists of 4 distinct words `top`, `left`, `right`, `bottom` such that `top[0]==left[0]`, `top[3]==right[0]`, `bottom[0]==left[3]`, `bottom[3]==right[3]`. Return all valid word squares, sorted ascending by the tuple `(top, left, right, bottom)`.

### Example

Input: `words = ["able","area","echo","also"]`
Output: `[["able","area","echo","also"],["area","able","also","echo"]]`

## Approach

Since `words.length <= 15`, brute force all ordered 4-tuples of distinct words and check the four corner-matching conditions directly. Collect valid squares and sort lexicographically by `(top, left, right, bottom)`.

## C# Solution

```csharp
public class Solution 
{
    public IList<IList<string>> WordSquares(string[] words) 
    {
        var results = new List<IList<string>>();
        int n = words.Length;
        for (int a = 0; a < n; a++)
        for (int b = 0; b < n; b++)
        {
            if (b == a) continue;
            string top = words[a], left = words[b];
            if (top[0] != left[0]) continue;
            for (int c = 0; c < n; c++)
            {
                if (c == a || c == b) continue;
                string right = words[c];
                if (top[3] != right[0]) continue;
                for (int d = 0; d < n; d++)
                {
                    if (d == a || d == b || d == c) continue;
                    string bottom = words[d];
                    if (bottom[0] == left[3] && bottom[3] == right[3])
                    {
                        results.Add(new List<string> { top, left, right, bottom });
                    }
                }
            }
        }

        results = results
            .OrderBy(sq => sq[0])
            .ThenBy(sq => sq[1])
            .ThenBy(sq => sq[2])
            .ThenBy(sq => sq[3])
            .ToList();
        return results;
    }
}
```

## Complexity

- **Time:** O(m^4) where m is the number of words
- **Space:** O(m^4) worst case for results
