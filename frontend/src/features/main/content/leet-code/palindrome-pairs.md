# 336. Palindrome Pairs

**Difficulty:** Hard
**Category:** Array, Hash Table, String, Trie

## Problem

Given a list of unique strings `words`, return all pairs of indices `(i, j)` such that concatenating `words[i] + words[j]` forms a palindrome.

### Example

```
Input: words = ["abcd","dcba","lls","s","sssll"]
Output: [[0,1],[1,0],[3,2],[2,4]]
```

### Constraints

- `1 <= words.length <= 5000`
- `0 <= words[i].length <= 300`
- `words[i]` consists of lowercase English letters.

## Approach

Map every word to its index. For each word, try every split point into a `left` and `right` part. If `left` is itself a palindrome, then pairing the reverse of `right` (as a prefix word) with the current word forms a palindrome; symmetrically, if `right` is a palindrome, pairing the current word with the reverse of `left` works. Checking every split keeps the total work bounded by the square of word length per word.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> PalindromePairs(string[] words)
    {
        var indexByWord = new Dictionary<string, int>();
        for (int i = 0; i < words.Length; i++)
            indexByWord[words[i]] = i;

        var result = new List<IList<int>>();

        for (int i = 0; i < words.Length; i++)
        {
            var word = words[i];
            int n = word.Length;

            for (int j = 0; j <= n; j++)
            {
                var left = word.Substring(0, j);
                var right = word.Substring(j);

                if (IsPalindrome(left) && indexByWord.TryGetValue(Reverse(right), out var idx) && idx != i)
                    result.Add(new List<int> { idx, i });

                if (j != n && IsPalindrome(right) && indexByWord.TryGetValue(Reverse(left), out var idx2) && idx2 != i)
                    result.Add(new List<int> { i, idx2 });
            }
        }

        return result;
    }

    private bool IsPalindrome(string s)
    {
        int left = 0, right = s.Length - 1;
        while (left < right)
        {
            if (s[left++] != s[right--]) return false;
        }

        return true;
    }

    private string Reverse(string s)
    {
        var chars = s.ToCharArray();
        Array.Reverse(chars);
        return new string(chars);
    }
}
```

## Complexity

- **Time:** `O(n * k^2)`, where `n` is the number of words and `k` is the average word length.
- **Space:** `O(n * k)` for the index map and substrings.
