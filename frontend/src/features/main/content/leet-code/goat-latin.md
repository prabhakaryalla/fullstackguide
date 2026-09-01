# 824. Goat Latin

**Difficulty:** Easy
**Category:** String

## Problem

Convert a `sentence` to "Goat Latin": each word starting with a vowel gets `"ma"` appended; each word starting with a consonant has its first letter moved to the end, then `"ma"` appended; finally, every word gets one additional trailing `'a'` for each of its 1-based position in the sentence.

### Example

```
Input: sentence = "I speak Goat Latin"
Output: "Imaa peaksmaaa oatGmaaaa atinLmaaaaa"
```

## Approach

Split the sentence into words and process each one according to its index. Check whether the first letter is a vowel (case-insensitive) to decide whether to simply append `"ma"` or to rotate the first letter to the end before appending `"ma"`. Then append a number of `'a'` characters equal to the word's 1-based position.

## C# Solution

```csharp
public class Solution
{
    public string ToGoatLatin(string sentence)
    {
        var vowels = new HashSet<char> { 'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U' };
        var words = sentence.Split(' ');
        var result = new List<string>();

        for (int i = 0; i < words.Length; i++)
        {
            var word = words[i];
            string transformed;

            if (vowels.Contains(word[0]))
            {
                transformed = word + "ma";
            }
            else
            {
                transformed = word.Substring(1) + word[0] + "ma";
            }

            transformed += new string('a', i + 1);
            result.Add(transformed);
        }

        return string.Join(" ", result);
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the total sentence length.
- **Space:** `O(n)` for the output.
