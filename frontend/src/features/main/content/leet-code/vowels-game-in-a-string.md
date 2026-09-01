# 3227. Vowels Game in a String

**Difficulty:** Medium
**Category:** Brainteaser, Game Theory, Math, String

## Problem
Alice and Bob take turns removing a non-empty substring from a string, with Alice going first; on Alice's turn she must remove a substring containing an odd number of vowels, and on Bob's turn he must remove a substring containing an even number of vowels (zero counts as even). A player who cannot make a valid move loses. Determine whether Alice wins, assuming both players play optimally.

## Approach
Let `k` be the total number of vowels in the string. If `k == 0`, Alice has no valid move (since she needs an odd count) and loses immediately. If `k` is odd, Alice can simply remove the entire string in one move (satisfying her odd-count requirement) and win instantly. If `k` is even and positive, Alice can remove a substring containing exactly `k - 1` vowels (an odd number), leaving exactly 1 vowel remaining; Bob then either cannot find a substring with an even (including zero) vowel count without it being forced awkwardly, or effectively the parity argument guarantees Alice can always force a win whenever any vowels exist at all. In all cases, Alice wins if and only if the string contains at least one vowel.

## C# Solution
```csharp
public class Solution {
    public bool DoesAliceWin(string s) {
        foreach (char c in s)
            if (IsVowel(c))
                return true;
        return false;
    }

    private bool IsVowel(char c) {
        return "aeiou".IndexOf(c) != -1;
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1)
