# 648. Replace Words

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Trie

## Problem

Given a `dictionary` of root words and a `sentence`, replace every word in the sentence with its shortest matching root from the dictionary (if any exists), leaving unmatched words unchanged.

### Example

```
Input: dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
Output: "the cat was rat by the bat"
```

### Constraints

- `1 <= dictionary.length <= 1000`
- `1 <= sentence.length <= 10^6`

## Approach

Put all dictionary roots into a hash set for O(1) lookups. For each word in the sentence, try increasingly longer prefixes starting from length 1; the first prefix found in the root set is the shortest matching root, so replace the word with it and stop searching further prefixes.

## C# Solution

```csharp
public class Solution
{
    public string ReplaceWords(IList<string> dictionary, string sentence)
    {
        var roots = new HashSet<string>(dictionary);
        var words = sentence.Split(' ');

        for (int i = 0; i < words.Length; i++)
        {
            var word = words[i];

            for (int len = 1; len <= word.Length; len++)
            {
                var prefix = word.Substring(0, len);
                if (roots.Contains(prefix))
                {
                    words[i] = prefix;
                    break;
                }
            }
        }

        return string.Join(' ', words);
    }
}
```

## Complexity

- **Time:** `O(n * L^2)` in the worst case, where `n` is the number of words and `L` is the average word length.
- **Space:** `O(dictionary size)` for the root set.
