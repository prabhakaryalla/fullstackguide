# 843. Guess the Word

**Difficulty:** Hard
**Category:** Array, Math, String, Interactive

## Problem

You are given a `wordlist` of unique 6-letter strings, one of which is a secret word known only to a `Master` object. Calling `master.Guess(word)` returns how many letters (at matching positions) `word` shares with the secret; a return value of `6` means you found it. You must find the secret word within 10 guesses.

### Example

```
Input: secret word hidden in wordlist = ["acckzz","ccbazz","eiowzz","abcczz"]
Output: You guess "acckzz" and it must eventually be found within 10 guesses.
```

## Approach

Since the number of guesses is very limited, use a heuristic: at each round, pick the candidate word from the remaining pool that has the highest total letter-position similarity to all other remaining candidates (this word is likely to split the remaining pool effectively regardless of the true secret). Guess it; if not fully matched, use the reported match count to filter the candidate pool down to only those words that would produce that same match count against the guessed word. Repeat until the secret is found or guesses run out.

## C# Solution

```csharp
/**
 * // This is the Master's API interface.
 * // You should not implement it, or speculate about its implementation
 * interface Master {
 *     public int Guess(string word);
 * }
 */
public class Solution
{
    public void FindSecretWord(string[] wordlist, Master master)
    {
        var candidates = new List<string>(wordlist);

        for (int i = 0; i < 10 && candidates.Count > 0; i++)
        {
            string guess = PickBestGuess(candidates);
            int matches = master.Guess(guess);

            if (matches == 6) return;

            candidates = candidates.Where(w => CountMatches(w, guess) == matches).ToList();
        }
    }

    private string PickBestGuess(List<string> candidates)
    {
        string best = candidates[0];
        int bestScore = -1;

        foreach (var word in candidates)
        {
            int score = 0;

            foreach (var other in candidates)
            {
                if (word != other)
                    score += CountMatches(word, other);
            }

            if (score > bestScore)
            {
                bestScore = score;
                best = word;
            }
        }

        return best;
    }

    private int CountMatches(string a, string b)
    {
        int count = 0;
        for (int i = 0; i < a.Length; i++)
        {
            if (a[i] == b[i]) count++;
        }
        return count;
    }
}
```

## Complexity

- **Time:** `O(rounds * n^2 * L)`, where `n` is the candidate pool size.
- **Space:** `O(n)` for the candidate pool.
