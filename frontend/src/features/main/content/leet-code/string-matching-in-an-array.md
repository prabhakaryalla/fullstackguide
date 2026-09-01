# 1408. String Matching in an Array

**Difficulty:** Easy
**Category:** Array, String, String Matching

## Problem

Given an array of string `words`, return all strings in `words` that are a substring of another word in the array.

### Example

```
Input: words = ["mass","as","hero","superhero"]
Output: ["as","hero"]
```

## Approach

For every word, check whether it appears as a substring inside any other (different) word in the array. If so, include it in the result. With small constraints, a straightforward `O(n^2)` comparison using the built-in substring search is simple and efficient enough.

## C# Solution

```csharp
public class Solution
{
    public IList<string> StringMatching(string[] words)
    {
        var result = new List<string>();

        for (int i = 0; i < words.Length; i++)
        {
            for (int j = 0; j < words.Length; j++)
            {
                if (i != j && words[j].Contains(words[i]))
                {
                    result.Add(words[i]);
                    break;
                }
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n^2 * m)` where `n` is the word count and `m` the average word length.
- **Space:** `O(n)` for the result list.
