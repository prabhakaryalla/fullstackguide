# 3305. Count of Substrings Containing Every Vowel and K Consonants I

**Difficulty:** Medium
**Category:** Hash Table, String, Sliding Window

## Problem

You are given a string `word` and a non-negative integer `k`.

Return the total number of substrings of `word` that contain every vowel (`'a'`, `'e'`, `'i'`, `'o'`, and `'u'`) at least once and exactly `k` consonants.

### Example

Input: `word = "ieaouqqieaouqq", k = 1`

Output: `3`

Explanation: The substrings with every vowel and exactly one consonant are `word[0..5]` = `"ieaouq"`, `word[6..11]` = `"qieaou"`, and `word[7..12]` = `"ieaouq"`.

## Approach

Since `word.length <= 250`, a brute-force double loop is efficient enough. For each starting index `left`, extend `right` forward while tracking the count of consonants seen and the number of distinct vowels seen. Stop extending once the consonant count exceeds `k` (any further extension would only increase it further). Whenever the consonant count equals `k` and all 5 vowels have appeared, count that substring.

## C# Solution

```csharp
public class Solution 
{
    public int CountOfSubstrings(string word, int k) 
    {
        int n = word.Length;
        int ans = 0;
        for (int left = 0; left < n; left++)
        {
            int[] vowelCount = new int[5];
            int distinctVowels = 0;
            int consonants = 0;
            for (int right = left; right < n; right++)
            {
                char c = word[right];
                int idx = "aeiou".IndexOf(c);
                if (idx >= 0)
                {
                    if (vowelCount[idx] == 0) distinctVowels++;
                    vowelCount[idx]++;
                }
                else
                {
                    consonants++;
                }

                if (consonants > k) break;

                if (distinctVowels == 5 && consonants == k) ans++;
            }
        }
        return ans;
    }
}
```

## Complexity

- **Time:** O(n^2) where n is the length of `word`.
- **Space:** O(1) extra space (fixed-size arrays).
