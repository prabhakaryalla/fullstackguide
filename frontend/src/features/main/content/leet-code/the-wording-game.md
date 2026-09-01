# 2868. The Wording Game

**Difficulty:** Hard
**Category:** Greedy, Game Theory, String
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Alice and Bob play a word game using their own arrays of words, `aliceWords` and `bobWords`. Alice moves first, and they alternate turns. On a turn, a player must say an unused word from their own array; every word after the very first must begin (case-insensitively) with the letter that the previously said word ended with. For comparison purposes, each word's "value" is its length, reduced by `1` if its first or last letter is a vowel. Besides the letter-matching rule, a word may only be played if its value is greater than or equal to the value of the previously played word. The first player unable to say a valid word on their turn loses. Return `true` if Alice wins when both players play optimally.

## Approach
Both players benefit from keeping as many strong (high-value) options available as possible, so the optimal strategy for this style of blocking game is for the player on move to always play their currently-eligible word with the largest value. Simulate the game turn by turn using that greedy rule — alternating between Alice's and Bob's remaining words, tracking the required starting letter and minimum value — until one side has no eligible word left, at which point that side loses.

## C# Solution

```csharp
public class Solution
{
    public bool Determine(string[] aliceWords, string[] bobWords)
    {
        var alice = aliceWords.Select(GetInfo).ToList();
        var bob = bobWords.Select(GetInfo).ToList();

        char? requiredLetter = null;
        int? requiredValue = null;
        bool aliceTurn = true;

        while (true)
        {
            var hand = aliceTurn ? alice : bob;
            int bestIndex = -1;
            int bestValue = int.MinValue;

            for (int i = 0; i < hand.Count; i++)
            {
                var (first, last, value) = hand[i];
                bool letterOk = requiredLetter == null || first == requiredLetter;
                bool valueOk = requiredValue == null || value >= requiredValue;

                if (letterOk && valueOk && value > bestValue)
                {
                    bestValue = value;
                    bestIndex = i;
                }
            }

            if (bestIndex == -1)
            {
                return !aliceTurn;
            }

            requiredLetter = hand[bestIndex].last;
            requiredValue = hand[bestIndex].value;
            hand.RemoveAt(bestIndex);
            aliceTurn = !aliceTurn;
        }
    }

    private static (char first, char last, int value) GetInfo(string word)
    {
        char first = char.ToLower(word[0]);
        char last = char.ToLower(word[^1]);
        int value = word.Length;

        if (IsVowel(first) || IsVowel(last))
        {
            value--;
        }

        return (first, last, value);
    }

    private static bool IsVowel(char c) => "aeiou".IndexOf(c) >= 0;
}
```

## Complexity

- **Time:** O((n + m) * max(n, m)) where n and m are the sizes of the two word arrays, from scanning for the best move each turn.
- **Space:** O(n + m).
