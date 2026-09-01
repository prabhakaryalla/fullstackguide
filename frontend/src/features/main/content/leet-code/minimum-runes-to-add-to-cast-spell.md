# 3383. Minimum Runes to Add to Cast Spell

**Difficulty:** Easy
**Category:** String, Two Pointers, Greedy
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You have a string `inventory` of runes and want to cast a `spell`, which requires `spell` to appear as a **subsequence** of your rune inventory. You may add any runes anywhere into `inventory`. Return the minimum number of runes you must add so that `spell` becomes a subsequence of the resulting inventory.

### Example

Input: `inventory = "ace", spell = "abcde"`

Output: `2`

Explanation: `"ace"` already matches `'a'`, `'c'`, `'e'` of `spell` as a subsequence, leaving `'b'` and `'d'` unmatched — 2 runes must be added.

## Approach
Greedily match `spell` against `inventory` left to right: advance a pointer into `spell` every time the current inventory rune equals the next unmatched character of `spell`. The greedy match always maximizes the number of `spell` characters reused, so the minimum number of runes to add is simply the remaining unmatched length of `spell`.

## C# Solution

```csharp
public class Solution 
{
    public int MinRunesToAdd(string inventory, string spell) 
    {
        int i = 0;
        foreach (char c in inventory) 
        {
            if (i < spell.Length && spell[i] == c) i++;
        }
        return spell.Length - i;
    }
}
```

## Complexity

- **Time:** O(n) where `n` is the length of `inventory`.
- **Space:** O(1)
