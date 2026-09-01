# 3014. Minimum Number of Pushes to Type Word I

**Difficulty:** Medium
**Category:** Hash Table, String, Greedy, Counting

## Problem

You want to type a lowercase string `word` on an 8-key keypad (like an old phone keypad, keys `2`-`9`). Each key can be assigned any set of distinct letters, and pressing a key repeatedly cycles through its assigned letters — the `n`-th letter assigned to a key costs `n` presses to reach. You may assign the 26 letters to the 8 keys however you like (before typing). Return the minimum total number of key presses needed to type `word`, choosing the best possible assignment.

### Example

```
Input: word = "abcde"
Output: 5
Explanation: Assign one letter per key for the first 8 keys, so every letter costs exactly 1 press.
```

## Approach

Only the **frequency** of each letter in `word` matters, not which specific letter it is. To minimize total presses, assign the most frequent letters to the cheapest ("1st position") slots first: put the 8 most frequent letters as each key's first letter (cost `1` each), the next 8 most frequent as each key's second letter (cost `2` each), and so on.

Count letter frequencies, sort them in descending order, and sum `count[i] * (i / 8 + 1)` for each rank `i` (0-indexed) in the sorted list.

## C# Solution

```csharp
public class Solution {
    public int MinimumPushes(string word) {
        int[] count = new int[26];
        foreach (char c in word)
            count[c - 'a']++;

        Array.Sort(count);
        Array.Reverse(count);

        int ans = 0;
        for (int i = 0; i < 26; i++)
            ans += count[i] * (i / 8 + 1);
        return ans;
    }
}
```

## Complexity

- Time: O(1) — the work is bounded by the fixed 26-letter alphabet (plus O(n) to count letters in `word`).
- Space: O(1).
