# 3675. Minimum Operations to Transform String

**Difficulty:** Easy
**Category:** String, Greedy, Counting

## Problem
You are given a string `s` of lowercase English letters. In one operation you may choose any single character and change it to the next letter in the alphabet, cyclically (`'a'` becomes `'b'`, ..., `'z'` becomes `'a'`).

Return the minimum number of operations required so that every character in `s` becomes the same letter.

## Approach
Since the shift only moves forward cyclically, for a fixed target letter, the cost to transform a character `c` into `target` is the forward cyclic distance `(target - c + 26) % 26`.

Count the frequency of each letter in `s`, then for every possible target letter (`'a'` through `'z'`) compute the total cost using the frequency counts, and keep the minimum over all 26 targets.

## C# Solution

```csharp
public class Solution
{
    public int MinOperations(string s)
    {
        int[] freq = new int[26];
        foreach (char c in s)
        {
            freq[c - 'a']++;
        }

        int best = int.MaxValue;
        for (int target = 0; target < 26; target++)
        {
            int cost = 0;
            for (int c = 0; c < 26; c++)
            {
                if (freq[c] == 0) continue;
                int forward = ((target - c) + 26) % 26;
                cost += freq[c] * forward;
            }
            best = Math.Min(best, cost);
        }

        return best;
    }
}
```

## Complexity

- **Time:** O(n + 26^2)
- **Space:** O(1)
