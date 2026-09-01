# 3758. Convert Number Words to Digits

**Difficulty:** Medium
**Category:** String, Hash Table, Simulation
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given a string `s` that represents a non-negative integer written out in English words (for example, `"one hundred twenty three"`), using words separated by single spaces, built from the standard English number-naming vocabulary (`"zero"` through `"nineteen"`, tens like `"twenty"`, `"thirty"`, ..., `"ninety"`, and scale words `"hundred"`, `"thousand"`, `"million"`, `"billion"`). Convert `s` into its numeric string representation (without leading zeros, unless the value is exactly zero) and return it.

## Approach
Tokenize the input string by spaces and map each word to its numeric value using lookup tables: ones (`"zero"`–`"nineteen"`), tens (`"twenty"`, `"thirty"`, ... `"ninety"`), and scale words (`"hundred"` = 100, `"thousand"` = 1,000, `"million"` = 1,000,000, `"billion"` = 1,000,000,000). Process tokens left to right while maintaining a `current` accumulator for the value being built within the current scale group and a `total` accumulator for the fully resolved result. For ones/tens words, add their value to `current`. For `"hundred"`, multiply `current` by 100. For larger scale words (`"thousand"`, `"million"`, `"billion"`), multiply `current` by that scale, add it into `total`, and reset `current` to 0. After processing all tokens, the answer is `total + current`, converted to its decimal string form.

## C# Solution

```csharp
public class Solution 
{
    private static readonly Dictionary<string, long> Ones = new Dictionary<string, long>
    {
        { "zero", 0 }, { "one", 1 }, { "two", 2 }, { "three", 3 }, { "four", 4 },
        { "five", 5 }, { "six", 6 }, { "seven", 7 }, { "eight", 8 }, { "nine", 9 },
        { "ten", 10 }, { "eleven", 11 }, { "twelve", 12 }, { "thirteen", 13 },
        { "fourteen", 14 }, { "fifteen", 15 }, { "sixteen", 16 }, { "seventeen", 17 },
        { "eighteen", 18 }, { "nineteen", 19 }
    };

    private static readonly Dictionary<string, long> Tens = new Dictionary<string, long>
    {
        { "twenty", 20 }, { "thirty", 30 }, { "forty", 40 }, { "fifty", 50 },
        { "sixty", 60 }, { "seventy", 70 }, { "eighty", 80 }, { "ninety", 90 }
    };

    private static readonly Dictionary<string, long> Scales = new Dictionary<string, long>
    {
        { "hundred", 100 }, { "thousand", 1_000 }, { "million", 1_000_000 }, { "billion", 1_000_000_000 }
    };

    public string NumberWordsToDigits(string s)
    {
        string[] words = s.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        long total = 0;
        long current = 0;

        foreach (string word in words)
        {
            string w = word.ToLowerInvariant();

            if (Ones.TryGetValue(w, out long onesVal))
            {
                current += onesVal;
            }
            else if (Tens.TryGetValue(w, out long tensVal))
            {
                current += tensVal;
            }
            else if (w == "hundred")
            {
                current *= 100;
            }
            else if (Scales.TryGetValue(w, out long scaleVal))
            {
                total += current * scaleVal;
                current = 0;
            }
        }

        total += current;
        return total.ToString();
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of words in `s`
- **Space:** O(1) beyond the fixed-size lookup tables
