# 1307. Verbal Arithmetic Puzzle

**Difficulty:** Hard
**Category:** Array, Backtracking, Bit Manipulation

## Problem

Given an equation `words[0] + words[1] + ... + words[n-2] == result` where each string is made of uppercase letters, determine if there is a mapping of letters to digits `0`-`9` (each letter maps to a unique digit) that makes the equation valid, with no leading zeros for words longer than one character.

### Example

```
Input: words = ["SEND","MORE"], result = "MONEY"
Output: true
```

## Approach

Give each letter a signed integer coefficient equal to its total place-value contribution: positive for letters in the addend words, negative for letters in `result` (accounting for each letter's power-of-ten position within its word). The equation holds exactly when the weighted sum of assigned digits is `0`. Backtrack over the distinct letters, trying each unused digit, skipping `0` for letters that lead a multi-character word, and check the weighted sum once all letters are assigned.

## C# Solution

```csharp
public class Solution
{
    public bool IsSolvable(string[] words, string result)
    {
        var coeff = new Dictionary<char, long>();
        var leading = new HashSet<char>();

        void AddWord(string w, int sign)
        {
            long place = 1;
            for (int i = w.Length - 1; i >= 0; i--)
            {
                coeff[w[i]] = coeff.GetValueOrDefault(w[i], 0L) + sign * place;
                place *= 10;
            }
            if (w.Length > 1) leading.Add(w[0]);
        }

        foreach (var w in words) AddWord(w, 1);
        AddWord(result, -1);

        var letters = new List<char>(coeff.Keys);
        letters.Sort((a, b) => Math.Abs(coeff[b]).CompareTo(Math.Abs(coeff[a])));

        var used = new bool[10];
        var assigned = new Dictionary<char, int>();

        return Backtrack(0);

        bool Backtrack(int idx)
        {
            if (idx == letters.Count)
            {
                long sum = 0;
                foreach (var kv in assigned) sum += coeff[kv.Key] * kv.Value;
                return sum == 0;
            }

            char letter = letters[idx];
            for (int d = 0; d <= 9; d++)
            {
                if (used[d]) continue;
                if (d == 0 && leading.Contains(letter)) continue;

                used[d] = true;
                assigned[letter] = d;

                if (Backtrack(idx + 1)) return true;

                used[d] = false;
                assigned.Remove(letter);
            }

            return false;
        }
    }
}
```

## Complexity

- **Time:** `O(10!)` in the worst case, bounded by at most 10 distinct letters.
- **Space:** `O(1)` extra beyond the letter/coefficient maps.
