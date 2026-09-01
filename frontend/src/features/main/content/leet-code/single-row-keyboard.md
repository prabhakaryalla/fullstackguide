# 1165. Single-Row Keyboard

**Difficulty:** Easy
**Category:** Hash Table, String

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

A single-row keyboard string contains all 26 lowercase letters in some order, at fixed positions. A finger starts at index `0` and moves left or right (costing `|distance|` units of time) to type each character of `word`. Return the total time to type the whole word.

### Example

```
Input: keyboard = "abcdefghijklmnopqrstuvwxyz", word = "cba"
Output: 4
```

## Approach

Build a lookup table mapping each letter to its index on the keyboard. Then walk through `word`, tracking the finger's current position, and add the absolute distance moved to reach each next letter's position.

## C# Solution

```csharp
public class Solution
{
    public int CalculateTime(string keyboard, string word)
    {
        int[] position = new int[26];
        for (int i = 0; i < keyboard.Length; i++) position[keyboard[i] - 'a'] = i;

        int time = 0, prev = 0;

        foreach (char c in word)
        {
            int curr = position[c - 'a'];
            time += Math.Abs(curr - prev);
            prev = curr;
        }

        return time;
    }
}
```

## Complexity

- **Time:** `O(word.Length)`.
- **Space:** `O(1)` for the fixed-size position table.
