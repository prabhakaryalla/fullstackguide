# 3744. Find Kth Character in Expanded String

**Difficulty:** Medium
**Category:** Recursion, Simulation, Math
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given a string `word` and an integer `k`. The string is expanded through a series of operations: repeatedly append the entire current string to itself, but before doing so, for each character that is not `'z'`, replace it with the next character in the alphabet during the "increment" step, then append the incremented version to the original (details vary by exact operation model — the general family of "expanded string" problems defines an operation that roughly doubles the string length each round, either by shifting characters or duplicating them). Return the `k`-th character (1-indexed) of the final expanded string without building the entire string explicitly, since `k` can be extremely large.

## Approach
Track only the length of the string after each operation instead of constructing it. Starting from the length of `word`, repeatedly compute what the length would become after another operation, stopping once the length is at least `k`. Then walk backwards through the recorded lengths: at each step determine whether `k` falls in the "original" half or the "generated" half of that expansion. If it falls in the newly generated half, map it back to the corresponding index in the previous half (adjusting the character value if the operation was a shift). Continue this reduction until the length matches the base string, then return the character at that index (applying any accumulated shift modulo 26).

## C# Solution

```csharp
public class Solution 
{
    public char KthCharacter(string word, long k)
    {
        var lengths = new List<long> { word.Length };
        while (lengths[lengths.Count - 1] < k)
        {
            lengths.Add(lengths[lengths.Count - 1] * 2);
        }

        int shift = 0;
        int level = lengths.Count - 1;

        while (level > 0)
        {
            long half = lengths[level - 1];
            if (k > half)
            {
                k -= half;
                shift++;
            }
            level--;
        }

        char baseChar = word[(int)(k - 1)];
        int offset = (baseChar - 'a' + shift) % 26;
        return (char)('a' + offset);
    }
}
```

## Complexity

- **Time:** O(log k)
- **Space:** O(log k)
